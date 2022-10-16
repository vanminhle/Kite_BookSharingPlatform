import { useEffect } from 'react';
import Wrapper from '../../assets/wrappers/MyBookContainer';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from '../../components';
import BooksList from './BrowseBooksList';
import { Button } from 'reactstrap';
import {
  changePage,
  getAllBooks,
} from '../../features/browseBooks/browseBooksSlice';
import PageBtnContainer from './../PageBtnContainer';

const BrowseBooksContainer = () => {
  const { allBooks, isLoading, numOfPages, page, search } = useSelector(
    (store) => store.browseBooks
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
  }, [search, page]);

  if (isLoading) {
    return <Loading center />;
  }

  if (allBooks?.length === 0) {
    return (
      <div className="table-container">
        <h5
          style={{
            marginBottom: '0',
            fontWeight: '500',
            marginTop: '16.5rem',
            textAlign: 'center',
            fontSize: '2rem',
          }}
        >
          NOTHING FOUND 😿
        </h5>
      </div>
    );
  }

  return (
    <Wrapper>
      <div className="my-books-list" style={{ marginTop: '-1rem' }}>
        {allBooks?.map((book) => {
          return <BooksList key={book._id} {...book} />;
        })}
      </div>
      {numOfPages > 1 && !search && (
        <PageBtnContainer props={[numOfPages, page, changePage]} />
      )}
    </Wrapper>
  );
};

export default BrowseBooksContainer;
