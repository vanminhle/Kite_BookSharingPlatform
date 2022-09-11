import Wrapper from '../../assets/wrappers/ChartContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalRevenueMonthly } from '../../features/statistics/statisticsSlice';
import RevenueAreaChartContainer from './RevenueAreaChartContainer';
import { useEffect } from 'react';

const RevenueChartContainer = () => {
  const { totalRevenueMonthly } = useSelector((store) => store.statistics);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalRevenueMonthly());
  }, []);

  return (
    <Wrapper>
      <h5 className="page-title">Total Books Revenue</h5>
      <p style={{ marginLeft: '15.6rem', marginBottom: '0rem' }}>
        (Total Revenue / Month of the year)
      </p>
      <RevenueAreaChartContainer
        data={totalRevenueMonthly?.totalRevenueMonthly}
      />
    </Wrapper>
  );
};

export default RevenueChartContainer;
