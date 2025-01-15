import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import BlogAdmin from './features/blog_admin/BlogAdmin';
import BlogAdminLayout from './features/blog_admin/BlogAdminLayout';
import Tmp from './features/blog_admin/Tmp';
import { Toaster } from 'react-hot-toast';
import { LightOnDarkProvider } from './context/LightOnDarkMode';
import Me from './features/me/Me';
import Resume from './features/resume/Resume';
import UserAuth from './features/auth/UserAuth';
import PrivateRoute from './features/auth/PrivateRoute';
import BlogAppLayout from './features/blog/BlogAppLayout';

function App() {
  return (
    <LightOnDarkProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route element={<Me />}>
            <Route index element={<Navigate replace to={'me'} />} />
            <Route path="/" element={<Me />} />
          </Route>
          <Route path="/resume" element={<Resume />} /> */}
          <Route path="/" element={<Me />} />
          <Route path="/me" element={<Me />} />
          <Route path="/resume" element={<Resume />} />
          {/* AUTH */}
          <Route path="/signin" element={<UserAuth type="signin" />} />
          <Route path="/signup" element={<UserAuth type="signup" />} />
          {/* BLOG  */}
          <Route element={<BlogAppLayout />}>
            <Route path="/blog/posts" element={<h1>POSTSSSSS</h1>} />
            <Route path="/blog/posts/:postId" element={<h1>POST number</h1>} />
          </Route>
          {/* BLOG ADMIN */}
          <Route element={<PrivateRoute />}>
            <Route element={<BlogAdminLayout />}>
              <Route index element={<Navigate replace to={'/blog/admin'} />} />
              <Route path="/blog/admin" element={<BlogAdmin />} />
              <Route path="/blog/tmp" element={<Tmp />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 4000,
          },
          error: {
            duration: 5000,
          },
          style: {
            backgroundColor: 'var(--color-grey-50)',
            color: 'var(--color-grey-700)',
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
          },
        }}
      />
    </LightOnDarkProvider>
  );
}

export default App;
