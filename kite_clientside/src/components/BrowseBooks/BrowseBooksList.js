import Wrapper from '../../assets/wrappers/BooksList';
import { IoPricetagsOutline } from 'react-icons/io5';
import { BiUser } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const BrowseBooksList = ({ ...book }) => {
  const navigate = useNavigate();

  return (
    <Wrapper
      onClick={() => navigate(`/book/${book._id}`)}
      style={{ cursor: 'pointer' }}
      title={`${book.bookTitle} : ${book.author.fullName}`}
    >
      <img src={book.bookCover} className="book-cover" alt={book.bookTitle} />
      <div className="book-details">
        <header>
          <div className="info">
            <h5>{book.bookTitle}</h5>
          </div>
        </header>
        <div
          className="content"
          style={{ bottom: '1rem', paddingRight: '1.5rem' }}
        >
          <div className="content-bottom">
            {book.summary.length > 30
              ? book.summary.substring(0, 150) + '...'
              : book.summary}
          </div>
          <div className="content-center">
            <div>
              <IoPricetagsOutline /> Price: {book.price}$
            </div>
            <div>
              <BiUser /> By: {book.author.fullName}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default BrowseBooksList;
