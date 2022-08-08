import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components';
import Wrapper from '../../assets/wrappers/SharedLayout';
import { UncontrolledAlert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SharedLayout = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <Wrapper>
      {(!user.gender ||
        !user.phoneNumber ||
        !user.address ||
        !user.country ||
        !user.city ||
        !user.zipCode ||
        !user.specialization) && (
        <UncontrolledAlert className="banner-alert" color="warning">
          Hi! For better customer support, Please provide some information in
          the{' '}
          <Link to="/my-account" className="alert-link">
            Account Information
          </Link>{' '}
          section
        </UncontrolledAlert>
      )}
      <main className="home">
        <Sidebar />
        <div>
          <div className="home-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
