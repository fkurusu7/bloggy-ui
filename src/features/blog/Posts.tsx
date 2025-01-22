import { HiOutlineDocumentPlus, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import Button from '../../component/Button';
import { useAppSelector } from '../../context/useContextTypes';
import { Link, useParams } from 'react-router-dom';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { formatShortDate } from '../../utils/helpers';
import { FiLoader } from 'react-icons/fi';
import { useState } from 'react';
import Modal from '../../component/Modal';
import CreatePost from '../blog_admin/CreatePost';

function Posts() {
  const { currentUser } = useAppSelector((state) => state.user);
  const { searchTerm, tag } = useParams();
  const { posts, isLoadingPosts, error, getTitle } = useBlogPosts({ searchTerm, tag });
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      {/* Title Will be passed when loading posts or search term or any */}
      <div className="row row-horizontal">
        <h2 className="blog__main-title">{getTitle()}</h2>
        {currentUser && (
          <Button variant="icon" size="large" onClick={() => setIsOpenModal(!isOpenModal)}>
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
            <Link to={`/blog/posts/${post.slug}`} className="blog__main-posts-post" key={post.slug}>
              <div className="blog__main-posts-post-heading">
                <h2>{post.title}</h2>
                <span>{formatShortDate(post.createdAt)}</span>
              </div>
              <p className="blog__main-posts-post-description">{post.description}</p>
              <div className="blog__main-tags">
                {post.tags.map((tag) => (
                  <p key={tag.slug} className="blog__main-tag">
                    {tag.name}
                  </p>
                ))}
              </div>
              {currentUser && (
                <div className="blog__main-posts-post-actions">
                  <Button variant="icon">
                    <HiOutlineTrash color="var(--color-red-700)" />
                  </Button>
                  <Button variant="icon">
                    <HiOutlinePencilSquare color="var(--color-green-700)" />
                  </Button>
                </div>
              )}
            </Link>
          ))
        )}
      </section>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <div>
            <CreatePost />
          </div>
        </Modal>
      )}
    </>
  );
}

export default Posts;
