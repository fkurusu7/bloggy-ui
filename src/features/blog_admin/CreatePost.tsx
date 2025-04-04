import toast from 'react-hot-toast';

import { PostData } from './types';
import { useNavigate } from 'react-router-dom';
import PostForm from './PostForm';
import { API_BASE_URL } from '../../utils/helpers';

interface CreatePostProps {
  closeModal: () => void;
  onPostCreatedRefetch?: () => void;
}

function CreatePost({ closeModal, onPostCreatedRefetch }: CreatePostProps) {
  const navigate = useNavigate();

  const handleSubmit = async (data: PostData) => {
    const response = await fetch(`${API_BASE_URL}/api/blog/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Submitting error');
    }

    toast.success('Post created successfully!');
    // Cannot invoke an object which is possibly 'undefined'.ts(2722)
    // onPostCreatedRefetch();
    onPostCreatedRefetch?.();
    closeModal();
    navigate('/blog/admin');
  };

  return (
    <div className="create__container">
      <h2 className="heading-1">Create a Post</h2>
      <PostForm onSubmit={handleSubmit} submitButtonText="Publish" />
    </div>
  );
}

export default CreatePost;
