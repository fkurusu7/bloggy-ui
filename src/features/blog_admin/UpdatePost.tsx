import { useNavigate } from 'react-router-dom';
import PostForm from './PostForm';
import { PostData } from './types';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import { API_BASE_URL, logger } from '../../utils/helpers';

interface UpdatePostProps {
  slug: string;
  closeModal: () => void;
}

// Interface to match the API response structure
interface APIPost {
  userId: {
    personal_info: {
      username: string;
    };
  };
  title: string;
  banner: string;
  description: string;
  content: string;
  tags: Array<{
    name: string;
    slug: string;
  }>;
  createdAt: string;
  slug: string;
}

function UpdatePost({ slug, closeModal }: UpdatePostProps) {
  const navigate = useNavigate();

  const [post, setPost] = useState<PostData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/blog/getPosts?slug=${slug}`);

        if (!response.ok) {
          logger.error(response);
          throw new Error('Error fetching post');
        }

        const resPost = await response.json();
        const apiPost: APIPost = resPost.data[0];
        // Transform API data to match PostData interface
        const transformedPost: PostData = {
          title: apiPost.title,
          banner: apiPost.banner,
          content: apiPost.content,
          description: apiPost.description,
          tags: apiPost.tags.map((tag) => tag.name),
        };

        setPost(transformedPost);
      } catch (error) {
        toast.error('Error fetching post');
        logger.error(error);
        closeModal();
        navigate('/blog/admin');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate, closeModal]);

  const handleSubmit = async (data: PostData) => {
    logger.info('Update post', data);

    const response = await fetch(`${API_BASE_URL}/api/blog/update/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error fetching post');
    }

    toast.success('Post updated successfully!');
    closeModal();
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
