import { Link, useParams } from 'react-router-dom';
import { FiLoader } from 'react-icons/fi';

import { useAppSelector } from '../../context/useContextTypes';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { formatShortDate } from '../../utils/helpers';
import ButtonActions from '../blog_admin/ButtonActions';
import Button from '../../component/Button';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import { useModal } from '../../hooks/useModal';
import Modal from '../../component/Modal';
import CreatePost from '../blog_admin/CreatePost';
import TooltipUtil from '../../utils/TooltipUtil';

function Posts() {
  const { currentUser } = useAppSelector((state) => state.user);
  const { isOpenModal, closeModal, toggleModal } = useModal();
  const { searchTerm, tag } = useParams();
  const { posts, isLoadingPosts, error, getTitle, refetch } = useBlogPosts({ searchTerm, tag });

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
            <div className="blog__main-posts-post" key={post.slug}>
              <span>{formatShortDate(post.createdAt)}</span>
              <Link
                to={`/blog/posts/${post.slug}`}
                key={post.slug}
                onClick={(ev) => {
                  if (ev.defaultPrevented) return;
                }}
              >
                {post.title}
                {/* TODO: add tags? */}
                {/* <div className="blog__main-tags">
                  {post.tags.map((tag) => (
                    <p key={tag.slug} className="blog__main-tag">
                      {tag.name}
                    </p>
                  ))}
                </div> */}
              </Link>
              <div className="blog__main-posts-post-actions">
                {currentUser && (
                  <ButtonActions slug={post.slug} onPostDeleted={handlePostDeleted} />
                )}
              </div>
            </div>
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
