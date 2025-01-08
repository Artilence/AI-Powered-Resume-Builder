/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { protectedAPI } from '../app/api/api';

const ProtectedRoute = ({ element: Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Manage auth state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await protectedAPI.get('/me/');
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);

        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // If still loading auth state, don't render anything
  if (isAuthenticated === null) {
    return <>Loading</>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if authenticated
  return <Element />;
};

export default ProtectedRoute;
