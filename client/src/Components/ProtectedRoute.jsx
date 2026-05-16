import React from 'react';
import { Navigate } from 'react-router';
import { useRole } from '../context/RoleContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userRole } = useRole();

  // If we haven't determined the role yet, show a loader
  if (userRole === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading authentication...</div>;
  }

  // If the user's role isn't in the allowed list, redirect them to the home page (or a Not Authorized page)
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/Unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
