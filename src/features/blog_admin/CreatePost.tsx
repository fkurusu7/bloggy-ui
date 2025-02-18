import toast from 'react-hot-toast';

import { PostData } from './types';
import { useNavigate } from 'react-router-dom';
import PostForm from './PostForm';

interface CreatePostProps {
  closeModal: () => void;
}

function CreatePost({ closeModal }: CreatePostProps) {
  const navigate = useNavigate();

  const handleSubmit = async (data: PostData) => {
    const response = await fetch('/api/blog/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Submitting error');
    }

    toast.success('Post created successfully!');
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
