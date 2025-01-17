import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import Button from '../../component/Button';
import { useAppSelector } from '../../context/useContextTypes';
import { Link } from 'react-router-dom';

function Posts() {
  // useEffect to fetchPosts
  const { currentUser } = useAppSelector((state) => state.user);

  return (
    // Map thorugh Posts!
    <>
      <h2 className="blog__main-title">Latest Posts</h2>{' '}
      {/* Title Will be passed when loading posts or search term or * */}
      <section className="blog__main-posts">
        <Link to="" className="blog__main-post">
          <div className="blog__main-post-heading">
            <h2>Post</h2> <span>Jun, 23</span>
          </div>
          <p className="blog__main-post-description">
            Lorem ipsum, dolopellat natus enim, illum obcaecati voluptatibus iste. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Quibusdam animi id perferendis, magni blanditiis
            quos.
          </p>
          {currentUser && (
            <div className="blog__main-post-actions">
              <Button variant="icon">
                <HiOutlineTrash color="var(--color-red-700)" />
              </Button>
              <Button variant="icon">
                <HiOutlinePencilSquare color="var(--color-green-700)" />
              </Button>
            </div>
          )}
        </Link>
        <Link to="" className="blog__main-post">
          <div className="blog__main-post-heading">
            <h2>Post</h2> <span>Jun, 23</span>
          </div>
          <p className="blog__main-post-description">
            Lorem ipsum, dolopellat natus enim, illum obcaecati voluptatibus iste. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Quibusdam animi id perferendis, magni blanditiis
            quos.
          </p>
          {currentUser && (
            <div className="blog__main-post-actions">
              <Button variant="icon">
                <HiOutlineTrash color="var(--color-red-700)" />
              </Button>
              <Button variant="icon">
                <HiOutlinePencilSquare color="var(--color-green-700)" />
              </Button>
            </div>
          )}
        </Link>
        <Link to="" className="blog__main-post">
          <div className="blog__main-post-heading">
            <h2>Post</h2> <span>Jun, 23</span>
          </div>
          <p className="blog__main-post-description">
            Lorem ipsum, dolopellat natus enim, illum obcaecati voluptatibus iste. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Quibusdam animi id perferendis, magni blanditiis
            quos.
          </p>
          {currentUser && (
            <div className="blog__main-post-actions">
              <Button variant="icon">
                <HiOutlineTrash color="var(--color-red-700)" />
              </Button>
              <Button variant="icon">
                <HiOutlinePencilSquare color="var(--color-green-700)" />
              </Button>
            </div>
          )}
        </Link>
      </section>
    </>
  );
}

export default Posts;
