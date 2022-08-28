import { useEffect } from 'react';
import Wrapper from '../../assets/wrappers/TableBookContainer';
import noBookImage from '../../assets/images/noImagePlaceholder.svg';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  Input,
} from 'reactstrap';
import { FaInfoCircle } from 'react-icons/fa';
import { ImContrast } from 'react-icons/im';
import { Loading } from '../../components';
import moment from 'moment';
import PageBtnContainer from './../PageBtnContainer';
import UserModal from '../User/UserModal';
import {
  changePage,
  getManageBooks,
  openModal,
  closeModal,
  changeValue,
  setBookApprovingStatus,
} from '../../features/manageBooks/manageBooksSlice';

const TableManageBooksContainer = () => {
  const {
    manageBooks,
    isLoading,
    page,
    search,
    searchValue,
    bookApprovingStatus,
    numOfPages,
    sort,
    setBookApprovingStatusModal,
    setBookApprovingStatusId,
    setBookApprovingStatusState,
    approvingValue,
    approvingReason,
  } = useSelector((store) => store.manageBooks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getManageBooks());
  }, [
    search,
    searchValue,
    page,
    bookApprovingStatus,
    sort,
    setBookApprovingStatusState,
  ]);

  if (isLoading) {
    return <Loading center />;
  }

  if (manageBooks.length === 0) {
    return (
      <div className="table-container">
        <h5 style={{ marginBottom: '0', fontWeight: '500' }}>
          No Books to Display...
        </h5>
      </div>
    );
  }

  const handlerApprovingValue = (e) => {
    const { name, value } = e.target;
    dispatch(changeValue({ name, value }));
  };

  const handlerApprovingReason = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(changeValue({ name, value }));
  };

  return (
    <Wrapper>
      <Modal
        isOpen={setBookApprovingStatusModal}
        toggle={() => dispatch(closeModal())}
        style={{ top: '7rem' }}
      >
        <ModalHeader className="modal-header">You Want To?</ModalHeader>
        <div>
          <Input
            className="mb-3"
            type="select"
            name="approvingValue"
            style={{ width: '21rem', marginLeft: '5rem', marginTop: '1rem' }}
            onChange={handlerApprovingValue}
          >
            <option>Approved</option>
            <option>Rejected</option>
          </Input>
          <Input
            style={{ width: '21rem', marginLeft: '5rem', marginTop: '1rem' }}
            className="mb-3"
            name="approvingReason"
            placeholder="Reason"
            onChange={handlerApprovingReason}
          />
        </div>
        <ModalFooter className="modal-footer">
          <Button
            color="primary"
            onClick={() =>
              dispatch(
                setBookApprovingStatus({
                  bookId: setBookApprovingStatusId,
                  value: {
                    status: approvingValue.toLowerCase(),
                    reason: approvingReason.toLowerCase(),
                  },
                })
              )
            }
          >
            Finish
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
              <th>Book</th>
              <th>Author / Submit date</th>
              <th>Ratings Avg.</th>
              <th>Rating Qty.</th>
              <th>Price</th>
              <th>Approving</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {manageBooks.map((book) => {
              return (
                <tr key={book._id}>
                  <td>
                    <div
                      className="book-info"
                      title={`${book.bookTitle}: ${book.summary}`}
                    >
                      <img
                        className="book-image"
                        src={book.bookCover ? book.bookCover : noBookImage}
                        alt={book.bookTitle}
                      />
                      <div className="book-data">
                        <p className="fw-bold mb-1">{book.bookTitle}</p>
                        <p className="text-muted mb-0">
                          {book.approvingReason
                            ? book.approvingReason
                            : 'No Reason Specified..'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="fw-normal mb-0">{book.author.fullName}</p>
                      <p className="text-muted mb-1">{book.author.email}</p>
                      <p className="fw-normal mb-0">
                        {moment(book.createdAt).format('LLL')}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="fw-normal mb-0">
                        {book.ratingAverage ? book.ratingAverage : 0} Point
                        {book.ratingAverage > 0 && 's'}
                      </p>
                      <Badge color="danger">Bad</Badge>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="fw-normal mb-0">
                        {book.ratingQuantity ? book.ratingQuantity : 0} Account
                        {book.ratingQuantity > 0 && 's'}
                      </p>
                      <Badge color="primary">High</Badge>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="fw-normal mb-0">{book.price} $</p>
                      <p className="text-muted mb-0">0 Sales</p>
                    </div>
                  </td>
                  <td>
                    <Badge
                      color={
                        (book.approvingStatus === 'pending' && 'warning') ||
                        (book.approvingStatus === 'approved' && 'success') ||
                        (book.approvingStatus === 'rejected' && 'secondary')
                      }
                    >
                      {(book.approvingStatus === 'pending' && 'Pending') ||
                        (book.approvingStatus === 'approved' && 'Approved') ||
                        (book.approvingStatus === 'rejected' && 'Rejected')}
                    </Badge>
                  </td>
                  <td>
                    <div className="actions-div">
                      <FaInfoCircle
                        title="View Book"
                        style={{ color: 'var(--primary-800)' }}
                        onClick={() => dispatch()}
                      />
                      <ImContrast
                        title="Set Status"
                        style={{
                          color: 'var(--green-dark)',
                        }}
                        onClick={() => dispatch(openModal({ id: book._id }))}
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
        <PageBtnContainer props={[numOfPages, page, changePage]} />
      )}
      <UserModal />
    </Wrapper>
  );
};

export default TableManageBooksContainer;
