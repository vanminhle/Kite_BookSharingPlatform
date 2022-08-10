import noProfilePicture from '../assets/images/noProfilePicture.svg';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Form, Row, Col, FormGroup, Input, Label } from 'reactstrap';
import moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from '../utils/yupGlobal';
import { useDispatch, useSelector } from 'react-redux';
import { informationChange } from '../features/user/userSlice';

const UserInformation = () => {
  const { isLoading, isEdit, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(isEdit);
  const [preview, setPreview] = useState(user?.photo || noProfilePicture);

  const SUPPORTED_PHOTO_FORMATS = [
    'image/jpg',
    'image/jpeg',
    'image/jfif',
    'image/png',
    'image/pjpeg',
    'image/pjp',
  ];

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Full Name is Required')
      .fullName('Full Name is Invalid')
      .max(40, 'Full Name must have less than 40 characters')
      .min(4, 'Full Name is Invalid'),
    phoneNumber: yup
      .string()
      .phoneNumber('Phone Number is Invalid')
      .max(10, 'Phone Number is Invalid')
      .test('min', 'Phone Number is Invalid', (value) =>
        value.trim().length > 0 ? value.length >= 10 : true
      ),
    dateOfBirth: yup
      .date()
      .test(
        'Is date greater',
        "DoB cannot be greater than today's",
        (value) => {
          if (!value) return true;
          return moment().diff(value) > 0;
        }
      ),
    address: yup
      .string()
      .max(40, 'Address is Invalid')
      .test('min', 'Address is Invalid', (value) =>
        value.trim().length > 0 ? value.length >= 3 : true
      ),
    country: yup
      .string()
      .max(40, 'Country is Invalid')
      .test('min', 'Country is Invalid', (value) =>
        value.trim().length > 0 ? value.length >= 3 : true
      ),
    city: yup.string().nullable().notRequired().max(40, 'City is Invalid'),
    zipCode: yup
      .number()
      .typeError('Invalid Zip Code')
      .max(99999, 'Invalid Zip Code')
      .min(10000, 'Invalid Zip Code')
      .nullable()
      .transform((_, val) => (val !== '' ? Number(val) : null)),
    specialization: yup
      .string()
      .test('min', 'Specialization is Invalid', (value) =>
        value.trim().length > 0 ? value.length >= 5 : true
      )
      .max(40, 'Specialization is Invalid'),
    photo: yup
      .mixed()
      .test('fileFormat', 'Unsupported Format', (value) =>
        value ? SUPPORTED_PHOTO_FORMATS.includes(value.type) : true
      ),
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user?.fullName || '',
      gender: user?.gender,
      phoneNumber: user?.phoneNumber || '',
      dateOfBirth: moment(user?.dateOfBirth).format('YYYY-MM-DD'),
      address: user?.address || '',
      city: user?.city || '',
      country: user?.country || '',
      zipCode: user?.zipCode || '',
      specialization: user?.specialization || '',
      photo: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const setReset = () => {
    reset({
      fullName: user?.fullName || '',
      gender: user?.gender,
      phoneNumber: user?.phoneNumber || '',
      dateOfBirth: moment(user?.dateOfBirth).format('YYYY-MM-DD'),
      address: user?.address || '',
      city: user?.city || '',
      country: user?.country || '',
      zipCode: user?.zipCode || '',
      specialization: user?.specialization || '',
      photo: '',
    });
    setPreview(user?.photo || noProfilePicture);
  };

  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const onSubmit = (values) => {
    const {
      address,
      city,
      country,
      dateOfBirth,
      fullName,
      gender,
      phoneNumber,
      specialization,
      zipCode,
      photo,
    } = values;
    const formData = new FormData();
    address && formData.append('address', address);
    city && formData.append('city', city);
    country && formData.append('country', country);
    dateOfBirth && formData.append('dateOfBirth', dateOfBirth);
    fullName && formData.append('fullName', fullName);
    gender && formData.append('gender', gender);
    phoneNumber && formData.append('phoneNumber', phoneNumber);
    specialization && formData.append('specialization', specialization);
    zipCode && formData.append('zipCode', zipCode);
    photo && formData.append('photo', photo, photo.name);
    //console.log(formData.get('address'));
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    dispatch(informationChange(formData));
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
      <h4>Account Information</h4>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={8}>
            <FormGroup>
              <Label for="fullName">Full Name</Label>
              <Controller
                id="fullName"
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    {...field}
                    disabled={!edit}
                    invalid={errors?.fullName?.message === true}
                  />
                )}
              />
              {errors?.fullName?.message && (
                <div className="validation-popup">
                  {errors.fullName.message}
                </div>
              )}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="genderSelect">Gender</Label>
              <Controller
                id="genderSelect"
                name="gender"
                control={control}
                render={({ field }) => (
                  <Input type="select" {...field} disabled={!edit}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Input>
                )}
              ></Controller>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <FormGroup>
              <Label for="Phone Number">Phone Number</Label>
              <Controller
                id="Phone Number"
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    type="tel"
                    {...field}
                    disabled={!edit}
                    placeholder="Phone Number"
                    invalid={errors?.phoneNumber?.message === true}
                  />
                )}
              />
              {errors?.phoneNumber?.message && (
                <div className="validation-popup">
                  {errors.phoneNumber.message}
                </div>
              )}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="Date of Birth">Date of Birth</Label>
              <Controller
                id="Date of Birth"
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <Input
                    type="date"
                    {...field}
                    disabled={!edit}
                    invalid={errors?.dateOfBirth?.message === true}
                  />
                )}
              />
              {errors?.dateOfBirth?.message && (
                <div className="validation-popup">
                  {errors.dateOfBirth.message}
                </div>
              )}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <FormGroup>
              <Label for="Address">Address</Label>
              <Controller
                id="Address"
                name="address"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    {...field}
                    disabled={!edit}
                    placeholder="Address"
                    invalid={errors?.address?.message === true}
                  />
                )}
              />
              {errors?.address?.message && (
                <div className="validation-popup">{errors.address.message}</div>
              )}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="Country">Country</Label>
              <Controller
                id="Country"
                name="country"
                type="text"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    {...field}
                    disabled={!edit}
                    placeholder="Country"
                    invalid={errors?.country?.message === true}
                  />
                )}
              />
              {errors?.country?.message && (
                <div className="validation-popup">{errors.country.message}</div>
              )}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <FormGroup>
              <Label for="City">City</Label>
              <Controller
                id="City"
                name="city"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    {...field}
                    disabled={!edit}
                    placeholder="City"
                    invalid={errors?.city?.message === true}
                  />
                )}
              />
              {errors?.city?.message && (
                <div className="validation-popup">{errors.city.message}</div>
              )}
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="Zip Code">Zip Code</Label>
              <Controller
                id="Zip Code"
                name="zipCode"
                type="number"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    {...field}
                    disabled={!edit}
                    placeholder="Zip Code"
                    invalid={errors?.zipCode?.message === true}
                  />
                )}
              />
              {errors?.zipCode?.message && (
                <div className="validation-popup">{errors.zipCode.message}</div>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="Specialization">Specialization</Label>
              <Controller
                id="Specialization"
                name="specialization"
                type="text"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    {...field}
                    disabled={!edit}
                    placeholder="Specialization"
                    invalid={errors?.specialization?.message === true}
                  />
                )}
              />
              {errors?.specialization?.message && (
                <div className="validation-popup">
                  {errors.specialization.message}
                </div>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row style={{ marginTop: '0.6rem' }}>
          <Col
            sm={2}
            style={{
              width: '11.666667%',
            }}
          >
            <img
              src={(errors?.photo?.message && noProfilePicture) || preview}
              className="avatar-circle"
              style={{
                width: '76px',
                height: '74px',
                borderRadius: '50%',
                border: '0.1px solid var(--grey-100)',
              }}
              alt="avatar"
            />
          </Col>
          <Col sm={6}>
            <Label for="Photo">Profile Photo</Label>
            <Controller
              id="Photo"
              name="photo"
              control={control}
              render={({ field }) => (
                <Input
                  type="file"
                  {...field}
                  disabled={!edit}
                  value={field.value.filename}
                  onChange={(e) => {
                    field.onChange(e.target.files[0]);
                    handleImageChange(e.target.files[0]);
                  }}
                  accept="image/png, image/jpg, image/jpeg"
                />
              )}
              disabled={!edit}
            />
            {errors?.photo?.message && (
              <div className="validation-popup">{errors.photo.message}</div>
            )}
          </Col>
        </Row>

        <div className="button-group">
          <div className="button-edit">
            <Button
              color={edit ? 'secondary' : 'primary'}
              onClick={() => {
                setEdit(!edit);
                setReset();
              }}
            >
              {edit ? 'Cancel' : 'Edit Information'}
            </Button>
          </div>
          {edit && (
            <div className="button-submit">
              <Button type="submit" disabled={isLoading} color="primary">
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </Form>
    </>
  );
};

export default UserInformation;
