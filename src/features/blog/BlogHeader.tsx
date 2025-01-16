import { Link } from 'react-router-dom';
import LightOnDarkToggle from '../../component/LightOnDarkToggle';
import { HiOutlineUser } from 'react-icons/hi2';
import { HiOutlineLogin, HiOutlineLogout } from 'react-icons/hi';

import Button from '../../component/Button';
import { useAuth } from '../../hooks/useAuth';
import { useAppSelector } from '../../context/useContextTypes';

function BlogHeader() {
  const { handleSignout } = useAuth();

  const { currentUser } = useAppSelector((state) => state.user);

  console.log(currentUser);

  return (
    <header className="blog__header">
      <div className="blog__header-logo">
        <Link to={'/'}>¯\_(ツ)_/¯</Link>
      </div>

      <ul className="blog__header-menu">
        <li>
          <LightOnDarkToggle />
        </li>
        {currentUser ? (
          <>
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
          </>
        ) : (
          <li>
            <Button variant="linkicon" to="/signin" onClick={handleSignout}>
              <HiOutlineLogin />
            </Button>
          </li>
        )}
      </ul>
    </header>
  );
}

export default BlogHeader;
