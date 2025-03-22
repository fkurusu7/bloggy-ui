import { API_BASE_URL, logger } from '../../utils/helpers';

/**
 * Verifies if the current user's token is valid
 * @returns Promise<boolean> true if token is valid, false otherwise
 */
export const verifyToken = async () => {
  try {
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
