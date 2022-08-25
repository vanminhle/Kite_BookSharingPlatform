import { useEffect } from 'react';
import Wrapper from '../assets/wrappers/MyBookContainer';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from '.';
import BooksList from './BooksList';
import { getMyBooks } from '../features/myBooks/myBooksSlice';
import PageBtnContainer from './PageBtnContainer';
import { changeMyBooksPage } from '../features/myBooks/myBooksSlice';

const MyBooksContainer = () => {
  const {
    myBooks,
    isLoading,
    isSubmit,
    page,
    search,
    numOfPages,
    bookApprovingStatus,
    sort,
  } = useSelector((store) => store.myBooks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyBooks());
  }, [isSubmit, sort, search, bookApprovingStatus, page]);

  if (isLoading) {
    return <Loading center />;
  }

  if (myBooks.length === 0) {
    return (
      <div className="table-container">
        <h5 style={{ marginBottom: '0', fontWeight: '500', marginTop: '4rem' }}>
          You haven't submit any books yet...
        </h5>
      </div>
    );
  }

  return (
    <Wrapper>
      <div className="my-books-list">
        {myBooks.map((book) => {
          return <BooksList key={book._id} {...book} st />;
        })}
      </div>
      {numOfPages > 1 && (
        <PageBtnContainer props={[numOfPages, page, changeMyBooksPage]} />
      )}
    </Wrapper>
  );
};

export default MyBooksContainer;
