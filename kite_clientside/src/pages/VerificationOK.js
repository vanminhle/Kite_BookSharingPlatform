import { Link } from 'react-router-dom';
import emailOK from '../assets/images/emailOK.svg';
import Wrapper from '../assets/wrappers/ErrorPage';
import { Button } from 'reactstrap';

const VerificationOK = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={emailOK} alt="success" />
        <h3>Verification Successful</h3>
        <p>
          Congrats, We have successfully verified your email address. You can
          now login to Kite!
        </p>
        <Link to="/authentication">
          <Button color="primary">Back To Login</Button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default VerificationOK;
