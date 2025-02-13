import { useNavigate } from 'react-router-dom';
import PostForm from './PostForm';
import { PostData } from './types';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { FiLoader } from 'react-icons/fi';

interface UpdatePostProps {
  slug: string;
  closeModal: () => void;
}

function UpdatePost({ slug, closeModal }: UpdatePostProps) {
  const navigate = useNavigate();

  const [post, setPost] = useState<PostData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}`);

        if (!response.ok) {
          console.log(response);
          throw new Error('Error fetching post');
        }

        const post = await response.json();
        setPost(post);
      } catch (error) {
        toast.error('Error fetching post');
        console.log(error);
        closeModal();
        navigate('/blog/admin');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  const handleSubmit = async (data: PostData) => {
    const response = await fetch(`/api/blog/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error fetching post');
    }

    toast.success('Post updated successfully!');
    navigate('/blog/admin');
  };

  if (isLoading) {
    return (
      <div className="create__container">
        <FiLoader className="spin" />
      </div>
    );
  }

  return (
    <div className="create__container">
      <h2 className="heading-2">Update a Post</h2>
      <PostForm submitButtonText="Update" onSubmit={handleSubmit} initialData={post} />
    </div>
  );
}

export default UpdatePost;
