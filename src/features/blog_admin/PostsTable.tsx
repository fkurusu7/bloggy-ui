import { HiOutlineHandThumbUp, HiOutlineHandThumbDown } from 'react-icons/hi2';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { formatDateSimple } from '../../utils/helpers';

function PostsTable() {
  const { posts, isLoadingPosts, error } = useBlogPosts();
  console.log(posts);

  return (
    <div className="blog-table" role="table">
      <div className="blog-table__header" role="row">
        <div></div>
        <div>Post</div>
        <div>Tags</div>
        <div>Date</div>
        <div>Draft</div>
        <div></div>
      </div>
      {/* TABLE BODY - MAP ==> Post Data */}
      {isLoadingPosts ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        posts.map((post) => {
          return (
            <div className="blog-table__body-row" key={post.title}>
              <img src={post.banner} alt="..." className="blog-table__body-row_img" />
              <div className="blog-table__body-row_post">{post.title}</div>
              <div className="blog-table__body-row_tags">
                {post.tags.map((tag) => tag.name).join(', ')}
              </div>
              <div className="blog-table__body-row_date">{formatDateSimple(post.createdAt)}</div>
              <div className="blog-table__body-row_draft blog-table__body-row_draft-false">
                {post.draft ? <HiOutlineHandThumbUp /> : <HiOutlineHandThumbDown />}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default PostsTable;
