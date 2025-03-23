import { useEffect, useState } from 'react';
import { useAppSelector, useAppDipatch } from '../../context/useContextTypes';
import { verifyToken } from './authUtils';
import { signoutSuccess } from '../../context/userSlice';
import toast from 'react-hot-toast';
import { logger } from '../../utils/helpers';

/* 
  React Hooks (both built-in and custom) must follow 
  React's Hook Rules, which require:
  Hooks must only be called:
    - At the top level of a React function component or custom hook.
    - Not inside regular functions, conditionals, loops, or nested functions.
*/
export const useTokenVerification = (intervalMs = 20 * 60 * 1000) => {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDipatch();

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
          // Handles logout on token expiration
          dispatch(signoutSuccess());
          toast.error('Your session has expired. Please sign in again.');
          window.location.href = '/signin';
        }
      } catch (error) {
        logger.error('Error validating token: ', error);
        setIsTokenValid(false);
      } finally {
        setIsChecking(false); // Mark the check as completed
      }
    };

    // Run initial validation
    validateToken();

    // Set up interval for continuous verification
    const intervalId = setInterval(validateToken, intervalMs);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [currentUser, dispatch]);

  return { isTokenValid, isChecking };
};
