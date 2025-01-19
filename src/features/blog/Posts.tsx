import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import Button from '../../component/Button';
import { useAppSelector } from '../../context/useContextTypes';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Posts() {
  // useEffect to fetchPosts
  const { currentUser } = useAppSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [error, setError] = useState(null);

  const { searchTerm, tagName } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoadingPosts(true);
        setError(null);
        let urlString = '/api/blog/getPosts';
        if (searchTerm) {
          urlString = `?searchTerm=${searchTerm}`;
        } else if (tagName) {
          urlString = `?tag=${tagName}`;
        }
        const response = await fetch(urlString);

        if (!response.ok && response.status !== 404) {
          throw new Error('Error fetching posts');
        }

        const jsonRes = await response.json();
        console.log(jsonRes);
        setPosts(jsonRes.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  const getTitle = () => {
    if (searchTerm) return `Search by ${searchTerm}`;
    else if (tagName) return `Search by Tag: ${searchTerm}`;
    else return 'Latest Posts';
  };

  return (
    // Map thorugh Posts!
    <>
      <h2 className="blog__main-title">{getTitle()}</h2>{' '}
      {/* Title Will be passed when loading posts or search term or * */}
      {isLoadingPosts ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <section className="blog__main-posts">
          {posts.map((post: any) => {
            return (
              <Link
                to={`/blog/posts/${post.slug}`}
                className="blog__main-posts-post"
                key={post.slug}
              >
                <div className="blog__main-posts-post-heading">
                  <h2>{post.title}</h2> <span>Jun, 23</span>
                </div>
                <p className="blog__main-posts-post-description">{post.description}</p>
                {currentUser && (
                  <div className="blog__main-posts-post-actions">
                    <Button variant="icon">
                      <HiOutlineTrash color="var(--color-red-700)" />
                    </Button>
                    <Button variant="icon">
                      <HiOutlinePencilSquare color="var(--color-green-700)" />
                    </Button>
                  </div>
                )}
              </Link>
            );
          })}
        </section>
      )}
    </>
  );
}

export default Posts;
