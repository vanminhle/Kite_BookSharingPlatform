import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Form, FormText, FormGroup, Input, Label } from 'reactstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from '../utils/yupGlobal';
import { useDispatch, useSelector } from 'react-redux';
import { emailChange, hideErrorEmail } from '../features/user/userSlice';

const UserEmail = () => {
  const { isLoading, isErrorEmail, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email Address is Required')
      .email('Email Address is Invalid')
      .max(40, 'Email Address must have less than 30 characters'),
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user.email,
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    dispatch(hideErrorEmail());
    dispatch(emailChange({ email: values.email }));
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.opacity = 0.5;
    } else {
      document.body.style.opacity = 1;
    }
  }, [isLoading]);

  return (
    <>
      <h4>Change Account Email</h4>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="Email">Email</Label>
          <Controller
            id="Email"
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                {...field}
                disabled={!edit}
                invalid={(edit && isErrorEmail) || errors?.email?.message}
              />
            )}
          />
          {errors?.email?.message && (
            <div className="validation-popup">{errors.email.message}</div>
          )}
        </FormGroup>
        <FormText style={{ fontSize: '0.9rem' }}>
          You will be logged out after change new email. You need to verify your
          new email before login to Kite
        </FormText>

        <div className="button-group">
          <div className="button-edit">
            <Button
              color={edit ? 'secondary' : 'primary'}
              onClick={() => {
                setEdit(!edit);
                hideErrorEmail();
                reset({ email: user.email });
              }}
            >
              {edit ? 'Cancel' : 'Change Email'}
            </Button>
          </div>
          {edit && (
            <div className="button-submit">
              <Button type="submit" disabled={isLoading} color="primary">
                Save Change
              </Button>
            </div>
          )}
        </div>
      </Form>
    </>
  );
};

export default UserEmail;
