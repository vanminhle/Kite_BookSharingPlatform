import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Logo } from '../components';
import { useForm, Controller } from 'react-hook-form';
import Wrapper from '../assets/wrappers/AuthenticationPage';
import sentImage from '../assets/images/emailSent.svg';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
} from 'reactstrap';
import { GoogleLogin } from '@react-oauth/google';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from '../utils/yupGlobal';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  registerUser,
  closeModal,
  handleGoogleLogin,
} from '../features/user/userSlice';
import { Buffer } from 'buffer';
import { addUserToLocalStorage } from '../utils/localStorage';
import { toast } from 'react-toastify';

const Authentication = () => {
  const { user, isLoading, emailSendingModal, isError } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useParams();
  if (data) {
    let base64ToString = Buffer.from(data, 'base64').toString();
    base64ToString = JSON.parse(base64ToString);
    addUserToLocalStorage(base64ToString);
  }
  useEffect(() => {}, [data]);

  const [isMember, setIsMember] = useState(true);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email Address is Required')
      .email('Email Address is Invalid')
      .max(40, 'Email Address must have less than 30 characters'),
    isMember: yup.boolean(),
    fullName: yup.string().when('isMember', {
      is: isMember === false,
      then: yup
        .string()
        .required('Full Name is Required')
        .fullName('Full Name is Invalid')
        .max(40, 'Full Name must have less than 40 characters')
        .min(4, 'Full Name is Invalid'),
    }),
    password: yup.string().when('isMember', {
      is: isMember === true,
      then: yup
        .string()
        .required('Password Is Required')
        .min(8, 'Password Is Invalid'),
      otherwise: yup
        .string()
        .required('Password Is Required')
        .min(8, 'Password should have more than 8 characters')
        .password('Must contains at least 1 uppercase and 1 number'),
    }),
    passwordConfirm: yup.string().when('isMember', {
      is: isMember === false,
      then: yup
        .string()
        .required('Password Confirm is Required')
        .oneOf(
          [yup.ref('password')],
          'Passwords Confirm do not match Password'
        ),
    }),
  });

  const {
    reset,
    control,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      isMember: isMember,
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    const { fullName, email, password, passwordConfirm } = values;
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ fullName, email, password, passwordConfirm }));
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.opacity = 0.5;
    } else {
      document.body.style.opacity = 1;
    }

    if (!isError) {
      if (formState.isSubmitSuccessful) {
        reset({
          fullName: '',
          email: '',
          password: '',
          passwordConfirm: '',
          isMember: isMember,
        });
      }
    }

    if (user) {
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 3000);
    }
  }, [isLoading, isError, isMember, user]);

  return (
    <Wrapper className="full-page">
      <Modal isOpen={emailSendingModal} toggle={() => dispatch(closeModal())}>
        <ModalHeader className="modal-header">
          Please Verify Your Email Address
        </ModalHeader>
        <ModalBody className="modal-body">
          <div>
            <img
              style={{ width: '70%', margin: '2rem 0' }}
              src={sentImage}
              alt="email sent"
            />
          </div>
          <div
            style={{
              paddingLeft: '1rem',
              paddingRight: '1rem',
            }}
          >
            One Last Step! Please click on the button that has just been sent to
            your email account to verify your email before continuing to using
            Kite!
          </div>
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button color="primary" onClick={() => dispatch(closeModal())}>
            Understood
          </Button>
        </ModalFooter>
      </Modal>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Logo />
        <h3>{isMember ? 'Login' : 'Register'}</h3>

        {/* name field */}
        {!isMember && (
          <div className="form-row">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  className="form-input"
                  {...field}
                  invalid={errors?.fullName?.message === true}
                />
              )}
            />
          </div>
        )}
        {!isMember && errors?.fullName?.message && (
          <div className="validation-popup">{errors.fullName.message}</div>
        )}

        {/* email field */}
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                className="form-input"
                {...field}
                invalid={errors?.email?.message === true}
              />
            )}
          />
        </div>
        {errors?.email?.message && (
          <div className="validation-popup">{errors.email.message}</div>
        )}

        {/* password field */}
        <div className="form-row">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                type="password"
                className="form-input"
                {...field}
                invalid={errors?.password?.message === true}
              />
            )}
          />
        </div>
        {errors?.password?.message && (
          <div className="validation-popup">{errors.password.message}</div>
        )}

        {/* confirm password field */}
        {!isMember && (
          <div className="form-row">
            <label htmlFor="passwordConfirm" className="form-label">
              Confirm Password
            </label>
            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  className="form-input"
                  {...field}
                  invalid={errors?.passwordConfirm?.message === true}
                />
              )}
            />
          </div>
        )}
        {!isMember && errors?.passwordConfirm?.message && (
          <div className="validation-popup">
            {errors.passwordConfirm.message}
          </div>
        )}

        <Button
          color="primary"
          type="submit"
          className="btn btn-block"
          disabled={isLoading}
        >
          {isMember ? 'Login' : 'Register'}
        </Button>

        {isMember && (
          <div className="social-login">
            <div className="divider">
              <p className="text-divider">OR</p>
            </div>
            <GoogleLogin
              theme="filled_blue"
              width="320"
              onSuccess={(credentialResponse) => {
                dispatch(handleGoogleLogin(credentialResponse));
              }}
              onError={() => {
                toast.error(
                  'Problem when trying to login with Google. Please try again!'
                );
              }}
            />
          </div>
        )}

        <div className="member-section">
          <p>
            <button
              type="button"
              onClick={() => setIsMember(!isMember)}
              className="member-btn"
            >
              {isMember ? 'Register' : 'Already Have An Account !'}
            </button>
            <button type="button" className="member-btn">
              {isMember ? <Link to="/need-help">Need Help?</Link> : ''}
            </button>
          </p>
        </div>
      </form>
    </Wrapper>
  );
};

export default Authentication;
