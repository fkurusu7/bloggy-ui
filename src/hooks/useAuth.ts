import { useNavigate } from 'react-router-dom';
import { useAppDipatch } from '../context/useContextTypes';
import toast from 'react-hot-toast';
import { signoutSuccess } from '../context/userSlice';
import { API_BASE_URL } from '../utils/helpers';

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDipatch();

  const handleSignout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        dispatch(signoutSuccess());
        toast.success('Sign out successfully');
        navigate('/me', { replace: true });
      }
    } catch (error) {
      console.log(error);
      toast.error('Error signing out');
    }
  };

  return { handleSignout };
};
