import { Link, NavLink } from 'react-router-dom';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import { HiOutlineNewspaper } from 'react-icons/hi2';

function BlogAdminSidebar() {
  return (
    <aside className="sidebar-admin">
      <Link to={'/'} className="sidebar-admin__logo">
        ¯\_(ツ)_/¯
      </Link>
      <nav className="sidebar-admin__nav">
        <ul className="sidebar-admin__ul">
          <li className="sidebar-admin__li">
            <NavLink to={'blog/admin'} className="sidebar-admin__link">
              <HiOutlineNewspaper />
              <span>Posts</span>
            </NavLink>
          </li>
          <li className="sidebar-admin__li">
            <NavLink to={'blog/tmp'} className="sidebar-admin__link">
              <HiOutlineUserCircle />
              <span>User</span>
            </NavLink>
          </li>
          <li className="sidebar-admin__li">
            <NavLink to={'blog/admin'} className="sidebar-admin__link">
              <HiOutlineCog6Tooth />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default BlogAdminSidebar;
