import { Link } from 'react-router-dom';
import { Button, Row, Card, CardTitle, CardText, Col } from 'reactstrap';
import { Logo } from '../components';
import forgotPassword from '../assets/images/forgotPassword.svg';
import forgotVerifyEmail from '../assets/images/forgotVerifyEmail.svg';
import Wrapper from '../assets/wrappers/NeedHelpPage';

const NeedHelp = () => {
  return (
    <Wrapper>
      <div className="logo-helper">
        <Logo />
      </div>

      <Row className="card-helper">
        <Col sm="4">
          <Card className="form-helper text-center card-padding-style" body>
            <div style={{ textAlign: 'center' }}>
              <img
                src={forgotPassword}
                alt="forgot password"
                style={{ width: '50%', margin: '2rem 0' }}
              />
            </div>
            <CardTitle tag="h5">Forgot Password</CardTitle>
            <CardText>
              You are not remember the password used to login Kite? Reset your
              password here!
            </CardText>
            <Link to={'/helper'} state={{ setIsForgotPassword: true }}>
              <Button color="primary">Reset Password</Button>
            </Link>
          </Card>
        </Col>
        <Col sm="4">
          <Card className="form-helper text-center card-padding-style" body>
            <div style={{ textAlign: 'center' }}>
              <img
                src={forgotVerifyEmail}
                alt="resending email"
                style={{ width: '50%', margin: '1.7rem 0' }}
              />
            </div>
            <CardTitle tag="h5">Resend Verification Email</CardTitle>
            <CardText>
              You didn't receive the account verification email? Resending new
              verification email here!
            </CardText>
            <Link to={'/helper'} state={{ setIsForgotPassword: false }}>
              <Button color="primary">Resend Verification</Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default NeedHelp;
