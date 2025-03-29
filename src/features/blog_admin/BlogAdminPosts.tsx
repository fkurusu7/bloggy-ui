import PostsTable from './PostsTable';
import Modal from '../../component/Modal';
import CreatePost from './CreatePost';
import Button from '../../component/Button';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import { useModal } from '../../hooks/useModal';
import TooltipUtil from '../../utils/TooltipUtil';
import { useBlogPosts } from '../../hooks/useBlogPosts';

function BlogAdminPosts() {
  const { isOpenModal, closeModal, toggleModal } = useModal();
  const { posts, isLoadingPosts, error, refetch } = useBlogPosts();

  return (
    <>
      <div className="row row-horizontal">
        <h1 className="heading heading-1">All Posts</h1>
        <Button variant="icon" size="large" onClick={toggleModal} tooltipmsg="Create Post">
          <HiOutlineDocumentPlus />
        </Button>
      </div>
      <div className="row row-vertical">
        <PostsTable posts={posts} isLoadingPosts={isLoadingPosts} error={error} refetch={refetch} />
      </div>
      {isOpenModal && (
        <Modal onClose={closeModal}>
          <div>
            <CreatePost closeModal={closeModal} onPostCreatedRefetch={refetch} />
          </div>
        </Modal>
      )}
      <TooltipUtil />
    </>
  );
}

export default BlogAdminPosts;
