import PostsTable from './PostsTable';
import Modal from '../../component/Modal';
import CreatePost from './CreatePost';
import Button from '../../component/Button';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import { useModal } from '../../hooks/useModal';

function BlogAdmin() {
  const { isOpenModal, closeModal, toggleModal } = useModal();

  return (
    <>
      <div className="row row-horizontal">
        <h1 className="heading heading-1">All Posts</h1>
        <Button variant="icon" size="large" onClick={toggleModal}>
          <HiOutlineDocumentPlus />
        </Button>
      </div>
      <div className="row row-vertical">
        <PostsTable />
      </div>
      {isOpenModal && (
        <Modal onClose={closeModal}>
          <div>
            <CreatePost />
          </div>
        </Modal>
      )}
    </>
  );
}

export default BlogAdmin;
