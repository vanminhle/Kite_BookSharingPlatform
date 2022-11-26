import {
  QueryTransactionsContainer,
  TableTransactionsContainer,
} from '../../../components';
import { useSelector } from 'react-redux';

const TransactionsManagement = () => {
  const { transactions, totalTransactions } = useSelector(
    (store) => store.transactions
  );

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h4 className="page-title">Transactions Management</h4>
        <h5 style={{ fontWeight: '500' }}>
          {totalTransactions} Transaction{transactions?.length > 1 && 's'} found
        </h5>
      </div>
      <QueryTransactionsContainer />
      <TableTransactionsContainer />
    </>
  );
};

export default TransactionsManagement;
