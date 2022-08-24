import Wrapper from '../../../assets/wrappers/MyBooks';
import { SubmitBookForm } from '../../../components';

const MyBooks = () => {
  return (
    <Wrapper>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h4 className="page-title">MY BOOK LIST</h4>
        <h5 style={{ fontWeight: '500' }}>00 Books Found</h5>
      </div>
      <SubmitBookForm />
    </Wrapper>
  );
};

export default MyBooks;
