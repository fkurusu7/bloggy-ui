import { Link, useParams } from 'react-router-dom';
import { FiLoader } from 'react-icons/fi';

import { useBlogPosts } from '../../hooks/useBlogPosts';
import { formatShortDate } from '../../utils/helpers';
import TooltipUtil from '../../utils/TooltipUtil';

function Posts() {
  const { searchTerm, tag } = useParams();
  const { posts, isLoadingPosts, error, getTitle } = useBlogPosts({ searchTerm, tag });

  return (
    <>
      {/* Title Will be passed when loading posts or search term or any */}
      <div className="row row-horizontal">
        <h2 className="blog__main-title">{getTitle()}</h2>
      </div>

      <section className="blog__main-posts">
        {isLoadingPosts ? (
          <FiLoader className="spin" />
        ) : error ? (
          <p>{error}</p>
        ) : !posts.length ? (
          <>
            <p className="blog__main-posts-404">There are no posts available.</p>
            <p className="blog__main-posts-404">Be the first to create a post!</p>

            {/* Link to load all posts when searching by a tag */}
            {tag && (
              <>
                <p className="blog__main-posts-404">No posts were found</p>
                <Link to={'/blog'} className="blog__main-posts-back">
                  Back - Load All Posts
                </Link>
              </>
            )}
          </>
        ) : (
          posts.map((post) => (
            <Link
              className="blog__main-posts-post"
              key={post.slug}
              to={`/blog/posts/${post.slug}`}
              onClick={(ev) => {
                if (ev.defaultPrevented) return;
              }}
            >
              <span className="blog__main-posts-post-date">{formatShortDate(post.createdAt)}</span>
              <span className="blog__main-posts-post-title">{post.title}</span>
            </Link>
          ))
        )}
      </section>

      <TooltipUtil />
    </>
  );
}

export default Posts;
