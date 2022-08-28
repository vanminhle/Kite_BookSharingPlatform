import {
  QueryManageBooksContainer,
  TableManageBooksContainer,
} from '../../components';
import { useSelector } from 'react-redux';

const ManageBooks = () => {
  const { manageBooks, totalManageBooks } = useSelector(
    (store) => store.manageBooks
  );

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h4 className="page-title">Books Management</h4>
        <h5 style={{ fontWeight: '500' }}>
          {totalManageBooks} book{manageBooks.length > 1 && 's'} found
        </h5>
      </div>
      <QueryManageBooksContainer />
      <TableManageBooksContainer />
    </>
  );
};

export default ManageBooks;
