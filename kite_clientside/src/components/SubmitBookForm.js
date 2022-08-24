import noImagePlaceholder from '../assets/images/noImagePlaceholder.svg';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from '../components';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Form,
  Row,
  Col,
  FormGroup,
  Input,
  FormText,
} from 'reactstrap';
import Wrapper from '../assets/wrappers/SubmitBookForm';
import {
  openSubmitForm,
  closeSubmitForm,
  getTags,
  submitBook,
} from '../features/myBooks/myBooksSlice';
import yup from '../utils/yupGlobal';

const SubmitBookForm = () => {
  const { isForm, isLoading, loadingForm, tags } = useSelector(
    (store) => store.myBooks
  );
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(noImagePlaceholder);

  const SUPPORTED_PHOTO_FORMATS = [
    'image/jpg',
    'image/jpeg',
    'image/jfif',
    'image/png',
    'image/pjpeg',
    'image/pjp',
  ];

  const SUPPORTED_FILE_FORMATS = ['application/pdf'];

  const schema = yup.object().shape({
    bookName: yup
      .string()
      .required('Book Name is Required')
      .bookName('Book Name must not contain special characters')
      .max(80, 'Full Name must have less than 80 characters')
      .min(4, 'Book Name is Invalid'),
    bookFile: yup
      .mixed()
      .test('fileSize', 'Book Document size is too large', (value) => {
        return value ? value.size <= 50000000 : true;
      })
      .test(
        'fileFormat',
        'Book Document File is in Unsupported Format',
        (value) => (value ? SUPPORTED_FILE_FORMATS.includes(value.type) : true)
      ),
    bookCover: yup
      .mixed()
      .test('fileSize', 'Book Cover size is too large', (value) => {
        return value ? value.size <= 10000000 : true;
      })
      .test('fileFormat', 'Book Cover is in Unsupported Format', (value) =>
        value ? SUPPORTED_PHOTO_FORMATS.includes(value.type) : true
      ),
    price: yup
      .number()
      .typeError('Price is Invalid')
      .max(9999, 'Price should < 9999$')
      .min(1, 'Price must > 1$')
      .transform((_, val) => (val !== '' ? Number(val) : null)),
    summary: yup
      .string()
      .required('Summary is Required')
      .max(150, 'Summary must have less than 150 characters')
      .min(15, 'Summary must be at least 15 characters'),
    description: yup
      .string()
      .required('Description is Required')
      .max(1000, 'Description must have less than 1000 characters')
      .min(30, 'Description must be at least 30 characters'),
    format: yup
      .array()
      .min(1)
      .required('Book should specified at least one Format'),
    genre: yup
      .array()
      .min(1)
      .required('Book should specified at least one Genre'),
    theme: yup
      .array()
      .min(1)
      .required('Book should specified at least one Theme'),
  });

  const {
    reset,
    control,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm({
    defaultValues: {
      bookName: '',
      price: '',
      summary: '',
      description: '',
      format: [],
      genre: [],
      theme: [],
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const onSubmit = (values) => {
    const {
      bookCover,
      bookFile,
      bookName,
      description,
      format,
      genre,
      price,
      summary,
      theme,
    } = values;

    const tags = [];
    const formatTags = format.filter((format) => format);
    const genreTags = genre.filter((genre) => genre);
    const themeTags = theme.filter((theme) => theme);
    tags.push(...formatTags);
    tags.push(...genreTags);
    tags.push(...themeTags);

    const formData = new FormData();
    formData.append('bookName', bookName);
    formData.append('description', description);
    formData.append('summary', summary);
    formData.append('price', price);
    formData.append('bookCover', bookCover, bookCover.name);
    formData.append('bookFile', bookFile, bookFile.name);
    tags.map((tag) => formData.append('tags', tag));

    // console.log(formData.get('tag'));
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }

    dispatch(submitBook(formData));
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.opacity = 0.5;
    } else {
      document.body.style.opacity = 1;
    }

    if (!isForm) {
      reset({
        bookName: '',
        bookFile: '',
        bookCover: '',
        price: '',
        summary: '',
        description: '',
      });
      setPreview(noImagePlaceholder);
    }

    if (isForm && !isLoading) {
      dispatch(getTags());
    }
  }, [isLoading, isForm]);

  return (
    <Wrapper>
      <div
        className="br-icon"
        onClick={() => dispatch(openSubmitForm())}
        title="Submit a Book"
      ></div>
      <Modal
        style={{ transform: 'none' }}
        className="sidebar-modal"
        isOpen={isForm}
        fullscreen
        toggle={() => dispatch(closeSubmitForm())}
      >
        {loadingForm ? (
          <Loading center />
        ) : (
          <>
            <ModalHeader>SUBMIT A NEW BOOK</ModalHeader>
            <ModalBody>
              <p>
                ( You can submit a new book to sharing with everyone, you need
                specify all information also provide the cover image and book
                document file. New book after submitted need to be review before
                approved before publication )
              </p>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={9}>
                    <FormGroup>
                      <Label for="bookName">Book Name</Label>
                      <Controller
                        id="bookName"
                        name="bookName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="text"
                            {...field}
                            placeholder="Book Name"
                            invalid={errors?.bookName?.message && true}
                          />
                        )}
                      />
                      {errors?.bookName?.message && (
                        <div className="validation-popup">
                          {errors.bookName.message}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="price">Price</Label>
                      <Controller
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="text"
                            {...field}
                            placeholder="$"
                            invalid={errors?.price?.message && true}
                          />
                        )}
                      />
                      {errors?.price?.message && (
                        <div className="validation-popup">
                          {errors.price.message}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <FormGroup>
                    <Label for="summary">Summary</Label>
                    <Controller
                      id="summary"
                      name="summary"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="textarea"
                          rows="3"
                          placeholder="Short summary about your book content..."
                          invalid={errors?.summary?.message && true}
                        />
                      )}
                    />
                    {errors?.summary?.message && (
                      <div className="validation-popup">
                        {errors.summary.message}
                      </div>
                    )}
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Controller
                      id="description"
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="textarea"
                          rows="7"
                          {...field}
                          placeholder="Long description about your book content..."
                          invalid={errors?.description?.message && true}
                        />
                      )}
                    />
                    {errors?.description?.message && (
                      <div className="validation-popup">
                        {errors.description.message}
                      </div>
                    )}
                  </FormGroup>
                </Row>

                {/* https://codesandbox.io/s/react-hook-form-set-custom-value-for-checkbox-nifl2?file=/src/index.js */}
                <div style={{ marginTop: '0.6rem' }}>
                  <div className="checkbox-input">
                    <Label>Format</Label>
                    {tags
                      .filter((tag) => tag.group === 'format')
                      .map((tag, index) => (
                        <FormGroup key={index} check>
                          <Label check>{tag.name}</Label>
                          <Controller
                            name="format"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                onChange={(e) => {
                                  setValue(
                                    `format[${index}]`,
                                    e.target.checked && tag._id
                                  );
                                }}
                                type="checkbox"
                              />
                            )}
                          />
                        </FormGroup>
                      ))}
                    {errors?.format?.message && (
                      <div className="validation-popup">
                        {errors.format.message}
                      </div>
                    )}
                  </div>
                  <div className="checkbox-input">
                    <Label>Genre</Label>
                    {tags
                      .filter((tag) => tag.group === 'genre')
                      .map((tag, index) => (
                        <FormGroup key={index} check>
                          <Label check>{tag.name}</Label>
                          <Controller
                            name="genre"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                onChange={(e) => {
                                  setValue(
                                    `genre[${index}]`,
                                    e.target.checked && tag._id
                                  );
                                }}
                                type="checkbox"
                              />
                            )}
                          />
                        </FormGroup>
                      ))}
                    {errors?.genre?.message && (
                      <div className="validation-popup">
                        {errors.genre.message}
                      </div>
                    )}
                  </div>
                  <div className="checkbox-input">
                    <Label>Theme</Label>
                    {tags
                      .filter((tag) => tag.group === 'theme')
                      .map((tag, index) => (
                        <FormGroup key={index} check>
                          <Label check>{tag.name}</Label>
                          <Controller
                            name="theme"
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                onChange={(e) => {
                                  setValue(
                                    `theme[${index}]`,
                                    e.target.checked && tag._id
                                  );
                                }}
                                type="checkbox"
                              />
                            )}
                          />
                        </FormGroup>
                      ))}
                    {errors?.theme?.message && (
                      <div className="validation-popup">
                        {errors.theme.message}
                      </div>
                    )}
                  </div>
                </div>

                <Row style={{ marginTop: '1.5rem' }}>
                  <Col sm={5}>
                    <img
                      src={
                        (errors?.bookCover?.message && noImagePlaceholder) ||
                        preview
                      }
                      className="book-cover"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'cover',
                        border: '0.1px solid var(--grey-100)',
                      }}
                      alt="avatar"
                    />
                  </Col>
                  <Col sm={7}>
                    <div style={{ marginBottom: '3rem', marginTop: '2rem' }}>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <Label for="Photo">Book Cover</Label>
                        <Controller
                          id="bookCover"
                          name="bookCover"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="file"
                              {...field}
                              value={field.value.filename}
                              onChange={(e) => {
                                field.onChange(e.target.files[0]);
                                handleImageChange(e.target.files[0]);
                              }}
                              accept="image/png, image/jpg, image/jpeg"
                              required
                            />
                          )}
                        />
                      </div>
                      {errors?.bookCover?.message && (
                        <div className="validation-popup">
                          {errors.bookCover.message}
                        </div>
                      )}
                      <FormText style={{ fontSize: '0.9rem' }}>
                        (Book Cover should be submit as .jpg, .jpeg or .png
                        file)
                      </FormText>
                    </div>

                    <div>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <Label for="bookFile">Book Document</Label>
                        <Controller
                          id="bookFile"
                          name="bookFile"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="file"
                              {...field}
                              value={field.value.filename}
                              onChange={(e) => {
                                field.onChange(e.target.files[0]);
                              }}
                              accept="application/pdf"
                              required
                            />
                          )}
                        />
                      </div>
                      {errors?.bookFile?.message && (
                        <div className="validation-popup">
                          {errors.bookFile.message}
                        </div>
                      )}
                      <FormText style={{ fontSize: '0.9rem' }}>
                        (Book Document File should be submit as .pdf file)
                      </FormText>
                    </div>
                  </Col>
                </Row>
                <ModalFooter>
                  <Button type="submit" disabled={isLoading} color="primary">
                    Submit Book
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => dispatch(closeSubmitForm())}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            </ModalBody>
          </>
        )}
      </Modal>
    </Wrapper>
  );
};

export default SubmitBookForm;
