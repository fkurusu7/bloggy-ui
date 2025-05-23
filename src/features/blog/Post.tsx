import { Link, useParams } from 'react-router-dom';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { FiLoader } from 'react-icons/fi';
import { formatDateSimple, logger } from '../../utils/helpers';
import { HiOutlineArrowLeftCircle } from 'react-icons/hi2';
import TooltipUtil from '../../utils/TooltipUtil';
import PostContent from './PostContent';

function Post() {
  const { slug } = useParams();
  const { posts, isLoadingPosts: isLoading, error } = useBlogPosts({ slug });
  const post = posts[0];

  const calculateReadingTime = (content: string) => {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 75);
    return `${minutes} min read`;
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="blog__post-info-loading">
        <FiLoader className="spin" />
      </div>
    );
  }

  // Handle error state

  if (error) {
    logger.error(error);
    return (
      <article className="blog__post-info">
        <div className="blog__post-info-error">Error loading post: {error}</div>;
      </article>
    );
  }

  // Handle post NOT found
  if (!post) {
    return (
      <article className="blog__post-info">
        <div className="blog__post-info__heading">
          <h2>Post not found</h2>
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
      </article>
    );
  }
  logger.info(post);

  return (
    <article className="blog__post-info">
      <div className="blog__post-info__heading">
        <h1 className="blog__post-info__title">{post.title}</h1>
      </div>
      <div className="blog__post-info__meta">
        <div className="blog__post-info__tags">
          {post.tags.map((tag, index) => (
            <span key={`${tag.slug}-${index}`}>{tag.name}</span>
          ))}
          {/* <span>tag.name</span>
          <span>tag.name</span>
          <span>tag.name</span> */}
        </div>
        <div className="blog__post-info__created">{formatDateSimple(post.createdAt)}</div>
        <span className="blog__post-info__meta-read">{calculateReadingTime(post.content)}</span>
      </div>
      {post.banner && (
        <div className="blog__post-info__banner">
          <img src={post.banner} />
        </div>
      )}
      <div className="blog__post-info__description">{post.description}</div>
      <PostContent content={post.content} />
    </article>
  );
}

export default Post;
