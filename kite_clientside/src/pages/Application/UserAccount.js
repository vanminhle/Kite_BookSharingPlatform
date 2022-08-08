import Wrapper from '../../assets/wrappers/UserAccountPage';
import {
  UserInformation,
  UserDeactivate,
  UserPassword,
  UserEmail,
} from '../../components';

const UserAccount = () => {
  return (
    <Wrapper>
      <div className="user-information">
        <UserInformation />
      </div>
      <hr />
      <div className="user-password">
        <UserPassword />
      </div>
      <hr />
      <div className="user-email">
        <UserEmail />
      </div>
      <hr />
      <div className="user-deactivate">
        <UserDeactivate />
      </div>
    </Wrapper>
  );
};

export default UserAccount;
