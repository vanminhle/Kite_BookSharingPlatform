import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 0 2.8rem 2.8rem 2.8rem;

  h5 {
    margin-bottom: 0.8rem;
    font-weight: 500;
  }

  .row {
    margin-bottom: 1rem;
  }

  .data-section {
    padding: 1rem;
  }

  .button-element {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
  }

  .list-group-item {
    display: flex;
    align-items: flex-start;
  }

  .profile-image {
    width: 3rem;
    border-radius: 50%;
    border: 0.1px solid var(--grey-100);
    margin-top: 1rem;
  }

  .date-time {
    margin-top: 1rem;
  }
`;
export default Wrapper;
