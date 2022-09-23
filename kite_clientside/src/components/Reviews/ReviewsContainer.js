import {
  Button,
  Col,
  Form,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import noProfilePicture from '../../assets/images/noProfilePicture.svg';
import moment from 'moment';
import Wrapper from '../../assets/wrappers/ReviewsContainer';
import { AiOutlineStar } from 'react-icons/ai';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  createReview,
  deleteReview,
} from './../../features/reviews/reviewsSlice';
import { useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const initialState = {
  review: '',
  rating: '',
};

const ReviewsContainer = ({ reviews }) => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  let { bookId } = useParams();

  const { isCreateSuccess } = useSelector((store) => store.reviews);
  const { user } = useSelector((store) => store.user);
  const { bookTransactionOfUser } = useSelector((store) => store.book);

  useEffect(() => {
    if (isCreateSuccess) {
      setValues(initialState);
    }
  }, [isCreateSuccess]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const submitReview = (e) => {
    e.preventDefault();
    const { review, rating } = values;
    if (!review || !rating) {
      toast.error('Please fill all the required fields');
      return;
    }
    dispatch(createReview({ review, rating, bookId }));
  };

  return (
    <Wrapper>
      {bookTransactionOfUser && (
        <Form onSubmit={submitReview}>
          <Row className="row-cols-lg-auto g-3 align-items-center">
            <Col style={{ width: '85%' }}>
              <Label className="visually-hidden" for="review">
                Review
              </Label>
              <Input
                id="review"
                name="review"
                placeholder="Write review here...."
                type="textarea"
                required
                maxLength="500"
                rows="3"
                values={values.review}
                onChange={handleChange}
              />
            </Col>
            <Col style={{ width: '15%', paddingLeft: '0px' }}>
              <div className="button-element">
                <Label className="visually-hidden" for="rating">
                  Rating
                </Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  placeholder="Rating 1 - 5"
                  min="1"
                  max="5"
                  required
                  values={values.rating}
                  onChange={handleChange}
                />
                <Button type="submit" style={{ width: '100%' }} color="primary">
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      )}

      <ListGroup>
        {reviews?.map((review) => (
          <ListGroupItem key={review._id}>
            <img
              className="profile-image"
              src={review.user.photo ? review.user.photo : noProfilePicture}
              alt={review.user.fullName}
            />
            <div className="data-section">
              <h5>{review.user.fullName}</h5>
              <div>{review.review}</div>
              <div className="date-time">
                {moment(review.createdAt).format('LLL')} / <AiOutlineStar />{' '}
                {review.rating}
              </div>
            </div>
            {user._id === review.user._id && (
              <FaTrashAlt
                title="Delete Review"
                style={{
                  color: 'var(--red-dark)',
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                }}
                onClick={() => dispatch(deleteReview(review._id))}
              />
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Wrapper>
  );
};

export default ReviewsContainer;
