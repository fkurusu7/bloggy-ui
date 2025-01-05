import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Me from './features/Me';
import MeAppLayout from './features/MeAppLayout';
import BlogAdmin from './features/blog_admin/BlogAdmin';
import BlogAdminLayout from './features/blog_admin/BlogAdminLayout';
import Tmp from './features/blog_admin/Tmp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MeAppLayout />}>
          <Route index element={<Navigate replace to={'me'} />} />
          <Route path="me" element={<Me />} />
        </Route>
        <Route element={<BlogAdminLayout />}>
          <Route index element={<Navigate replace to={'blog/admin'} />} />
          <Route path="blog/admin" element={<BlogAdmin />} />
          <Route path="blog/tmp" element={<Tmp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
