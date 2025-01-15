import { HiOutlineLogout } from 'react-icons/hi';
import { HiOutlineUser } from 'react-icons/hi2';
import LightOnDarkToggle from '../../component/LightOnDarkToggle';
import { useAppDipatch } from '../../context/useContextTypes';
import { signoutSuccess } from '../../context/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function BlogAdminHeader() {
  const navigate = useNavigate();

  const dispatch = useAppDipatch();

  const handleSignout = async () => {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
      });
      if (response.ok) {
        dispatch(signoutSuccess());
        toast.success('Signed out successfully');
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.log(error);
      toast.error('Error Signing out');
    }
  };

  return (
    <header className="header-admin">
      <ul className="header-admin__menu">
        <li>
          <LightOnDarkToggle />
        </li>
        <li>
          <button className="header-admin__btn-icon">
            <HiOutlineUser />
          </button>
        </li>
        <li>
          <button className="header-admin__btn-icon" type="button" onClick={handleSignout}>
            <HiOutlineLogout />
          </button>
        </li>
      </ul>
    </header>
  );
}

export default BlogAdminHeader;
