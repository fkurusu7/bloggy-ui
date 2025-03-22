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
