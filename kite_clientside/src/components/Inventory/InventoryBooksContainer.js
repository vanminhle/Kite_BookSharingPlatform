import { useEffect } from 'react';
import Wrapper from '../../assets/wrappers/MyBookContainer';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from '../../components';
import BooksList from './InventoryBooksList';
import { getUserTransactionsInventory } from '../../features/book/bookSlice';
import PageBtnContainer from './../PageBtnContainer';
import { changePage } from '../../features/book/bookSlice';

const InventoryBookContainer = () => {
  const { userInventory, isLoading, numOfPages, page } = useSelector(
    (store) => store.book
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserTransactionsInventory());
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (userInventory?.length === 0) {
    return (
      <div className="table-container">
        <h5 style={{ marginBottom: '0', fontWeight: '500', marginTop: '4rem' }}>
          You haven't buy any books yet...
        </h5>
      </div>
    );
  }

  return (
    <Wrapper>
      <div className="my-books-list">
        {userInventory?.map((book) => {
          return <BooksList key={book?.book._id} {...book} />;
        })}
      </div>
      {numOfPages > 1 && (
        <PageBtnContainer props={[numOfPages, page, changePage]} />
      )}
    </Wrapper>
  );
};

export default InventoryBookContainer;
