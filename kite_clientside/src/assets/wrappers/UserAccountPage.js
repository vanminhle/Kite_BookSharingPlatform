import styled from 'styled-components';

const Wrapper = styled.section`
  h4 {
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 2rem;
  }
  p {
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  .user-information,
  .user-password,
  .user-email,
  .user-deactivate {
    padding: 2rem 12rem 4rem 12rem;
  }

  .user-password,
  .user-email,
  .user-deactivate {
    margin-top: 5rem;
  }

  .user-deactivate {
    margin-bottom: 5rem;
  }

  .button-group {
    display: flex;
    gap: 1rem;
  }

  .button-submit,
  .button-edit {
    margin-top: 2rem;
  }

  .validation-popup {
    margin-bottom: 0rem;
    margin-top: 0.6rem;
    font-size: 0.9rem;
    color: red;
  }
`;

export default Wrapper;
