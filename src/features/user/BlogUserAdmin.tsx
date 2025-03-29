import Button from '../../component/Button';
import Modal from '../../component/Modal';
import { useModal } from '../../hooks/useModal';

function BlogUserAdmin() {
  /* 
    SHOW Info:
      name --> fullname
      Image ? profile_img : user svg
      email --> f*****@g***.com - btn to show email

      Total Posts
      Total reads ?????

      
    Update User in a modal
  */

  const { isOpenModal, closeModal, toggleModal } = useModal();

  return (
    <>
      <div className="user-admin__container">
        <div className="user-admin">
          <h2 className="user-admin__title">Fernando C</h2>
          <img className="user-admin__img" src="/me_temp.png" alt="Me, Fer CuVa" />
          <p className="user-admin__email">coding.fcv@gmail.com</p>
          <hr />
          <Button variant="secondary" size="small" onClick={toggleModal}>
            Update
          </Button>
        </div>
      </div>
      {isOpenModal && (
        <Modal onClose={closeModal}>
          <div>UPDATE</div>
        </Modal>
      )}
    </>
  );
}

export default BlogUserAdmin;
