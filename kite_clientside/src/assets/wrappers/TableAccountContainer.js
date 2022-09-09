import styled from 'styled-components';

const Wrapper = styled.section`
  margin-bottom: 5rem;
  .account-info {
    display: flex;
    align-items: center;
  }
  .profile-circle {
    width: 50px;
    border-radius: 50%;
    border: 0.1px solid var(--grey-100);
  }

  .profile-data {
    margin-left: 1rem;
  }
`;

export default Wrapper;
