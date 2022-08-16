import Wrapper from '../../assets/wrappers/UserAccountPage';
import {
  UserInformation,
  UserDeactivate,
  UserPassword,
  UserEmail,
} from '../../components';
import { useSelector } from 'react-redux';

const UserAccount = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <Wrapper>
      {user.role !== 'admin' && (
        <>
          <div className="user-information">
            <UserInformation />
          </div>
          <hr />
          {!user.socialProvider && (
            <>
              <div className="user-password">
                <UserPassword />
              </div>
              <hr />
              <div className="user-email">
                <UserEmail />
              </div>
              <hr />
            </>
          )}
          <div className="user-deactivate">
            <UserDeactivate />
          </div>
        </>
      )}
      {user.role === 'admin' && (
        <div className="user-password" style={{ marginTop: '5.7rem' }}>
          <UserPassword />
        </div>
      )}
    </Wrapper>
  );
};

export default UserAccount;
