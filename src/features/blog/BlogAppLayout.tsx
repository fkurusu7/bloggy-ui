import { Outlet } from 'react-router-dom';
import BlogHeader from './BlogHeader';
import SearchAndTags from './SearchAndTags';
import Footer from './Footer';

function BlogAppLayout() {
  return (
    <div className="blog__container">
      <BlogHeader />
      <main className="blog__main">
        <Outlet />
      </main>
      <SearchAndTags />
      <Footer />
    </div>
  );
}

export default BlogAppLayout;
