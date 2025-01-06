import { Outlet } from 'react-router-dom';
import BlogAdminSidebar from './BlogAdminSidebar';
import BlogAdminHeader from './BlogAdminHeader';

function BlogAdminLayout() {
  return (
    <div className="container-admin">
      <BlogAdminHeader />
      <BlogAdminSidebar />
      <main className="main-admin">
        <Outlet />
      </main>
    </div>
  );
}

export default BlogAdminLayout;
