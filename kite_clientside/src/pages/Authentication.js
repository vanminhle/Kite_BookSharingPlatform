import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/AuthenticationPage';
import sentImage from '../assets/images/emailSent.svg';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  registerUser,
  closeModal,
} from '../features/user/userSlice';

const initialState = {
  fullName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  isMember: true,
};

const Authentication = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, emailSendingModal } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      document.body.style.opacity = 0.5;
    } else {
      document.body.style.opacity = 1;
    }
  }, [isLoading]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, password, passwordConfirm, isMember } = values;

    if (
      !email ||
      !password ||
      (!isMember && !fullName) ||
      (!isMember && !passwordConfirm)
    ) {
      toast.error('Please fill out all fields');
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ fullName, email, password, passwordConfirm }));
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className="full-page">
      <Modal isOpen={emailSendingModal} toggle={() => dispatch(closeModal())}>
        <ModalHeader>Please Verify Your Email Address</ModalHeader>
        <ModalBody>
          <div style={{ textAlign: 'center' }}>
            <img
              style={{ width: '70%', margin: '2rem 0' }}
              src={sentImage}
              alt="email sent"
            />
          </div>
          <div>
            Thanks For Register! Please click on the button that has just been
            sent to your email account to verify your email before continuing to
            using Kite!
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => dispatch(closeModal())}>
            Understood
          </Button>
        </ModalFooter>
      </Modal>

      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>

        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="fullName"
            value={values.fullName}
            handleChange={handleChange}
            labelText="Full Name"
          />
        )}
        {/* email field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        {/* confirm password field */}
        {!values.isMember && (
          <FormRow
            type="password"
            name="passwordConfirm"
            value={values.passwordConfirm}
            handleChange={handleChange}
            labelText="Confirm Password"
          />
        )}

        <Button type="submit" className="btn btn-block" disabled={isLoading}>
          {values.isMember ? 'Login' : 'Register'}
        </Button>

        <div className="member-section">
          <p>
            <button type="button" onClick={toggleMember} className="member-btn">
              {values.isMember ? 'Register' : 'Already Have An Account !'}
            </button>
            <button type="button" className="member-btn">
              {values.isMember ? <Link to="/needHelp">Need Help?</Link> : ''}
            </button>
          </p>
        </div>
      </form>
    </Wrapper>
  );
};

export default Authentication;
