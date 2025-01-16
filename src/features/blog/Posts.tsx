import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import Button from '../../component/Button';

function Posts() {
  // useEffect to fetchPosts

  return (
    // Map thorugh Posts!
    <section className="blog__main-posts">
      <div className="blog__main-post">
        <div className="blog__main-post-heading">
          <h2>Post</h2> <span>Date</span>
        </div>
        <p className="blog__main-post-description">
          Lorem ipsum, dolopellat natus enim, illum obcaecati voluptatibus iste. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quibusdam animi id perferendis, magni blanditiis
          quos.
        </p>
        <div className="blog__main-post-actions">
          <Button variant="icon">
            <HiOutlineTrash color="var(--color-red-700)" />
          </Button>
          <Button variant="icon">
            <HiOutlinePencilSquare color="var(--color-green-700)" />
          </Button>
        </div>
      </div>
      <div className="blog__main-post">
        <div className="blog__main-post-heading">
          <h2>Post</h2> <span>Date</span>
        </div>
        <p className="blog__main-post-description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, temporibus assumenda quam
          magni corporis harum vitae vel laudantium ex numquam omnis itaque mollitia nesciunt ut a
          recusandae sunt fugit ne. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
          quos quo praesentium temporibus. Laborum odit deserunt pariatur neque accusantium iure.
        </p>
      </div>
      <div className="blog__main-post">
        <div className="blog__main-post-heading">
          <h2>Post</h2> <span>Date</span>
        </div>
        <p className="blog__main-post-description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, temporibus assumenda quam
          magni corporis harum vitae vel laudantium ex numquam omnis itaque mollitia nesciunt ut a
          recusandae sunt fugit ne. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
          quos quo praesentium temporibus. Laborum odit deserunt pariatur neque accusantium iure.
        </p>
      </div>
      <div className="blog__main-post">
        <div className="blog__main-post-heading">
          <h2>Post</h2> <span>Date</span>
        </div>
        <p className="blog__main-post-description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, temporibus assumenda quam
          magni corporis harum vitae vel laudantium ex numquam omnis itaque mollitia nesciunt ut a
          recusandae sunt fugit ne. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
          quos quo praesentium temporibus. Laborum odit deserunt pariatur neque accusantium iure.
        </p>
      </div>
      <div className="blog__main-post">
        <div className="blog__main-post-heading">
          <h2>Post</h2> <span>Date</span>
        </div>
        <p className="blog__main-post-description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, temporibus assumenda quam
          magni corporis harum vitae vel laudantium ex numquam omnis itaque mollitia nesciunt ut a
          recusandae sunt fugit ne. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
          quos quo praesentium temporibus. Laborum odit deserunt pariatur neque accusantium iure.
        </p>
      </div>
    </section>
  );
}

export default Posts;
