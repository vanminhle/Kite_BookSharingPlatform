import Wrapper from '../assets/wrappers/BooksList';
import { Button } from 'reactstrap';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { IoPricetagsOutline } from 'react-icons/io5';
import { BiTime } from 'react-icons/bi';
import { BsChatSquareText } from 'react-icons/bs';

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
  const dispatch = useDispatch();

  const date = moment(createdAt).format('l LT');

  return (
    <Wrapper>
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
            <Button color="primary" onClick={() => dispatch()}>
              Detail
            </Button>
            <Button color="success" onClick={() => dispatch()}>
              Edit
            </Button>
            <Button color="danger" onClick={() => dispatch()}>
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
