import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../context/useContextTypes';
import { API_BASE_URL, logger } from '../../utils/helpers';
import { signoutSuccess } from '../../context/userSlice';
import toast from 'react-hot-toast';

/**
 * Verifies if the current user's token is valid
 * @returns Promise<boolean> true if token is valid, false otherwise
 */
export const verifyToken = async () => {
  try {
    const { currentUser } = useAppSelector((state) => state.user);

    if (!currentUser) return false;

    const response = await fetch(`${API_BASE_URL}/api/auth/verify-token`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    });

    return response.ok;
  } catch (error) {
    logger.error('Error verifying token:', error);
    return false;
  }
};

/**
 * Handles logout on token expiration
 */
export const handleSessionExpiration = () => {
  // Sign out
  const dispatch = useDispatch();
  dispatch(signoutSuccess());

  toast.error('Your session has expired. Please sign in again.');

  // redirect to sign in page
  window.location.href = '/signin';
};

export const setupTokenVerification = (intervalMs = 5 * 60 * 1000) => {
  const { currentUser } = useAppSelector((state) => state.user);

  const checkAndHandleTokenValidity = async () => {
    const isValid = await verifyToken();
    if (!isValid && currentUser) {
      handleSessionExpiration();
    }

    checkAndHandleTokenValidity();

    // set up interval for checking
    return setInterval(() => {
      checkAndHandleTokenValidity;
    }, intervalMs);
  };
};
