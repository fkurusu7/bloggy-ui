import { HiOutlineLogout } from 'react-icons/hi';
import { HiOutlineDocumentText } from 'react-icons/hi2';

import LightOnDarkToggle from '../../component/LightOnDarkToggle';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../component/Button';

function BlogAdminHeader() {
  const { handleSignout } = useAuth();

  return (
    <header className="header-admin">
      <ul className="blog__header-menu">
        <li>
          <LightOnDarkToggle />
        </li>

        <>
          <li>
            <Button variant="linkicon" to="/blog">
              <HiOutlineDocumentText />
            </Button>
          </li>
          <li>
            <Button type="button" variant="icon" onClick={handleSignout}>
              <HiOutlineLogout />
            </Button>
          </li>
        </>
      </ul>
    </header>
  );
}

export default BlogAdminHeader;
