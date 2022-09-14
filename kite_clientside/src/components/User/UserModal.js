import { useSelector, useDispatch } from 'react-redux';
import noProfilePicture from '../../assets/images/noProfilePicture.svg';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Badge,
} from 'reactstrap';
import { BsGenderMale, BsGenderFemale } from 'react-icons/bs';
import { BiCake, BiHomeAlt, BiPhone } from 'react-icons/bi';
import { TbUserCheck, TbUserX } from 'react-icons/tb';
import { IoEarthOutline } from 'react-icons/io5';
import { MdOutlineWorkOutline, MdSupportAgent } from 'react-icons/md';
import { AiOutlineCar, AiOutlineUser } from 'react-icons/ai';
import { Loading } from '../../components';
import {
  clearAccount,
  getUserAccount,
  setAccountRole,
} from '../../features/allAccounts/allAccountsSlice';
import moment from 'moment';
import { FaUserLock, FaUserTag } from 'react-icons/fa';
import { useEffect } from 'react';

const UserModal = () => {
  const { ModalLoading, account, accountModal } = useSelector(
    (store) => store.allAccounts
  );
  const dispatch = useDispatch();

  const handleRoleChange = (accountId, role) => {
    if (role === 'manager') {
      role = 'customer';
    } else {
      role = 'manager';
    }

    dispatch(setAccountRole({ accountId, role }));
  };

  return (
    <Modal
      className="user-modal"
      isOpen={accountModal}
      toggle={() => dispatch(clearAccount())}
    >
      {ModalLoading ? (
        <Loading center />
      ) : (
        <>
          <div>
            <img
              src={account?.photo ? account.photo : noProfilePicture}
              alt="user profile"
              className="user-modal-profile"
            />
          </div>
          <div className="user-modal-content">
            <ModalHeader>{account?.fullName}</ModalHeader>
            <ModalBody>
              <p style={{ marginBottom: '2rem', marginTop: '0.1rem' }}>
                {account?.email}
              </p>
              <p>
                <BiPhone />
                {account?.phoneNumber || 'Unknown'}
              </p>
              <p>
                {account?.gender === 'male' ? (
                  <BsGenderMale />
                ) : (
                  <BsGenderFemale />
                )}
                Gender:
                <Badge color={account?.gender === 'male' ? 'dark' : 'info'}>
                  {account?.gender === 'male' ? 'Male' : 'Female'}
                </Badge>
              </p>
              <p>
                <BiCake /> DoB:{'  '}
                {moment(account?.dateOfBirth).format('LL')}
              </p>
              <p>
                <BiHomeAlt /> Address:{'  '}
                {account?.address || 'Unknown'}
              </p>
              <p>
                <AiOutlineCar /> City:{'  '}
                {account?.city || 'Unknown'}
              </p>{' '}
              <p>
                <IoEarthOutline /> Country:{'  '}
                {account?.country || 'Unknown'}
              </p>
              <p>
                <MdOutlineWorkOutline /> Specialization:{'  '}
                {account?.specialization || 'Unknown'}
              </p>
              <div
                style={{
                  marginTop: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                {account?.isConfirmed ? (
                  <TbUserCheck
                    title="Account Verified"
                    className="user-modal-icon"
                    style={{ backgroundColor: '#d7ffd9' }}
                  />
                ) : (
                  <TbUserX
                    title="Account Unverified"
                    className="user-modal-icon"
                    style={{ backgroundColor: '#e2f1f8' }}
                  />
                )}
                {account?.active ? (
                  <FaUserTag
                    title="Account Active"
                    className="user-modal-icon"
                    style={{ backgroundColor: '#c3fdff' }}
                  />
                ) : (
                  <FaUserLock
                    title="Account Disabled"
                    className="user-modal-icon"
                    style={{ backgroundColor: '#ef9a9a' }}
                  />
                )}
                {account?.role === 'customer' ? (
                  <AiOutlineUser title="Customer" className="user-modal-icon" />
                ) : (
                  <MdSupportAgent title="Manager" className="user-modal-icon" />
                )}
              </div>
            </ModalBody>
            <ModalFooter style={{ display: 'flex' }}>
              <Button
                color={account?.role === 'customer' ? 'danger' : 'primary'}
                onClick={() => handleRoleChange(account?._id, account?.role)}
              >
                {account?.role === 'customer'
                  ? 'Set Manager Role'
                  : 'Set Customer Role'}
              </Button>
              <Button
                color="secondary"
                onClick={() => dispatch(clearAccount())}
              >
                Close
              </Button>
            </ModalFooter>
          </div>
        </>
      )}
    </Modal>
  );
};

export default UserModal;
