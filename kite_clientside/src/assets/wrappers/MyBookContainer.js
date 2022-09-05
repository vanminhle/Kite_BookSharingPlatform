import styled from 'styled-components';

const Wrapper = styled.article`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .my-books-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 3rem;
  }
`;

export default Wrapper;
