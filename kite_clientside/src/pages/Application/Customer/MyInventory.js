import { InventoryBooksContainer } from '../../../components';
import { useSelector } from 'react-redux';

const MyInventory = () => {
  const { userInventory, totalBooks } = useSelector((store) => store.book);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '-3rem',
        }}
      >
        <h4 className="page-title"> MY INVENTORY</h4>
        <h5 style={{ fontWeight: '500' }}>
          {totalBooks} book{userInventory?.length > 1 && 's'} found
        </h5>
      </div>
      <InventoryBooksContainer />
    </>
  );
};

export default MyInventory;
