import { ListGroup, ListGroupItem } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTopFiveBooksSales,
  getTopFiveBooksRevenue,
} from '../../features/statistics/statisticsSlice';
import { useEffect } from 'react';

const TableTopContainer = () => {
  const { topBooksSales, topBooksRevenue } = useSelector(
    (store) => store.statistics
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopFiveBooksSales());
    dispatch(getTopFiveBooksRevenue());
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ width: '48%' }}>
        <h5
          style={{
            textTransform: 'uppercase',
            fontWeight: '500',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          top five book sales
        </h5>
        <ListGroup>
          {topBooksSales?.topFiveBooksSales.map((book, index) => (
            <ListGroupItem key={index}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1.4rem',
                }}
              >
                <p style={{ marginBottom: '0' }}>#{index + 1}</p>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem',
                  }}
                >
                  <p style={{ marginBottom: '0' }}>{book?._id?.bookTitle}</p>
                  <p style={{ marginBottom: '0' }} className="text-muted">
                    {book?._id?.author.fullName}
                  </p>
                </div>
                <p style={{ marginBottom: '0', marginLeft: 'auto' }}>
                  {book.Count} Sold
                </p>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
      <div style={{ width: '48%' }}>
        <h5
          style={{
            textTransform: 'uppercase',
            fontWeight: '500',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          top five books revenue
        </h5>
        <ListGroup>
          {topBooksRevenue?.topFiveBooksRevenue.map((book, index) => (
            <ListGroupItem key={index}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1.4rem',
                }}
              >
                <p style={{ marginBottom: '0' }}>#{index + 1}</p>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem',
                  }}
                >
                  <p style={{ marginBottom: '0' }}>{book?._id?.bookTitle}</p>
                  <p style={{ marginBottom: '0' }} className="text-muted">
                    {book?._id?.author.fullName}
                  </p>
                </div>
                <p style={{ marginBottom: '0', marginLeft: 'auto' }}>
                  {book?.Count} $
                </p>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default TableTopContainer;
