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
    </Wrapper>
  );
};

export default UserAccount;
