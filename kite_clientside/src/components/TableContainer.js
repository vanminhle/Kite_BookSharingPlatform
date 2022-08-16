import { useEffect } from 'react';
import Wrapper from '../assets/wrappers/TableContainer';
import noProfilePicture from '../assets/images/noProfilePicture.svg';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';
import { FaInfoCircle, FaUnlock, FaLock } from 'react-icons/fa';
import { BiSortDown, BiSortUp } from 'react-icons/bi';
import { Loading } from '../components';
import {
  getAllAccounts,
  getUserAccount,
  handleSort,
  setAccountStatus,
  openModal,
  closeModal,
} from '../features/allAccounts/allAccountsSlice';
import moment from 'moment';
import PageBtnContainer from './PageBtnContainer';
import UserModal from './UserModal';

const TableContainer = () => {
  const {
    accounts,
    isLoading,
    page,
    search,
    searchValue,
    confirmedStatus,
    accountStatus,
    role,
    numOfPages,
    sort,
    setAccountStatusState,
    setAccountStatusModal,
    setAccountStatusId,
    setAccountStatusValue,
  } = useSelector((store) => store.allAccounts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAccounts());
  }, [
    search,
    searchValue,
    page,
    confirmedStatus,
    accountStatus,
    role,
    sort,
    setAccountStatusState,
  ]);

  if (isLoading) {
    return <Loading center />;
  }

  if (accounts.length === 0) {
    return (
      <div className="table-container">
        <h5 style={{ marginBottom: '0', fontWeight: '500' }}>
          No Accounts to Display...
        </h5>
      </div>
    );
  }

  const handleChangeSort = (type) => {
    if (type === 'fullName') {
      sort !== 'fullName'
        ? dispatch(handleSort({ value: 'fullName' }))
        : dispatch(handleSort({ value: '-fullName' }));
    }
    if (type === 'city') {
      sort !== 'city'
        ? dispatch(handleSort({ value: 'city' }))
        : dispatch(handleSort({ value: '-city' }));
    }
    if (type === 'createdAt') {
      sort !== '-createdAt'
        ? dispatch(handleSort({ value: '-createdAt' }))
        : dispatch(handleSort({ value: 'createdAt' }));
    }
  };

  return (
    <Wrapper>
      <Modal
        isOpen={setAccountStatusModal}
        toggle={() => dispatch(closeModal())}
        style={{ top: '7rem' }}
      >
        <ModalHeader className="modal-header">Are You Sure ?</ModalHeader>
        <ModalFooter className="modal-footer">
          <Button
            color={!setAccountStatusValue ? 'danger' : 'success'}
            onClick={() =>
              dispatch(
                setAccountStatus({
                  userId: setAccountStatusId,
                  active: setAccountStatusValue,
                })
              )
            }
          >
            {!setAccountStatusValue ? 'Disabled' : 'Reactivate'}
          </Button>
          <Button color="secondary" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <div className="table-container">
        <Table bordered hover>
          <thead>
            <tr>
              <th onClick={() => handleChangeSort('fullName')}>
                Account {sort === 'fullName' && <BiSortDown />}
                {sort === '-fullName' && <BiSortUp />}
              </th>
              <th onClick={() => handleChangeSort('city')}>
                Account {sort === 'city' && <BiSortDown />}
                {sort === '-city' && <BiSortUp />}
              </th>
              <th onClick={() => handleChangeSort('createdAt')}>
                Created At {sort === 'createdAt' && <BiSortUp />}
                {sort === '-createdAt' && <BiSortDown />}
              </th>
              <th>Status</th>
              <th>Role</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => {
              return (
                <tr key={account._id}>
                  <td>
                    <div className="account-info">
                      <img
                        className="profile-circle"
                        src={account.photo ? account.photo : noProfilePicture}
                        alt={account.fullName}
                      />
                      <div className="profile-data">
                        <p className="fw-bold mb-0">{account.fullName}</p>
                        <p className="text-muted mb-0">{account.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="fw-normal mb-0">
                        {account.phoneNumber ? account.phoneNumber : 'No Phone'}
                      </p>
                      <p className="text-muted mb-0">
                        {account.city ? account.city : 'No City'}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p
                        className="fw-normal mb-0"
                        style={{ textTransform: 'capitalize' }}
                      >
                        <Badge
                          color={account.isConfirmed ? 'primary' : 'warning'}
                        >
                          {account.isConfirmed ? 'Confirmed' : 'Not Confirmed'}
                        </Badge>
                      </p>
                      <p className="text-muted mb-0">
                        {moment(account.createdAt).format('LLL')}
                      </p>
                    </div>
                  </td>
                  <td>
                    <Badge color={account.active ? 'success' : 'secondary'}>
                      {account.active ? 'Active' : 'Disabled'}
                    </Badge>
                  </td>
                  <td
                    style={{ textTransform: 'capitalize', fontWeight: '500' }}
                  >
                    {account.role}
                  </td>
                  <td>
                    <div className="actions-div">
                      <FaInfoCircle
                        title="More Info"
                        style={{ color: 'var(--primary-800)' }}
                        onClick={() => dispatch(getUserAccount(account._id))}
                      />
                      {account.active ? (
                        <FaLock
                          title="Disabled Account"
                          style={{ color: 'var(--red-dark)' }}
                          onClick={() =>
                            dispatch(
                              openModal({ id: account._id, value: false })
                            )
                          }
                        />
                      ) : (
                        <FaUnlock
                          title="Reactivate Account"
                          style={{
                            color: 'var(--green-dark)',
                          }}
                          onClick={() =>
                            dispatch(
                              openModal({ id: account._id, value: true })
                            )
                          }
                        />
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
      <UserModal />
    </Wrapper>
  );
};

export default TableContainer;
