import Wrapper from '../../assets/wrappers/StatsContainer';
import StatItem from './../StatsItem';
import { FiUsers, FiUserCheck } from 'react-icons/fi';
import { SiSuperuser } from 'react-icons/si';
import { AiOutlineUser } from 'react-icons/ai';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountsStatistics } from '../../features/statistics/statisticsSlice';

const AdminStatsContainer = () => {
  const { accountsStats } = useSelector((store) => store.statistics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccountsStatistics());
  }, []);
  const defaultStats = [
    {
      title: 'Accounts',
      count: accountsStats?.totalAccounts || 0,
      icon: <FiUsers />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'active accounts',
      count: accountsStats?.totalActiveAccounts || 0,
      icon: <FiUserCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'managers',
      count: accountsStats?.totalManagers || 0,
      icon: <SiSuperuser />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
    {
      title: 'customers',
      count: accountsStats?.totalCustomers || 0,
      icon: <AiOutlineUser />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default AdminStatsContainer;
