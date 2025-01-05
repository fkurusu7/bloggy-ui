import PostsTable from './PostsTable';

function BlogAdmin() {
  return (
    <>
      <div className="row row-horizontal">
        <h1 className="heading heading-1">All Posts</h1>
      </div>
      <div className="row row-vertical">
        <PostsTable />
      </div>
    </>
  );
}

export default BlogAdmin;
