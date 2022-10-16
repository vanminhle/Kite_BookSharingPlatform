import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, ModalHeader, ModalFooter, Table } from 'reactstrap';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Loading } from '../../components';
import Wrapper from '../../assets/wrappers/TableAccountContainer';
import PageBtnContainer from './../PageBtnContainer';
import noProfilePicture from '../../assets/images/noProfilePicture.svg';
import {
  getTransactions,
  openDeleteModal,
  closeDeleteModal,
  changeTransactionsPage,
  deleteTransaction,
} from '../../features/transactions/transactionsSlice';
import moment from 'moment';

const TableTransactionsContainer = () => {
  const {
    isLoading,
    search,
    transactions,
    searchOptions,
    sort,
    numOfPages,
    isDelete,
    page,
    deleteModal,
    transactionId,
  } = useSelector((store) => store.transactions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());

    if (isDelete) {
      document.body.style.opacity = 0.5;
    } else {
      document.body.style.opacity = 1;
    }
  }, [search, page, sort, searchOptions, isDelete]);

  if (isLoading) {
    return <Loading center />;
  }

  if (transactions.length === 0) {
    return (
      <div className="table-container">
        <h5 style={{ marginBottom: '0', fontWeight: '500' }}>
          No Transactions to Display...
        </h5>
      </div>
    );
  }

  return (
    <Wrapper>
      <Modal
        isOpen={deleteModal}
        toggle={() => dispatch(closeDeleteModal())}
        style={{ top: '7rem' }}
      >
        <ModalHeader className="modal-header">
          Delete This Transaction?
        </ModalHeader>
        <ModalFooter className="modal-footer">
          <Button
            color="danger"
            onClick={() => dispatch(deleteTransaction(transactionId))}
          >
            Delete
          </Button>

          <Button
            color="secondary"
            onClick={() => dispatch(closeDeleteModal())}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <div style={{ marginBottom: '3rem' }}>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Perform At.</th>
              <th>Performer</th>
              <th>Book</th>
              <th>Price</th>
              <th style={{ textAlign: 'center' }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction._id}>
                  <td>
                    <p className="mb-0">
                      {moment(transaction.createdAt).format('LLL')}
                    </p>
                  </td>
                  <td>
                    <div className="account-info">
                      <img
                        className="profile-circle"
                        src={
                          transaction.user.photo
                            ? transaction.user.photo
                            : noProfilePicture
                        }
                        alt={transaction.user.fullName}
                      />
                      <div className="profile-data">
                        <p className="fw-bold mb-0">
                          {transaction.user.fullName}
                        </p>
                        <p className="text-muted mb-0">
                          {transaction.user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="fw-normal mb-0">
                        {transaction.book.bookTitle}
                      </p>
                      <p className="text-muted mb-0">
                        {transaction.book.author.fullName} -{' '}
                        {transaction.book.author.email}
                      </p>
                    </div>
                  </td>
                  <td>
                    <p className="mb-0">{transaction.price} $</p>
                  </td>
                  <td>
                    <div className="actions-div">
                      <RiDeleteBin6Line
                        title="Delete Transaction"
                        onClick={() =>
                          dispatch(openDeleteModal(transaction._id))
                        }
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {numOfPages > 1 && (
        <PageBtnContainer props={[numOfPages, page, changeTransactionsPage]} />
      )}
    </Wrapper>
  );
};

export default TableTransactionsContainer;
