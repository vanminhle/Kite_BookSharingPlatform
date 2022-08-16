import { QueryAccountContainer, TableContainer } from '../../../components';
import { useSelector } from 'react-redux';

const AccountManagement = () => {
  const { accounts, totalAccounts } = useSelector((store) => store.allAccounts);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h4 className="page-title">Account Management</h4>
        <h5 style={{ fontWeight: '500' }}>
          {totalAccounts} account{accounts.length > 1 && 's'} found
        </h5>
      </div>
      <QueryAccountContainer />
      <TableContainer />
    </>
  );
};

export default AccountManagement;
