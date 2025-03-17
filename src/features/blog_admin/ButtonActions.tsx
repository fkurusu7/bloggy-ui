import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import Button from '../../component/Button';
import toast from 'react-hot-toast';
import React from 'react';
import { useModal } from '../../hooks/useModal';
import Modal from '../../component/Modal';
import UpdatePost from './UpdatePost';
import { API_BASE_URL } from '../../utils/helpers';

type ActionData = {
  slug: string;
  onPostDeleted?: () => void;
};

function ButtonActions({ slug, onPostDeleted }: ActionData) {
  const {
    isOpenModal: isUpdateModal,
    closeModal: closeUpdateModal,
    toggleModal: toggleModalUpdate,
  } = useModal();
  const {
    isOpenModal: isDeleteModal,
    closeModal: closeDeleteModal,
    toggleModal: toggleModalDelete,
  } = useModal();

  const handleDeletePost = async (ev: React.MouseEvent) => {
    // Prevent the event from bubbling up to the parent Link
    ev.preventDefault();
    ev.stopPropagation();

    console.log('Delete post', slug);

    try {
      const response = await fetch(`${API_BASE_URL}/api/blog/remove?slug=${slug}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Could not delete the post');
      }

      toast.success('Post deleted successfully');
      onPostDeleted?.();
      console.log('Delete post', slug);
    } catch (error) {
      toast.error('Failed to delete the post');
      console.log(error);
      onPostDeleted?.();
    }
  };

  return (
    <>
      <div className="post__actions">
        <Button
          variant="icon"
          tooltipmsg="Edit Post"
          tooltipplace="left"
          onClick={toggleModalUpdate}
        >
          <HiOutlinePencilSquare color="var(--color-green-700)" />
        </Button>
        <Button
          variant="icon"
          tooltipmsg="Delete Post"
          tooltipplace="right"
          onClick={toggleModalDelete}
        >
          <HiOutlineTrash color="var(--color-red-700)" />
        </Button>
      </div>
      {isUpdateModal && (
        <Modal onClose={closeUpdateModal}>
          <div>
            <UpdatePost slug={slug} closeModal={closeUpdateModal} />
          </div>
        </Modal>
      )}
      {isDeleteModal && (
        <Modal onClose={closeDeleteModal}>
          <div className="delete__confirmation">
            <h2 className="heading-2">Confirm Deletion</h2>
            <div>
              <p>Are you sure you want to delete this post?</p>
              <p className="delete__undone">This action cannot be undone.</p>
            </div>
            <div className="delete__actions">
              <Button variant="secondary" size="small" onClick={closeDeleteModal}>
                Cancel
              </Button>
              <Button variant="danger" size="small" onClick={handleDeletePost}>
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ButtonActions;
