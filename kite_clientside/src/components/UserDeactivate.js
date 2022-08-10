import { useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeModal,
  openDeactivateModal,
  deactivateAccount,
} from '../features/user/userSlice';

const UserDeactivate = () => {
  const { deactivateAccountModal, isError } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  return (
    <>
      <h4>Deactivate Your Account</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente unde,
        non fuga ad, ipsam earum quas molestiae hic dignissimos reiciendis
      </p>
      <Button color="danger" onClick={() => dispatch(openDeactivateModal())}>
        Deactivate Account
      </Button>
      <Modal
        isOpen={deactivateAccountModal}
        toggle={() => dispatch(closeModal())}
      >
        <ModalHeader className="modal-header">
          Are you sure you want to deactivate your account?
        </ModalHeader>
        <ModalBody className="modal-body">
          When deactivated, your account can not be used to login to Kite
          anymore. To reactivate your account, please sent an email to
          support@kite.io
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button color="danger" onClick={() => dispatch(deactivateAccount())}>
            Deactivate
          </Button>
          <Button onClick={() => dispatch(closeModal())}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default UserDeactivate;
