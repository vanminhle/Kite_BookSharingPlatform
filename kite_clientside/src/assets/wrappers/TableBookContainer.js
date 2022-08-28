import styled from 'styled-components';

const Wrapper = styled.section`
  margin-bottom: 5rem;
  .book-info {
    display: flex;
    align-items: center;
  }
  .book-image {
    width: 80px;
    border: 0.1px solid var(--grey-100);
  }

  .book-data {
    width: 15rem;
    margin-left: 1rem;
  }
`;

export default Wrapper;
