import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineCog } from 'react-icons/hi2';
import { HiOutlineLogin, HiOutlineLogout, HiOutlineSearch } from 'react-icons/hi';

import Button from '../../component/Button';
import LightOnDarkToggle from '../../component/LightOnDarkToggle';
import { useAppSelector } from '../../context/useContextTypes';
import { useAuth } from '../../hooks/useAuth';

function BlogHeader() {
  const { handleSignout } = useAuth();
  const navigate = useNavigate();

  const { currentUser } = useAppSelector((state) => state.user);

  const handleInputSearch = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    // /blog/search/:searchTerm
    if (ev.currentTarget.value.trim().length && ev.key === 'Enter') {
      const searchTerm = ev.currentTarget.value;
      ev.currentTarget.value = '';
      navigate(`/blog/search/${searchTerm}`);
    }
  };

  return (
    <header className="blog__header">
      <div className="blog__header-logo">
        <Link to={'/'}>¯\_(ツ)_/¯</Link>
      </div>

      <div className="blog__header-search">
        <input type="text" placeholder="Search for a post" onKeyDown={handleInputSearch} />
        <HiOutlineSearch />
      </div>

      <ul className="blog__header-menu">
        <li>
          <LightOnDarkToggle />
        </li>
        {currentUser ? (
          <>
            <li>
              <Button variant="linkicon" to="/blog/admin">
                <HiOutlineCog />
              </Button>
            </li>
            <li>
              <Button type="button" variant="icon" onClick={handleSignout}>
                <HiOutlineLogout />
              </Button>
            </li>
          </>
        ) : (
          <li>
            <Button variant="linkicon" to="/signin" onClick={handleSignout}>
              <HiOutlineLogin />
            </Button>
          </li>
        )}
      </ul>
    </header>
  );
}

export default BlogHeader;
