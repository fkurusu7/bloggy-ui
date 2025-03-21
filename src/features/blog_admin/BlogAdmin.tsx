import PostsTable from './PostsTable';
import Modal from '../../component/Modal';
import CreatePost from './CreatePost';
import Button from '../../component/Button';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import { useModal } from '../../hooks/useModal';
import TooltipUtil from '../../utils/TooltipUtil';

function BlogAdmin() {
  const { isOpenModal, closeModal, toggleModal } = useModal();

  return (
    <>
      <div className="row row-horizontal">
        <h1 className="heading heading-1">All Posts</h1>
        <Button variant="icon" size="large" onClick={toggleModal} tooltipmsg="Create Post">
          <HiOutlineDocumentPlus />
        </Button>
      </div>
      <div className="row row-vertical">
        <PostsTable />
      </div>
      {isOpenModal && (
        <Modal onClose={closeModal}>
          <div>
            <CreatePost closeModal={closeModal} />
          </div>
        </Modal>
      )}
      <TooltipUtil />
    </>
  );
}

export default BlogAdmin;
