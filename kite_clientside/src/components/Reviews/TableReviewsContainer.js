import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, ModalHeader, ModalFooter, Table } from 'reactstrap';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Loading } from '../../components';
import Wrapper from '../../assets/wrappers/TableAccountContainer';
import PageBtnContainer from './../PageBtnContainer';
import noProfilePicture from '../../assets/images/noProfilePicture.svg';
import {
  getAllReviews,
  managerDeleteReview,
  openDeleteModal,
  closeDeleteModal,
  changeReviewsPage,
} from '../../features/reviews/reviewsSlice';
import moment from 'moment';

const TableReviewsContainer = () => {
  const {
    isLoading,
    reviews,
    numOfPages,
    isDelete,
    page,
    deleteModal,
    reviewId,
    search,
    searchOptions,
    sort,
  } = useSelector((store) => store.reviews);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReviews());

    if (isDelete) {
      document.body.style.opacity = 0.5;
    } else {
      document.body.style.opacity = 1;
    }
  }, [search, page, sort, searchOptions, isDelete]);

  if (isLoading) {
    return <Loading center />;
  }

  if (reviews.length === 0) {
    return (
      <div className="table-container">
        <h5 style={{ marginBottom: '0', fontWeight: '500' }}>
          No Reviews to Display...
        </h5>
      </div>
    );
  }

  return (
    <Wrapper>
      <Modal
        isOpen={deleteModal}
        toggle={() => dispatch(closeDeleteModal())}
        style={{ top: '7rem' }}
      >
        <ModalHeader className="modal-header">Delete This Review?</ModalHeader>
        <ModalFooter className="modal-footer">
          <Button
            color="danger"
            onClick={() => dispatch(managerDeleteReview(reviewId))}
          >
            Delete
          </Button>

          <Button
            color="secondary"
            onClick={() => dispatch(closeDeleteModal())}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <div style={{ marginBottom: '3rem' }}>
        <Table bordered hover>
          <thead>
            <tr>
              <th>At.</th>
              <th>By / In</th>
              <th>Review</th>
              <th>Rating</th>
              <th style={{ textAlign: 'center' }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => {
              return (
                <tr key={review._id}>
                  <td>
                    <p className="mb-0">
                      {moment(review.createdAt).format('LLL')}
                    </p>
                  </td>
                  <td>
                    <div className="account-info">
                      <img
                        className="profile-circle"
                        src={
                          review.user.photo
                            ? review.user.photo
                            : noProfilePicture
                        }
                        alt={review.user.fullName}
                      />
                      <div className="profile-data">
                        <p className="fw-bold mb-0">
                          Given By: {review.user.fullName}
                        </p>
                        <p className="text-muted mb-0">{review.user.email}</p>
                        <hr
                          style={{
                            width: '10rem',
                            marginBottom: '5px',
                            marginTop: '5px',
                          }}
                        />
                        <p className="fw-bold mb-0">
                          Book: {review.book.bookTitle}
                        </p>
                        <p className="text-muted mb-0">
                          {review.book.author.fullName} -{' '}
                          {review.book.author.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="mb-0">{review.review}</p>
                  </td>
                  <td>
                    <p className="mb-0">{review.rating}</p>
                  </td>
                  <td>
                    <div className="actions-div">
                      <RiDeleteBin6Line
                        title="Delete Transaction"
                        onClick={() => dispatch(openDeleteModal(review._id))}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {numOfPages > 1 && !search && (
        <PageBtnContainer props={[numOfPages, page, changeReviewsPage]} />
      )}
    </Wrapper>
  );
};

export default TableReviewsContainer;
