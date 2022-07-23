import styled from 'styled-components';

const Wrapper = styled.section`
  display: grid;
  align-items: center;

  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }

  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
    font-weight: 400;
  }
  p {
    margin-top: 1.5rem;
    margin-bottom: 0;
    margin-left: 6px;
    padding: 0;
  }
  .btn {
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
  .member-section {
    border-top: 1px solid var(--grey-200);
    text-align: center;
  }
`;
export default Wrapper;
