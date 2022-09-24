import Wrapper from '../../assets/wrappers/StatsContainer';
import StatItem from './../StatsItem';
import { VscLibrary } from 'react-icons/vsc';
import { MdOutlineLocalLibrary } from 'react-icons/md';
import { BiCoinStack } from 'react-icons/bi';
import { BsCartCheck } from 'react-icons/bs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooksStatistics } from '../../features/statistics/statisticsSlice';

const RevenueStatsContainer = () => {
  const { booksStats } = useSelector((store) => store.statistics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooksStatistics());
  }, []);

  const defaultStats = [
    {
      title: 'sold',
      count: booksStats?.totalSold || 0,
      icon: <BsCartCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'published',
      count: booksStats?.totalPublished || 0,
      icon: <MdOutlineLocalLibrary />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'revenue',
      count: booksStats?.Revenue[0].total || 0,
      icon: <BiCoinStack />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
    {
      title: 'average',
      count: booksStats?.Revenue[0].average.toFixed(0) || 0,
      icon: <VscLibrary />,
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

export default RevenueStatsContainer;
