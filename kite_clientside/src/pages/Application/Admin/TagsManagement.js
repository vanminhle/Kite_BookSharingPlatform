import {
  QueryTagsContainer,
  TableTagsContainer,
  CreateTagForm,
} from '../../../components';
import { useSelector } from 'react-redux';

const TagsManagement = () => {
  const { tags, totalTags } = useSelector((store) => store.tags);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h4 className="page-title">Tags Management</h4>
        <h5 style={{ fontWeight: '500' }}>
          {totalTags} tag{tags.length > 1 && 's'} found
        </h5>
      </div>
      <QueryTagsContainer />
      <CreateTagForm />
      <TableTagsContainer />
    </>
  );
};

export default TagsManagement;
