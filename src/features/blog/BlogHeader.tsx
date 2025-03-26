import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { HiOutlineLogin, HiOutlineLogout, HiOutlineSearch } from 'react-icons/hi';
import { MdOutlineAdminPanelSettings, MdSelfImprovement } from 'react-icons/md';

import Button from '../../component/Button';
import LightOnDarkToggle from '../../component/LightOnDarkToggle';
import { useAppSelector } from '../../context/useContextTypes';
import { useAuth } from '../../hooks/useAuth';
import TooltipUtil from '../../utils/TooltipUtil';
import LogoSVG from '../../component/LogoSVG';

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
    <>
      <header className="blog__header">
        <div className="blog__header-logo">
          {/* <Link to={'/blog'}>¯\_(ツ)_/¯</Link> */}
          <Link to={'/blog'}>
            <LogoSVG />
          </Link>
        </div>

        <div className="blog__header-search">
          <input type="text" placeholder="Search for a post" onKeyDown={handleInputSearch} />
          <HiOutlineSearch />
        </div>

        <ul className="blog__header-menu">
          <li>
            <Button variant="linkicon" to="/me" tooltipmsg="ME page" tooltipplace="bottom">
              <MdSelfImprovement />
            </Button>
          </li>
          <li>
            <LightOnDarkToggle />
          </li>
          {currentUser ? (
            <>
              {/* ADMIN PANEL & SIGN OUT*/}
              <li>
                <Button
                  variant="linkicon"
                  to="/blog/admin"
                  tooltipmsg="Admin Panel"
                  tooltipplace="bottom"
                >
                  <MdOutlineAdminPanelSettings />
                </Button>
              </li>
              <li>
                <Button
                  type="button"
                  variant="icon"
                  onClick={handleSignout}
                  tooltipmsg="Sign out"
                  tooltipplace="bottom"
                >
                  <HiOutlineLogout />
                </Button>
              </li>
            </>
          ) : (
            <>
              {/* SIGN IN */}
              <li>
                <Button
                  variant="linkicon"
                  to="/signin"
                  onClick={handleSignout}
                  tooltipmsg="Sign in"
                  tooltipplace="bottom"
                >
                  <HiOutlineLogin />
                </Button>
              </li>
            </>
          )}
        </ul>
      </header>

      <TooltipUtil />
    </>
  );
}

export default BlogHeader;
