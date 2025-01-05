import { Outlet } from 'react-router-dom';
import BlogAdminSidebar from './BlogAdminSidebar';

function BlogAdminLayout() {
  return (
    <div className="container-admin">
      <header className="header-admin">Header</header>
      <BlogAdminSidebar />
      <main className="main-admin">
        <Outlet />
      </main>
    </div>
  );
}

export default BlogAdminLayout;
