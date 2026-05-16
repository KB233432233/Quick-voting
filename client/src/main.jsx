import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Web3AuthProvider } from '@web3auth/modal/react'
import { WagmiProvider } from "@web3auth/modal/react/wagmi";
import web3AuthContextConfig from "./context/Web3Context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RoleProvider } from './context/RoleContext';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Web3AuthProvider config={web3AuthContextConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider>
          <RoleProvider>
            <App />
          </RoleProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </Web3AuthProvider>
  </StrictMode>,
)
