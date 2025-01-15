import { Outlet } from 'react-router-dom';

function BlogAppLayout() {
  return (
    <div className="blog__container">
      <header className="blog__header">Header</header>
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
