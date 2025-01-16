import { HiOutlineLogout } from 'react-icons/hi';
import { HiOutlineUser } from 'react-icons/hi2';
import LightOnDarkToggle from '../../component/LightOnDarkToggle';
import { useAuth } from '../../hooks/useAuth';

function BlogAdminHeader() {
  const { handleSignout } = useAuth();

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
