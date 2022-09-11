import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Logo } from '../../components';
import Wrapper from '../../assets/wrappers/AuthenticationPage';
import sentImage from '../../assets/images/emailSent.svg';
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
import {
  forgotPassword,
  verificationEmail,
  closeModal,
} from '../../features/help/helpSlice';

const Helper = () => {
  let location = useLocation();
  let state = location.state.setIsForgotPassword;
  const [isForgotPassword] = useState(state);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email Address is Required')
      .email('Email Address is Invalid')
      .max(40, 'Email Address must have less than 40 characters'),
  });

  const {
    reset,
    control,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { isLoading, emailSendingModal } = useSelector((store) => store.help);
  const dispatch = useDispatch();

  const onSubmit = (value) => {
    const { email } = value;

    if (isForgotPassword) {
      dispatch(forgotPassword({ email }));
      return;
    }
    dispatch(verificationEmail({ email }));
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.opacity = 0.5;
    } else {
      document.body.style.opacity = 1;
    }

    if (formState.isSubmitSuccessful) {
      reset({
        email: '',
      });
    }
  }, [isLoading]);

  return (
    <Wrapper className="full-page">
      <Modal isOpen={emailSendingModal} toggle={() => dispatch(closeModal())}>
        <ModalHeader
          style={{ alignSelf: 'center', borderBottom: '0', marginTop: '1rem' }}
        >
          An Email Have Been Sent
        </ModalHeader>
        <ModalBody
          style={{
            textAlign: 'center',
          }}
        >
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
            Submitted Successfully! Please did all the step that has just been
            sent to your email account, to
            {isForgotPassword
              ? ' reset your password '
              : ' verify your account '}
            and you are good to go!
            <div style={{ margin: '5px 0' }}>
              {isForgotPassword
                ? ''
                : 'You will not get any email if your account have been verified!'}
            </div>
            <div style={{ margin: '1rem 0' }}>
              If you still have problem, please sending email to service@kite.io
            </div>
          </div>
        </ModalBody>
        <ModalFooter
          style={{
            alignSelf: 'center',
            borderTop: '0',
            marginBottom: '1rem',
          }}
        >
          <Button color="primary" onClick={() => dispatch(closeModal())}>
            Understood
          </Button>
        </ModalFooter>
      </Modal>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Logo />
        <h3>{isForgotPassword ? 'Reset Password' : 'Resend Verification'}</h3>
        <Alert className="help-quote">
          {isForgotPassword
            ? 'Enter your email address to reset your account password'
            : 'Enter your email address to verify your account'}
        </Alert>

        <div className="form-row">
          <label htmlFor="email">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input type="email" className="form-input" {...field} />
            )}
          />
        </div>
        {errors?.email?.message && (
          <div className="validation-popup">{errors.email.message}</div>
        )}

        <Button
          color="primary"
          type="submit"
          className="btn btn-block"
          disabled={isLoading}
        >
          Submit
        </Button>

        <div className="member-section">
          <p>
            <Link to="/need-help">Another Problem?</Link>
          </p>
        </div>
      </form>
    </Wrapper>
  );
};

export default Helper;
