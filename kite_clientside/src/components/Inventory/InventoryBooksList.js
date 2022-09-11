import Wrapper from '../../assets/wrappers/BooksList';
import moment from 'moment';
import { IoPricetagsOutline } from 'react-icons/io5';
import { BiTime } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const BooksList = (book) => {
  console.log(book);
  const navigate = useNavigate();

  const date = moment(book.createdAt).format('l LT');

  return (
    <Wrapper
      onClick={() => navigate(`/book/${book.book._id}`)}
      style={{ cursor: 'pointer' }}
      title={`${book.book.bookTitle} : ${book.book.author.fullName}`}
    >
      <img
        src={book.book.bookCover}
        className="book-cover"
        alt={book.book.bookTitle}
      />
      <div className="book-details">
        <header>
          <div className="info">
            <h5>{book.book.bookTitle}</h5>
          </div>
        </header>
        <div
          className="content"
          style={{ bottom: '1rem', paddingRight: '1.5rem' }}
        >
          <div className="content-bottom">
            {book.book.summary.length > 30
              ? book.book.summary.substring(0, 150) + '...'
              : book.book.summary}
          </div>
          <div className="content-center">
            <div>
              <IoPricetagsOutline /> Price: {book.price}$
            </div>
            <div>
              <BiTime /> Buy At: {date}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default BooksList;
