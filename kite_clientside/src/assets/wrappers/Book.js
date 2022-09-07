import styled from 'styled-components';

const Wrapper = styled.section`
  hr {
    margin: 2rem 2.8rem 2.8rem 2.8rem;
  }
  h4 {
    text-transform: uppercase;
    margin-bottom: 0.6rem;
    font-weight: 500;
    font-size: 1.7rem;
  }

  h6 {
    text-transform: uppercase;
    font-weight: 400;
    font-size: 1.2rem;
  }

  .email-author {
    margin-bottom: 0.6rem;
  }

  .book-summary {
    margin-top: 1.5rem;
    margin-bottom: 0;
  }

  .book-info {
    display: flex;
    gap: 3rem;
    align-items: flex-end;
    padding: 0 3rem 0 3rem;
  }

  .book-info-text {
    margin-bottom: 0.7rem;
  }

  .book-cover {
    width: 18%;
  }

  .badge-tag {
    display: grid;
    gap: 0.5rem;
    margin-top: 1rem;
    display: inline-grid;
    grid-template-columns: repeat(8, auto);
  }

  .book-price {
    font-weight: 500;
    letter-spacing: 1;
    font-size: 1.7rem;
    margin-top: 1.2rem;
    position: absolute;
    letter-spacing: 1px;
    top: 18rem;
  }

  .book-description {
    padding: 2rem 2.8rem 1rem 2.8rem;
  }

  .button-container {
    padding: 1rem 0 0 3rem;
  }

  .btn {
    width: 17.2%;
  }
`;
export default Wrapper;
