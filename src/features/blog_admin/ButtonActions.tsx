import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import Button from '../../component/Button';
import toast from 'react-hot-toast';
import React from 'react';
import { useModal } from '../../hooks/useModal';
import Modal from '../../component/Modal';
import UpdatePost from './UpdatePost';

type ActionData = {
  slug: string;
  onPostDeleted?: () => void;
};

function ButtonActions({ slug, onPostDeleted }: ActionData) {
  const { isOpenModal, closeModal, toggleModal } = useModal();

  const handleDeletePost = async (ev: React.MouseEvent) => {
    // Prevent the event from bubbling up to the parent Link
    ev.preventDefault();
    ev.stopPropagation();

    try {
      const response = await fetch(`/api/blog/remove?slug=${slug}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Could not delete the post');
      }
      toast.success('Post deleted successfully');
      onPostDeleted?.();
    } catch (error) {
      toast.error('Failed to delete the post');
      console.log(error);
    }
  };

  return (
    <>
      <div className="post__actions">
        <Button variant="icon" tooltipmsg="Edit Post" tooltipplace="left" onClick={toggleModal}>
          <HiOutlinePencilSquare color="var(--color-green-700)" />
        </Button>
        <Button
          variant="icon"
          tooltipmsg="Delete Post"
          tooltipplace="right"
          onClick={handleDeletePost}
        >
          <HiOutlineTrash color="var(--color-red-700)" />
        </Button>
      </div>
      {isOpenModal && (
        <Modal onClose={closeModal}>
          <div>
            <UpdatePost slug={slug} closeModal={closeModal} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default ButtonActions;
