import { useEffect, useState } from 'react';
import Button from '../../component/Button';
import Modal from '../../component/Modal';
import { useModal } from '../../hooks/useModal';
import UserForm from './UserForm';
import { UserData } from '../blog_admin/types';
import toast from 'react-hot-toast';
import { API_BASE_URL, logger } from '../../utils/helpers';

function BlogUserAdmin() {
  const { isOpenModal, closeModal, toggleModal } = useModal();

  /*   
    fullname: string;
    email: string;
    profileImg: string;
    posts: number;
  */
  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/user/getSignedInUser`, {
          credentials: 'include',
        });

        if (!response.ok) {
          logger.error(response);
          throw new Error('Error fetching user info');
        }

        const jsonRes = await response.json();
        // console.log(jsonRes);

        const transformedUser: UserData = {
          fullname: jsonRes.data.fullname,
          email: jsonRes.data.email,
          profileImg: jsonRes.data.profileImg,
          posts: jsonRes.data.posts,
        };
        // console.log(transformedUser);
        setUser(transformedUser);
      } catch (error) {
        toast.error(`Error fetching user, please refresh page. ${error}`);
        // refresh page
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <div className="user-admin__container">
        <div className="user-admin">
          {isLoading}
          <h2 className="user-admin__title">{user?.fullname}</h2>
          <img className="user-admin__img" src={user?.profileImg} alt="Me, Fer CuVa" />
          <p className="user-admin__email">{user?.email}</p>
          <p className="user-admin__posts">
            <span>Total posts:</span> <span className="user-admin__total">{user?.posts}</span>
          </p>
          <hr />
          <Button variant="secondary" size="small" onClick={toggleModal}>
            Update
          </Button>
        </div>
      </div>
      {isOpenModal && (
        <Modal onClose={closeModal}>
          {user && (
            <UserForm
              userData={user}
              onClose={closeModal}
              onUpdate={(updatedUser: UserData) => setUser(updatedUser)}
            />
          )}
        </Modal>
      )}
    </>
  );
}

export default BlogUserAdmin;
