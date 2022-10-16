import Wrapper from '../../assets/wrappers/ChartContainer';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBooksUploadedMonthly,
  getBooksSoldMonthly,
} from '../../features/statistics/statisticsSlice';
import BooksAreaChart from './BooksAreaChart';
import { useEffect } from 'react';
import BooksLineChart from './BooksLineChart';

const BooksChartContainer = () => {
  const { booksUploadedMonthly, booksSoldMonthly } = useSelector(
    (store) => store.statistics
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooksUploadedMonthly());
    dispatch(getBooksSoldMonthly());
  }, []);

  return (
    <Wrapper>
      <h5 className="page-title">Monthly Books Uploaded</h5>
      <p style={{ marginLeft: '15.6rem', marginBottom: '3rem' }}>
        (Totals / Month of the year)
      </p>
      <BooksLineChart data={booksUploadedMonthly?.totalBooksEachMonth} />
      <h5 className="page-title" style={{ marginTop: '5rem' }}>
        Monthly Books Sold
      </h5>
      <p style={{ marginLeft: '15.6rem', marginBottom: '0rem' }}>
        (Sold Totals / Month of the year)
      </p>
      <BooksAreaChart data={booksSoldMonthly?.totalSoldEachMonth} />
    </Wrapper>
  );
};

export default BooksChartContainer;
