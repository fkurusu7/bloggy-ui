import { Outlet } from 'react-router-dom';
import BlogHeader from './BlogHeader';
import Tags from './Tags';
import Footer from './Footer';

function BlogAppLayout() {
  return (
    <div className="container__body">
      <div className="blog__container">
        <BlogHeader />
        <main className="blog__main">
          <Outlet />
        </main>
        <Tags />
        <Footer />
      </div>
    </div>
  );
}

export default BlogAppLayout;
