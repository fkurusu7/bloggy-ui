import { HiOutlineHandThumbUp, HiOutlineHandThumbDown } from 'react-icons/hi2';

function PostsTable() {
  return (
    <div className="blog-table" role="table">
      <div className="blog-table__header" role="row">
        <div></div>
        <div>Post</div>
        <div>Tags</div>
        <div>Date</div>
        <div>Draft</div>
        <div></div>
      </div>
      {/* TABLE BODY - MAP ==> Post Data */}
      <div className="blog-table__body-row">
        <img src="/grok.jpg" alt="grok" className="blog-table__body-row_img" />
        <div className="blog-table__body-row_post">Build a Blog with TS </div>
        <div className="blog-table__body-row_tags">css, js, go</div>
        <div className="blog-table__body-row_date">24/dic/24 15:49</div>
        <div className="blog-table__body-row_draft blog-table__body-row_draft-false">
          <HiOutlineHandThumbDown />
        </div>
      </div>
      <div className="blog-table__body-row">
        <img src="/grok.jpg" alt="grok" className="blog-table__body-row_img" />
        <div className="blog-table__body-row_post">Build a Blog with TS </div>
        <div className="blog-table__body-row_tags">css, js, go</div>
        <div className="blog-table__body-row_date">24/dic/24 15:49</div>
        <div className="blog-table__body-row_draft blog-table__body-row_draft-true">
          <HiOutlineHandThumbUp />
        </div>
      </div>
      <div className="blog-table__body-row">
        <img src="/grok.jpg" alt="grok" className="blog-table__body-row_img" />
        <div className="blog-table__body-row_post">Build a Blog with TS </div>
        <div className="blog-table__body-row_tags">css, js, go</div>
        <div className="blog-table__body-row_date">24/dic/24 15:49</div>
        <div className="blog-table__body-row_draft blog-table__body-row_draft-true">
          <HiOutlineHandThumbUp />
        </div>
      </div>
    </div>
  );
}

export default PostsTable;
