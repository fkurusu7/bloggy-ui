import { Link, useNavigate } from 'react-router-dom';
import LightOnDarkToggle from '../../component/LightOnDarkToggle';
import { HiOutlineUser } from 'react-icons/hi2';
import { HiOutlineLogout } from 'react-icons/hi';
import { useAppDipatch } from '../../context/useContextTypes';
import { signoutSuccess } from '../../context/userSlice';
import toast from 'react-hot-toast';
import Button from '../../component/Button';

function BlogHeader() {
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
    <header className="blog__header">
      <div className="blog__header-logo">
        <Link to={'/'}>¯\_(ツ)_/¯</Link>
      </div>

      <ul className="blog__header-menu">
        <li>
          <LightOnDarkToggle />
        </li>
        <li>
          <Button type="button" variant="icon">
            <HiOutlineUser />
          </Button>
        </li>
        <li>
          <Button type="button" variant="icon" onClick={handleSignout}>
            <HiOutlineLogout />
          </Button>
        </li>
      </ul>
    </header>
  );
}

export default BlogHeader;
