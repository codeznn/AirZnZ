// frontend/src/components/Navigation/ProfileButton.js
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../../store/session'

export const ProfileButton = ({ user }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    let [showMenu, setShowMenu] = useState(false)

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

    const logoutUser = e => {
        e.preventDefault()
        dispatch(logout())
    }

    return (
        <>
            <div className='dropdownwrapper'>
                    <div className='this-on-top'>

                    </div>
                <div className='profilebuttonwrapper'>

                    <button onClick={openMenu} className='profilebutton'>
                        <div className='fa'>
                            <i id='bars' className="fa-solid fa-bars"></i>
                            <i className="fa-sharp fa-solid fa-circle-user"></i>
                        </div>
                    </button>
                </div>
                {showMenu && (

                    <div id='profile-dropdown' className='profile dropdown'>
                        <div className='profile-info-wrapper'>
                            <div className='profile-info' key='username'>
                                {user.username.length < 20  ? user.username : user.username.slice(0,19)+"..."}
                                </div>
                            <div className='profile-info' key='email'>
                                {user.email.length < 20 ? user.email : user.email.slice(0,19)+"..."}
                            </div>
                        </div>
                        <div className='navigation-break'></div>
                        <div className='login-menu-wrapper'>
                            <div className='login-inner-div' key='myspots' onClick={() => history.push('/my-spots')}>
                                My Spots
                            </div>
                        </div>
                        <div className='login-menu-wrapper'>

                            <div className='login-inner-div' key='myreviews' onClick={() => history.push('/my-reviews')}>My Reviews
                            </div>
                        </div>
                        <div>
                            <div className='login-menu-wrapper'>
                                <div className='login-inner-div' onClick={logoutUser}> Log Out</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
