import Wrapper from '../../assets/wrappers/StatsContainer';
import StatItem from './../StatsItem';
import { VscLibrary } from 'react-icons/vsc';
import { MdOutlineLocalLibrary, MdOutlineBlock } from 'react-icons/md';
import { BsCartCheck } from 'react-icons/bs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooksStatistics } from '../../features/statistics/statisticsSlice';

const AdminStatsContainer = () => {
  const { booksStats } = useSelector((store) => store.statistics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooksStatistics());
  }, []);

  const defaultStats = [
    {
      title: 'books',
      count: booksStats?.totalBooks || 0,
      icon: <VscLibrary />,
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
      title: 'unpublished',
      count: booksStats?.totalUnpublished || 0,
      icon: <MdOutlineBlock />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
    {
      title: 'sold',
      count: booksStats?.totalSold || 0,
      icon: <BsCartCheck />,
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
