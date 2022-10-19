// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    return history.push('/');
  };

  return (
    <>
      <div className="dropdown-container">
        <button onClick={openMenu} className='profile-button'>
          <i className="fa-solid fa-bars"></i>
          <i className="fa-sharp fa-solid fa-circle-user"></i>
        </button>
        <div>
          {showMenu && (
            <div className="'dropdown-outer-container">
              <div className="profile-username">{user.username}</div>
              <div className="profile-email">{user.email}</div>
              <div className='profile-blank'></div>
              <div className="profile-bottom">
                <div onClick={() => history.push('/new-spot')} className="profile-newspots">Host Your Spot</div>
                <div onClick={() => history.push('/my-spots')} className="profile-myspots">My Spots</div>
                <div onClick={() => history.push('/my-reviews')} className="profile-myreviews">My Reviews</div>
                <div className='profile-blank'></div>
                <div onClick={logout} className="profile-btm-logout">Log Out</div>
              </div>
            </div>
          )}
         </div>

      </div>
    </>
  );
}

export default ProfileButton;
