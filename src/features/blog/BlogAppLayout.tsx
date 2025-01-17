import { Outlet } from 'react-router-dom';
import BlogHeader from './BlogHeader';
import SearchAndTags from './SearchAndTags';

function BlogAppLayout() {
  return (
    <div className="blog__container">
      <BlogHeader />
      <main className="blog__main">
        <Outlet />
        <SearchAndTags />
      </main>
      <footer className="blog__footer">Footer</footer>
    </div>
  );
}

export default BlogAppLayout;
