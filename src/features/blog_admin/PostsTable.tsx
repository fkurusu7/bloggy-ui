import { HiOutlineXCircle, HiOutlineCheckCircle } from 'react-icons/hi2';
import { RiImageLine } from 'react-icons/ri';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { formatShortDate } from '../../utils/helpers';
import ButtonActions from './ButtonActions';
import { Link } from 'react-router-dom';

function PostsTable() {
  const { posts, isLoadingPosts, error, refetch } = useBlogPosts();

  const handlePostDeleted = () => {
    refetch(); // Refetch posts after deletion
  };

  return (
    <div className="blog-table" role="table">
      <div className="blog-table__header" role="row">
        <div></div>
        <div>Post</div>
        <div>Tags</div>
        <div>Date</div>
        <div className="blog-table__header-published">Published</div>
        <div></div>
      </div>

      {isLoadingPosts ? (
        <div className="blog-table__body-row">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="blog-table__body-row">
          <p>{error}</p>
        </div>
      ) : (
        posts.map((post) => {
          return (
            <div className="blog-table__body-row" key={post.title}>
              {post.banner ? (
                <img src={post.banner} alt="..." className="blog-table__body-row_img" />
              ) : (
                <RiImageLine className="blog-table__body-row_svg" />
              )}
              <Link to={`/blog/posts/${post.slug}`} className="blog-table__body-row_post">
                {post.title}
              </Link>
              <div className="blog-table__body-row_tags">
                {post.tags.map((tag) => tag.name).join(', ')}
              </div>
              <div className="blog-table__body-row_date">{formatShortDate(post.createdAt)}</div>
              <div
                className={`blog-table__body-row_draft ${post.draft ? 'blog-table__body-row_draft-false' : 'blog-table__body-row_draft-true'}`}
              >
                {post.draft ? <HiOutlineXCircle /> : <HiOutlineCheckCircle />}
              </div>
              <ButtonActions slug={post.slug} onPostDeleted={handlePostDeleted} />
            </div>
          );
        })
      )}
    </div>
  );
}

export default PostsTable;
