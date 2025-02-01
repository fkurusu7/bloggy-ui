import { Link, useParams } from 'react-router-dom';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { FiLoader } from 'react-icons/fi';
import { formatDateSimple } from '../../utils/helpers';
import { HiOutlineArrowLeftCircle } from 'react-icons/hi2';
import TooltipUtil from '../../utils/TooltipUtil';

function Post() {
  const { slug } = useParams();
  const { posts, isLoadingPosts: isLoading, error } = useBlogPosts({ slug });
  const post = posts[0];

  const calculateReadingTime = (content: string) => {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 150);
    return `${minutes} min read`;
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="blog__main-loading">
        <FiLoader className="spin" />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return <div className="blog__main-error">Error loading post: {error}</div>;
  }

  // Handle no post found
  if (!post) {
    return (
      <>
        <div className="blog__main-post__heading">
          <p className="blog__main-post__error">Post not found</p>
          <Link
            to={'/blog'}
            data-tooltip-id="tooltipid"
            data-tooltip-content="Go back"
            data-tooltip-place="top"
          >
            <HiOutlineArrowLeftCircle />
          </Link>
        </div>
        <TooltipUtil />
      </>
    );
  }

  return (
    <>
      <div className="blog__main-post__heading">
        <h1 className="blog__main-post__title">{post.title}</h1>
        <span>{calculateReadingTime(post.content)}</span>
      </div>
      <article className="blog__main-post">
        <div className="blog__main-post__meta">
          <div className="blog__main-post__tags">
            {post.tags.map((tag, index) => (
              <span key={`${tag.slug}-${index}`}>{tag.name}</span>
            ))}
          </div>
          <div className="blog__main-post__created">{formatDateSimple(post.createdAt)}</div>
        </div>
        <div className="blog__main-post-description">{post.description}</div>
        <div className="blog__main-post-content">{post.content}</div>
      </article>
    </>
  );
}

export default Post;
