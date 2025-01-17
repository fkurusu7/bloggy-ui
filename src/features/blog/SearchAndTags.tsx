import { HiOutlineSearch } from 'react-icons/hi';
import { Link } from 'react-router-dom';

function SearchAndTags() {
  return (
    <aside className="blog__main-st">
      {/* <h2>Search</h2> */}
      <div className="blog__main-st-search">
        <input type="text" placeholder="Search for a post" />
        <HiOutlineSearch />
      </div>
      <div className="blog__main-st-tags">
        <Link to="" className="blog__main-st-tag">
          c
        </Link>
        <Link to="" className="blog__main-st-tag">
          javascript
        </Link>
        <Link to="" className="blog__main-st-tag">
          python
        </Link>
        <Link to="" className="blog__main-st-tag">
          react
        </Link>
        <Link to="" className="blog__main-st-tag">
          css
        </Link>
        <Link to="" className="blog__main-st-tag">
          html
        </Link>
        <Link to="" className="blog__main-st-tag">
          c#
        </Link>
        <Link to="" className="blog__main-st-tag">
          c++
        </Link>
        <Link to="" className="blog__main-st-tag">
          react-router-dom
        </Link>
        <Link to="" className="blog__main-st-tag">
          scss
        </Link>
      </div>
    </aside>
  );
}

export default SearchAndTags;
