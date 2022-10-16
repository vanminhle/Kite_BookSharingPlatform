import {
  SubmitBookForm,
  MyBooksContainer,
  QueryMyBooksContainer,
  EditBookForm,
} from '../../../components';
import { useSelector } from 'react-redux';

const MyBooks = () => {
  const { myBooks, totalMyBooks } = useSelector((store) => store.myBooks);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h4 className="page-title">MY BOOK LIST</h4>
        <h5 style={{ fontWeight: '500' }}>
          {totalMyBooks} book{myBooks.length > 1 && 's'} found
        </h5>
      </div>
      <QueryMyBooksContainer />
      <SubmitBookForm />
      <EditBookForm />
      <MyBooksContainer />
    </>
  );
};

export default MyBooks;
