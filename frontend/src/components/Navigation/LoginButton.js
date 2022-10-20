import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormModal';

export  const LoginButton = () => {
    const dispatch = useDispatch()
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

    let menuVisibility
    showMenu === true ? menuVisibility = 'menu-visible' : menuVisibility = 'menu-not-visible'

    return (
        <>
            <div className='dropdownwrapper'>
                <div className='profilebuttonwrapper'>
                    <button onClick={openMenu} className='profilebutton'>
                        <i className="fa-solid fa-bars"></i>
                        <i className="fa-sharp fa-solid fa-circle-user"></i>
                    </button>
                </div>

                <div id='login-dropdown' className={menuVisibility}>
                    <div className='sessionlinks'>
                            <div className="profile-login">
                            <LoginFormModal />
                            </div>
                            <div className='profile-break'></div>
                            <div>
                            <SignUpFormModal />
                            </div>

                    </div>

                </div>

            </div>
        </>
    )
}
