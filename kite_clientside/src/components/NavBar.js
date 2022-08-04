import Wrapper from '../assets/wrappers/Navbar';
import Logo from './Logo';
import noProfilePicture from '../assets/images/noProfilePicture.svg';
import { MdManageAccounts, MdLogout, MdTour } from 'react-icons/md';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/user/userSlice';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div className="nav-center">
        <div>
          <Logo />
          <h3 className="logo-text">Hi! {user.fullName}</h3>
        </div>
        <div className="btn-container">
          {/* <button type="button" className="btn"></button> */}

          <img
            src={user.photo ? user.photo : noProfilePicture}
            className="avatar-circle"
            alt="Avatar"
            onClick={() => setShowLogout(!showLogout)}
          />
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(logoutUser())}
            >
              <MdManageAccounts />
              My Account
            </button>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(logoutUser())}
            >
              <MdTour />
              <div>Terms</div>
            </button>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(logoutUser())}
            >
              <MdLogout />
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
