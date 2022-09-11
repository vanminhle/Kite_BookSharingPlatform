import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Form, FormGroup, Input, Label, FormText } from 'reactstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from '../../utils/yupGlobal';
import { useDispatch, useSelector } from 'react-redux';
import { passwordChange, hideError } from '../../features/user/userSlice';
import moment from 'moment';

const UserPassword = () => {
  const { isLoading, user, isError } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .required('Password Is Required')
      .min(8, 'Password should have more than 8 characters')
      .password('Must contains at least 1 uppercase and 1 number'),
    passwordConfirm: yup
      .string()
      .required('Password Confirm is Required')
      .oneOf(
        [yup.ref('newPassword')],
        'Passwords Confirm do not match Password'
      ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      passwordConfirm: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    dispatch(hideError());
    const { currentPassword, newPassword, passwordConfirm } = values;
    dispatch(passwordChange({ currentPassword, newPassword, passwordConfirm }));
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.opacity = 0.5;
    } else {
      document.body.style.opacity = 1;
    }
  }, [isLoading, isError]);

  return (
    <>
      <h4>Change Account Password</h4>
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="Current Password">Current Password</Label>
            <Controller
              id="Current Password"
              name="currentPassword"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  {...field}
                  placeholder="Current Password"
                  invalid={isError}
                />
              )}
            />
          </FormGroup>

          <FormGroup>
            <Label for="New Password">New Password</Label>
            <Controller
              id="New Password"
              name="newPassword"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  {...field}
                  placeholder="New Password"
                  invalid={errors?.newPassword?.message && true}
                />
              )}
            />
            {errors?.newPassword?.message && (
              <div className="validation-popup">
                {errors.newPassword.message}
              </div>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="Password Confirm">Password Confirm</Label>
            <Controller
              id="Password Confirm"
              name="passwordConfirm"
              placeholder="Password Confirm"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  {...field}
                  placeholder="Password Confirm"
                  invalid={errors?.passwordConfirm?.message && true}
                />
              )}
            />
            {errors?.passwordConfirm?.message && (
              <div className="validation-popup">
                {errors.passwordConfirm.message}
              </div>
            )}
          </FormGroup>
          <FormText
            style={{
              fontSize: '0.9rem',
              display: 'flex',
              marginTop: '1.5rem',
              justifyContent: 'space-between',
            }}
          >
            You will be logged out after change to new password.
            <div>
              Last Changed At :{' '}
              {user.passwordChangedAt
                ? moment(user.passwordChangedAt).format('LLL')
                : 'None'}
            </div>
          </FormText>

          <div className="button-submit">
            <Button type="submit" disabled={isLoading} color="primary">
              Change Password
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default UserPassword;
