import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'reactstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Loading } from '../../components';
import PageBtnContainer from './../PageBtnContainer';
import {
  changeTagsPage,
  getTags,
  deleteTag,
  getTag,
} from '../../features/tags/tagsSlice';

const TableTagsContainer = () => {
  const {
    tags,
    isLoading,
    page,
    search,
    group,
    numOfPages,
    sort,
    isCreate,
    isUpdate,
    isDelete,
  } = useSelector((store) => store.tags);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTags());

    if (isUpdate || isCreate || isDelete) {
      document.body.style.opacity = 0.5;
    } else {
      document.body.style.opacity = 1;
    }
  }, [search, page, group, sort, isCreate, isUpdate, isDelete]);

  if (isLoading) {
    return <Loading center />;
  }

  if (tags.length === 0) {
    return (
      <div className="table-container">
        <h5 style={{ marginBottom: '0', fontWeight: '500' }}>
          No Tags to Display...
        </h5>
      </div>
    );
  }

  return (
    <>
      <div style={{ marginBottom: '3rem' }}>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Group</th>
              <th>Description</th>
              <th>Sales</th>
              <th>Buyer Qty.</th>
              <th>Books Qty.</th>
              <th style={{ textAlign: 'center' }}>Edit</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => {
              return (
                <tr key={tag._id}>
                  <td>
                    <p className="fw-bold mb-1">{tag.name}</p>
                  </td>
                  <td>
                    <p className="fw-bold mb-1">
                      {tag.group.charAt(0).toUpperCase() + tag.group.slice(1)}
                    </p>
                  </td>
                  <td>
                    <p className="fw-bold mb-1">{tag.description}</p>
                  </td>
                  <td>
                    <p className="fw-bold mb-1">0 Sales</p>
                  </td>
                  <td>
                    <p className="fw-bold mb-1">0 Buyer</p>
                  </td>
                  <td>
                    <p className="fw-bold mb-1">0 Books</p>
                  </td>
                  <td>
                    <div className="actions-div">
                      <FaEdit
                        title="Edit"
                        style={{
                          color: 'var(--primary-600)',
                        }}
                        onClick={() => dispatch(getTag(tag._id))}
                      />
                      <RiDeleteBin6Line
                        title="Delete"
                        style={{
                          color: 'var(--red-dark)',
                        }}
                        onClick={() => dispatch(deleteTag(tag._id))}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {numOfPages > 1 && (
        <PageBtnContainer props={[numOfPages, page, changeTagsPage]} />
      )}
    </>
  );
};

export default TableTagsContainer;
