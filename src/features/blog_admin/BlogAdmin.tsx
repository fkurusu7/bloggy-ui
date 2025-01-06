import { useState } from 'react';
import PostsTable from './PostsTable';
import Modal from '../../component/Modal';

function BlogAdmin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <div className="row row-horizontal">
        <button type="button" onClick={() => setIsOpenModal(!isOpenModal)}>
          Show modal
        </button>
      </div>
      <div className="row row-horizontal">
        <h1 className="heading heading-1">All Posts</h1>
      </div>
      <div className="row row-vertical">
        <PostsTable />
      </div>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <div>
            <h1> {'onClick={() => onCloseModal?.(false)}'}</h1>
          </div>
        </Modal>
      )}
    </>
  );
}

export default BlogAdmin;
