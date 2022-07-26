import { useParams, Link, useLinkClickHandler } from 'react-router-dom';
import { useEffect } from 'react';
import { Logo } from '../../components';
import Wrapper from '../../assets/wrappers/AuthenticationPage';
import resetPasswordSuccessImage from '../../assets/images/resetPasswordSuccess.svg';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Alert,
  Input,
} from 'reactstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from '../../utils/yupGlobal';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../features/help/resetPasswordSlice';

const HelperActions = () => {
  const schema = yup.object().shape({
    password: yup
      .string()
      .required('Password Is Required')
      .min(8, 'Password should have more than 8 characters')
      .password('Must contains at least 1 uppercase and 1 number'),
    passwordConfirm: yup
      .string()
      .required('Password Confirm is Required')
      .oneOf([yup.ref('password')], 'Passwords Confirm do not match Password'),
  });

  const {
    reset,
    control,
    handleSubmit,
    formState,
    formState: { errors },
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { isLoading, passwordSuccessModal } = useSelector(
    (store) => store.resetPassword
  );
  const dispatch = useDispatch();
  const { token } = useParams();

  const onSubmit = (values) => {
    const { password, passwordConfirm } = values;
    dispatch(resetPassword({ password, passwordConfirm, token: token }));
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.opacity = 0.5;
    } else {
      document.body.style.opacity = 1;
    }

    if (formState.isSubmitSuccessful) {
      reset({
        password: '',
        passwordConfirm: '',
      });
    }
  }, [isLoading]);

  return (
    <Wrapper className="full-page">
      <Modal
        isOpen={passwordSuccessModal}
        toggle={useLinkClickHandler('/authentication')}
      >
        <ModalHeader
          style={{ alignSelf: 'center', borderBottom: '0', marginTop: '1rem' }}
        >
          Password Reset Successfully!
        </ModalHeader>
        <ModalBody
          style={{
            textAlign: 'center',
          }}
        >
          <div>
            <img
              style={{ width: '70%', margin: '2rem 0' }}
              src={resetPasswordSuccessImage}
              alt="email sent"
            />
          </div>
          <div
            style={{
              paddingLeft: '1rem',
              paddingRight: '1rem',
            }}
          >
            You have successfully reset your password! You can now use your new
            password to login to Kite
          </div>
        </ModalBody>
        <ModalFooter
          style={{
            alignSelf: 'center',
            borderTop: '0',
            marginBottom: '1rem',
          }}
        >
          <Link to="/authentication">
            <Button color="primary">Back To Login</Button>
          </Link>
        </ModalFooter>
      </Modal>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Logo />
        <h3>Reset Password</h3>
        <Alert className="help-quote">Please enter your new password</Alert>

        {/* password field */}
        <div className="form-row">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input type="password" className="form-input" {...field} />
            )}
          />
        </div>
        {errors?.password?.message && (
          <div className="validation-popup">{errors.password.message}</div>
        )}
        {/* confirm password field */}
        <div className="form-row">
          <label htmlFor="passwordConfirm" className="form-label">
            Confirm Password
          </label>
          <Controller
            name="passwordConfirm"
            control={control}
            render={({ field }) => (
              <Input type="password" className="form-input" {...field} />
            )}
          />
        </div>
        {errors?.passwordConfirm?.message && (
          <div className="validation-popup">
            {errors.passwordConfirm.message}
          </div>
        )}

        <Button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Wrapper>
  );
};

export default HelperActions;
