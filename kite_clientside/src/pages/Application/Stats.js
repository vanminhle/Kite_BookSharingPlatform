import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  AdminStatisticsContainer,
  ManagerStatisticsContainer,
} from './../../components';

const Stats = () => {
  const { user } = useSelector((store) => store.user);

  if (user.role === 'customer') {
    return <Navigate replace to="/browse" />;
  }

  return (
    <>
      {user.role === 'admin' ? (
        <AdminStatisticsContainer />
      ) : (
        <ManagerStatisticsContainer />
      )}
    </>
  );
};

export default Stats;
