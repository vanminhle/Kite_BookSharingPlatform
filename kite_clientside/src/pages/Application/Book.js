import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/Book';
import { Loading, BookNotFound, ReviewsContainer } from '../../components';
import {
  viewBookDetail,
  buyBook,
  getBookTransactionOfUser,
} from '../../features/book/bookSlice';
import { useNavigate } from 'react-router-dom';
import { Button, Badge, ListGroup, ListGroupItem } from 'reactstrap';

const Book = () => {
  let { bookId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { book, isLoading, bookTransactionOfUser } = useSelector(
    (store) => store.book
  );
  const { isReviewLoading } = useSelector((store) => store.reviews);
  const { user } = useSelector((store) => store.user);

  // console.log(book);

  useEffect(() => {
    dispatch(viewBookDetail({ bookId }));
    dispatch(getBookTransactionOfUser({ bookId }));
  }, [isReviewLoading]);

  if (isLoading || isReviewLoading) {
    return <Loading center />;
  }

  if (book === 'failed') {
    return <BookNotFound />;
  }

  return (
    <Wrapper>
      <div className="book-score">{book?.ratingsAverage}</div>
      <div className="book-info">
        <img
          className="book-cover"
          src={book?.bookCover}
          alt={book?.bookTitle}
        />
        <div className="book-info-text">
          <h4>{book?.bookTitle}</h4>
          <h6>{book?.author.fullName}</h6>
          <div className="badge-tag">
            {book?.tags.map((tag, index) => (
              <Badge color="primary" pill key={index}>
                {tag.name}
              </Badge>
            ))}
          </div>
          <p className="book-summary">{book?.summary}</p>
          <p className="book-price">{book?.price} $</p>
        </div>
      </div>
      <div className="button-container">
        {user.role === 'admin' ||
        user.role === 'manager' ||
        user._id === book?.author._id ||
        bookTransactionOfUser ? (
          <Button
            color="primary"
            onClick={() => navigate(`/book/reading/${book?.id}`)}
          >
            Reading Book
          </Button>
        ) : (
          <Button color="primary" onClick={() => dispatch(buyBook(book._id))}>
            Buy Book
          </Button>
        )}
      </div>
      <ListGroup className="book-description">
        <ListGroupItem>{book?.description}</ListGroupItem>
      </ListGroup>
      <hr />
      <ReviewsContainer reviews={book?.reviews} />
    </Wrapper>
  );
};

export default Book;
