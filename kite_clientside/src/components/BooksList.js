import Wrapper from '../assets/wrappers/BooksList';
import { Button, ModalFooter, ModalHeader, Modal } from 'reactstrap';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { IoPricetagsOutline } from 'react-icons/io5';
import { BiTime } from 'react-icons/bi';
import { BsChatSquareText } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {
  getBook,
  openDeleteModal,
  deleteBook,
  closeModal,
  closeDeleteModal,
} from '../features/manageBooks/manageBooksSlice';

const BooksList = ({
  approvingStatus,
  bookCover,
  bookTitle,
  createdAt,
  summary,
  _id,
  approvingReason,
  price,
}) => {
  const { setBookDeleteModal, setBookDeleteId } = useSelector(
    (store) => store.manageBooks
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const date = moment(createdAt).format('l LT');

  const handleModalOnClick = () => {
    if (setBookDeleteModal) dispatch(closeDeleteModal());
  };

  return (
    <Wrapper>
      <Modal
        isOpen={setBookDeleteModal}
        toggle={() => dispatch(closeModal())}
        style={{ top: '7rem' }}
      >
        <ModalHeader className="modal-header">You Want To?</ModalHeader>
        <ModalFooter className="modal-footer">
          <Button
            color="danger"
            onClick={() =>
              dispatch(
                deleteBook({
                  bookId: setBookDeleteId,
                })
              )
            }
          >
            Delete
          </Button>

          <Button color="secondary" onClick={handleModalOnClick}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <img src={bookCover} className="book-cover" alt={bookTitle} />
      <div className="book-details" title={`${bookTitle} : ${summary}`}>
        <header>
          <div className="info">
            <h5>{bookTitle}</h5>
          </div>
        </header>
        <div className="content">
          <div className="content-bottom">
            <BsChatSquareText />{' '}
            {approvingReason ? approvingReason : 'No Reason Specified..'}
          </div>
          <div className="content-center">
            <div>
              <IoPricetagsOutline /> Price: {price}$
            </div>
            <div>
              <BiTime /> Submit At: {date}
            </div>
          </div>
        </div>
        <footer>
          <div className="actions">
            <Button color="primary" onClick={() => navigate(`/book/${_id}`)}>
              Detail
            </Button>
            <Button
              color="success"
              onClick={() => dispatch(getBook({ id: _id }))}
            >
              Edit
            </Button>
            <Button
              color="danger"
              onClick={() => dispatch(openDeleteModal({ id: _id }))}
            >
              Delete
            </Button>
          </div>
          <div className={`status ${approvingStatus}`}>{approvingStatus}</div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default BooksList;
