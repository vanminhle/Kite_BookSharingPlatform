import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';
import Wrapper from '../../assets/wrappers/SubmitBookForm';
import {
  openCreateForm,
  closeCreateForm,
  createTag,
  closeTagModal,
  updateTag,
} from '../../features/tags/tagsSlice';
import yup from '../../utils/yupGlobal';
import Loading from '../Loading';

const CreateTagForm = () => {
  const {
    isForm,
    isCreate,
    isLoading,
    tagModal,
    isUpdate,
    tag,
    isGetTag,
    tagId,
  } = useSelector((store) => store.tags);
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Tag Name is Required')
      .max(30, 'Tag Name must have less than 30 characters')
      .min(2, 'Tag Name is too short'),
    description: yup
      .string()
      .required('Description is Required')
      .max(80, 'Description must have less than 80 characters')
      .min(2, 'Description is too short'),
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: 'format',
      group: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    if (tag) {
      dispatch(updateTag({ tagId, values }));
    } else {
      dispatch(createTag(values));
    }
  };

  const close = () => {
    if (tag) {
      dispatch(closeTagModal());
    } else {
      dispatch(closeCreateForm());
    }
  };

  useEffect(() => {
    if (isCreate || isUpdate) {
      document.body.style.opacity = 0.5;
    } else {
      document.body.style.opacity = 1;
    }

    if (!isForm) {
      reset({
        name: '',
        description: '',
        group: 'format',
      });
    }

    if (tag) {
      reset({
        name: tag?.name || '',
        description: tag?.description || '',
        group: tag?.group || 'format',
      });
    }
  }, [isCreate, isForm, isUpdate, tag]);

  return (
    <Wrapper>
      <div
        className="br-icon"
        onClick={() => dispatch(openCreateForm())}
        title="Create a Tag"
      >
        <Modal
          isOpen={isForm || tagModal}
          toggle={() => dispatch(closeCreateForm())}
          style={{ top: '3rem' }}
        >
          {isGetTag ? (
            <Loading center />
          ) : (
            <>
              <ModalHeader className="modal-header">
                {(tag && 'Edit Tag') || (isForm && 'Create Tag')}
              </ModalHeader>
              <ModalBody>
                <Form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{ paddingRight: '1rem', paddingLeft: '1rem' }}
                >
                  <FormGroup>
                    <Label for="name">Tag Name</Label>
                    <Controller
                      id="name"
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="text"
                          {...field}
                          placeholder="Input Tag Name"
                          invalid={errors?.name?.message && true}
                        />
                      )}
                    />
                    {errors?.name?.message && (
                      <div
                        style={{
                          marginBottom: '0rem',
                          marginTop: '0.6rem',
                          fontSize: '0.9rem',
                          color: 'red',
                        }}
                      >
                        {errors.name.message}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label for="group">Group</Label>
                    <Controller
                      id="group"
                      name="group"
                      control={control}
                      render={({ field }) => (
                        <Input type="select" {...field}>
                          <option value="format">Format</option>
                          <option value="genre">Genre</option>
                          <option value="theme">Theme</option>
                        </Input>
                      )}
                    ></Controller>
                  </FormGroup>

                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Controller
                      id="description"
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="textarea"
                          {...field}
                          placeholder="Some Tag Description"
                          invalid={errors?.description?.message && true}
                        />
                      )}
                    />
                    {errors?.description?.message && (
                      <div
                        style={{
                          marginBottom: '0rem',
                          marginTop: '0.6rem',
                          fontSize: '0.9rem',
                          color: 'red',
                        }}
                      >
                        {errors.description.message}
                      </div>
                    )}
                  </FormGroup>
                  <div
                    style={{
                      marginTop: '2.5rem',
                      marginBottom: '1rem',
                      display: 'flex',
                      gap: '0.5em',
                      justifyContent: 'center',
                    }}
                  >
                    <Button color="primary" type="submit" disabled={isLoading}>
                      {(tag && 'Edit') || (isForm && 'Create')}
                    </Button>
                    <Button color="secondary" onClick={close}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </>
          )}
        </Modal>
      </div>
    </Wrapper>
  );
};

export default CreateTagForm;
