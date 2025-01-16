import { Link } from 'react-router-dom';
import LightOnDarkToggle from '../../component/LightOnDarkToggle';
import { HiOutlineUser } from 'react-icons/hi2';
import { HiOutlineLogout } from 'react-icons/hi';

import Button from '../../component/Button';
import { useAuth } from '../../hooks/useAuth';

function BlogHeader() {
  const { handleSignout } = useAuth();
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
