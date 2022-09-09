import { useSelector } from 'react-redux';
import { AdminStatisticsContainer } from './../../components';

const Stats = () => {
  const { user } = useSelector((store) => store.user);

  return <>{user.role === 'admin' && <AdminStatisticsContainer />}</>;
};

export default Stats;
