import Button from '../../component/Button';
import Modal from '../../component/Modal';
import { useModal } from '../../hooks/useModal';
import UserForm from './UserForm';

function BlogUserAdmin() {
  const { isOpenModal, closeModal, toggleModal } = useModal();

  return (
    <>
      <div className="user-admin__container">
        <div className="user-admin">
          <h2 className="user-admin__title">Fernando C</h2>
          <img className="user-admin__img" src="/me_temp.png" alt="Me, Fer CuVa" />
          <p className="user-admin__email">coding.fcv@gmail.com</p>
          <p className="user-admin__posts">
            <span>Total posts:</span> <span className="user-admin__total">23</span>
          </p>
          <hr />
          <Button variant="secondary" size="small" onClick={toggleModal}>
            Update
          </Button>
        </div>
      </div>
      {isOpenModal && (
        <Modal onClose={closeModal}>
          <UserForm />
        </Modal>
      )}
    </>
  );
}

export default BlogUserAdmin;
