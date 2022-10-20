// frontend/src/components/Navigation/index.js
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { ProfileButton } from "./ProfileButton"
import { LoginButton } from "./LoginButton";
import logo from './airznzlogo.png'

import './Navigation.css'

const Navigation = () => {

    const currentUser = useSelector(state => state.session.user)

    let sessionLinks;
    if (currentUser) {
        sessionLinks = (
            <ProfileButton user={currentUser} />
        );
    } else {
        sessionLinks = (
            <>
                <LoginButton />
            </>
        );
    }

    return (

        <>

            <div className="navigation-container">
                <div className='navigtion-li'>
                    <div className="logo-div">
                        <NavLink style={{ 'textDecoration': 'none'}} exact to="/">
                            <img className='logo' alt='logo' src={logo} />
                        </NavLink>
                    </div>
                    <div className="nevigation-other-div">
                        <NavLink className="become-host" to={'/new-spot'} style={{ 'textDecoration': 'none'}}>Become a Host</NavLink>

                        <div className='navigation-button'>
                            {sessionLinks}
                        </div>
                    </div>
                </div>
            </div>
            <div className='navigation-break'>
            </div>

        </>
    );
}
export default Navigation;
