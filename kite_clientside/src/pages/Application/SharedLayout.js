import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components';
import Wrapper from '../../assets/wrappers/SharedLayout';
import { UncontrolledAlert } from 'reactstrap';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

const SharedLayout = (props) => {
  const { user } = useSelector((store) => store.user);

  return (
    <Wrapper>
      <main className="home">
        <Sidebar />

        <div>
          {user.role !== 'admin' &&
            (!user.gender ||
              !user.phoneNumber ||
              !user.address ||
              !user.country ||
              !user.city ||
              !user.zipCode ||
              !user.specialization) && (
              <UncontrolledAlert className="banner-alert" color="warning">
                Hi! For better customer support, Please provide some information
                in the{' '}
                <Link to="/my-account" className="alert-link">
                  Account Information
                </Link>{' '}
                section
              </UncontrolledAlert>
            )}
          <div className="home-page">
            {props.allowed.includes(user.role) ? (
              <Outlet />
            ) : (
              <Navigate to="/404" />
            )}
            {/* {user.role === props.allowed[0] ||
            user.role === props.allowed[1] ? (
              <Outlet />
            ) : (
              <Navigate to="/404" />
            )} */}
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
