// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import Logo from './airznzlogo.png';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    else setShowMenu(true);
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  let menuShown
  showMenu === true ? menuShown = 'visible' : menuShown = 'not-visible'

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div className='dropdown-outer-container'>
          <button onClick={openMenu} className='profile-button'>
            <i className="fa-solid fa-bars"></i>
            <i className="fa-solid fa-circle-user"></i>
          </button>

          <div>
            <div id='profile-dropdown' className={menuShown}>
              <div className='profile-btm-wrap'>
                <div className="profile-btm-div">
                  <LoginFormModal />
                </div>
                <div className="profile-btm-div">
                  <SignupFormModal />
                </div>
              </div>
            </div>
          </div>

        </div>
      </>
    );
  }

  return (
    <ul className='navi-ul'>
      <li className='navi-li'>
        <div className='navi-logo'>
          <NavLink exact to="/" className='link-home'>
            <img src={Logo} className='logo' alt='airznz' />
          </NavLink>
        </div>
        {/* <div className='navi-space'>
          <div className='navi-newSpot'>
            <NavLink exact to="/new-spot" style={{ 'textDecoration': 'none'}} >Become a Host</NavLink>
          </div>
        </div> */}
        <div className='navi-right'>
          {isLoaded && sessionLinks}
        </div>

      </li>
    </ul>
  );
}

export default Navigation;
