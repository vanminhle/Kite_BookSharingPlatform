import {
  AccountsStatsContainer,
  BooksStatsContainer,
  AccountsChartContainer,
  BooksChartContainer,
} from './../../components';

const AdminStatisticsContainer = () => {
  return (
    <>
      <AccountsStatsContainer />
      <AccountsChartContainer />
      <hr style={{ marginBottom: '3rem' }} />
      <BooksStatsContainer />
      <BooksChartContainer />
    </>
  );
};

export default AdminStatisticsContainer;
