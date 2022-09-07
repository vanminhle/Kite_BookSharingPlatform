import {
  QueryReviewsContainer,
  TableReviewsContainer,
} from '../../../components';
import { useSelector } from 'react-redux';

const ReviewsManagement = () => {
  const { reviews, totalReviews } = useSelector((store) => store.reviews);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h4 className="page-title">Reviews Management</h4>
        <h5 style={{ fontWeight: '500' }}>
          {totalReviews} Review{reviews.length > 1 && 's'} found
        </h5>
      </div>
      <QueryReviewsContainer />
      <TableReviewsContainer />
    </>
  );
};

export default ReviewsManagement;
