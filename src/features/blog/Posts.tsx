import { Link, useParams } from 'react-router-dom';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import { FiLoader } from 'react-icons/fi';

import Button from '../../component/Button';
import { useAppSelector } from '../../context/useContextTypes';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { formatShortDate } from '../../utils/helpers';
import Modal from '../../component/Modal';
import CreatePost from '../blog_admin/CreatePost';
import { useModal } from '../../hooks/useModal';
import TooltipUtil from '../../utils/TooltipUtil';
import ButtonActions from '../blog_admin/ButtonActions';

function Posts() {
  const { currentUser } = useAppSelector((state) => state.user);
  const { searchTerm, tag } = useParams();
  const { posts, isLoadingPosts, error, getTitle, refetch } = useBlogPosts({ searchTerm, tag });
  const { isOpenModal, closeModal, toggleModal } = useModal();

  const handlePostDeleted = () => {
    refetch(); // Refetch posts after deletion
  };

  return (
    <>
      {/* Title Will be passed when loading posts or search term or any */}
      <div className="row row-horizontal">
        <h2 className="blog__main-title">{getTitle()}</h2>
        {currentUser && (
          <Button variant="icon" size="large" onClick={toggleModal} tooltipmsg="Create Post">
            <HiOutlineDocumentPlus />
          </Button>
        )}
      </div>

      <section className="blog__main-posts">
        {isLoadingPosts ? (
          <FiLoader className="spin" />
        ) : error ? (
          <p>{error}</p>
        ) : (
          posts.map((post) => (
            <Link
              to={`/blog/posts/${post.slug}`}
              className="blog__main-posts-post"
              key={post.slug}
              onClick={(ev) => {
                if (ev.defaultPrevented) return;
              }}
            >
              <div className="blog__main-posts-post-heading">
                <h2>{post.title}</h2>
                <span>{formatShortDate(post.createdAt)}</span>
              </div>
              <p className="blog__main-posts-post-description">{post.description}</p>
              <div className="blog__main-posts-post-actions">
                <div className="blog__main-tags">
                  {post.tags.map((tag) => (
                    <p key={tag.slug} className="blog__main-tag">
                      {tag.name}
                    </p>
                  ))}
                </div>
                {currentUser && (
                  <ButtonActions slug={post.slug} onPostDeleted={handlePostDeleted} />
                )}
              </div>
            </Link>
          ))
        )}
      </section>
      {isOpenModal && (
        <Modal onClose={closeModal}>
          <div>
            <CreatePost />
          </div>
        </Modal>
      )}
      <TooltipUtil />
    </>
  );
}

export default Posts;
