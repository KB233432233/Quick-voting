import React, { createContext, useContext, useEffect, useState } from 'react';
import { useWeb3Auth } from '@web3auth/modal/react';
import { getUserRoleFromChain } from '../hooks/ReadFromChain';
import { ethers } from 'ethers';

export const RoleContext = createContext();

export const useRole = () => useContext(RoleContext);

export const RoleProvider = ({ children }) => {
  const { provider, isConnected } = useWeb3Auth();
  const [userRole, setUserRole] = useState(null); // null means loading, 'User' is default
  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      if (isConnected && provider) {
        try {
          const ethersProvider = new ethers.BrowserProvider(provider);
          const signer = await ethersProvider.getSigner();
          const address = await signer.getAddress();
          setUserAddress(address);
          
          let role = await getUserRoleFromChain(provider, address);
          console.log("Raw role from contract:", role);
          
          // Ethers v6 sometimes returns a Result object or an array. 
          // If it's an object/array, we try to extract the first element or convert it to a string.
          if (typeof role === 'object' && role !== null) {
            role = role[0] || role.toString();
          }

          setUserRole(role);
          console.log("Determined user role:", role);
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole('User'); // fallback
        }
      } else {
        setUserRole('Guest'); // Not logged in
        setUserAddress(null);
      }
    };

    fetchRole();
  }, [isConnected, provider]);

  // useEffect(() => {
  //   console.log("Current userRole state:", userRole);
  // }, [userRole]);

  return (
    <RoleContext.Provider value={{ userRole, userAddress }}>
      {children}
    </RoleContext.Provider>
  );
};
