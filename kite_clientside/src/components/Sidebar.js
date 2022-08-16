import NavLinks from './NavLinks';
import Logo from './Logo';
import Wrapper from '../assets/wrappers/Sidebar';
import noProfilePicture from '../assets/images/noProfilePicture.svg';
import { MdManageAccounts, MdLogout, MdTour } from 'react-icons/md';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/user/userSlice';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div className="sidebar-container">
        <div className="content">
          <header>
            <Logo className="logo-sidebar" />
          </header>
          <NavLinks />
        </div>

        <div
          className="btn-container"
          onClick={() => setShowLogout(!showLogout)}
        >
          <img
            src={user.photo ? user.photo : noProfilePicture}
            className="avatar-circle"
            alt="avatar"
          />
          <h4 className="btn-container-text">
            {user.fullName.split(' ')[0] > 7
              ? user.fullName.split(' ')[0].substring(0, 5) + '...'
              : user.fullName.split(' ')[0]}
          </h4>

          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <Link to="/my-account">
              <button type="button" className="dropdown-btn">
                <MdManageAccounts />
                {user.role === 'admin' ? 'Password' : 'My Account'}
              </button>
            </Link>

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
export default Sidebar;
