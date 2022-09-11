import Wrapper from '../../assets/wrappers/ChartContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getBooksSoldMonthly } from '../../features/statistics/statisticsSlice';
import SoldBarChartContainer from './SoldBarChartContainer';
import { useEffect } from 'react';

const SoldChartContainer = () => {
  const { booksSoldMonthly } = useSelector((store) => store.statistics);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooksSoldMonthly());
  }, []);

  return (
    <Wrapper>
      <h5 className="page-title">Monthly Books Sold</h5>
      <p style={{ marginLeft: '15.6rem', marginBottom: '0rem' }}>
        (Sold Totals / Month of the year)
      </p>
      <SoldBarChartContainer data={booksSoldMonthly?.totalSoldEachMonth} />
    </Wrapper>
  );
};

export default SoldChartContainer;
