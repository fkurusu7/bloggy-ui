import { Outlet } from 'react-router-dom';
import BlogHeader from './BlogHeader';

function BlogAppLayout() {
  return (
    <div className="blog__container">
      <BlogHeader />
      <main className="blog__main">
        {/* <section className="blog__main-posts">Posts</section>*/}
        <Outlet />
        <aside className="blog__main-search">Search and Tags</aside>
      </main>
      <footer className="blog__footer">Footer</footer>
    </div>
  );
}

export default BlogAppLayout;
