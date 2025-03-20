import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../context/useContextTypes';
import { useEffect, useState } from 'react';
import { logger } from '../../utils/helpers';
import { verifyToken } from './authUtils';
import toast from 'react-hot-toast';

/*{
  "success": true,
  "data": {
    "username": "fer",
    "email": "fer@test.com",
    "createdAt": "2025-01-11T05:35:16.438Z"
  }
}*/

function PrivateRoute() {
  const { currentUser } = useAppSelector((state) => state.user);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setIsChecking(false);
      return;
    }

    const validateToken = async () => {
      try {
        const valid = await verifyToken();
        setIsTokenValid(valid);

        if (!valid) {
          toast.error('Your session has expired. Please sign in again.');
        }
      } catch (error) {
        logger.error('Error validating token: ', error);
        setIsTokenValid(false);
      } finally {
        setIsChecking(true);
      }
    };

    validateToken();
  }, [currentUser]);

  // Show Loading indicator while checking token
  if (currentUser && isChecking) {
    return <div>Verifying session...</div>;
  }

  // If token does not exist in redux or tiekn is invalid, redirect to /signin
  if (!currentUser || !isTokenValid) {
    return <Navigate to={'/signin'} />;
  }

  // return currentUser ? <Outlet /> : <Navigate to={'/signin'} />;
  // If user exists and token is valid, render the protected route
  return <Outlet />;
}

export default PrivateRoute;
