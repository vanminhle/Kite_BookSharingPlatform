import styled from 'styled-components';

const Wrapper = styled.main`
  .logo-helper {
    margin: 12.2vh 0;
    text-align: center;
  }
  .card-helper {
    margin: 0vh 9vw;
    justify-content: center;
  }
  .card-padding-style {
    padding: 2rem;
  }
  .form-helper {
    box-shadow: var(--shadow-1);
    transition: var(--transition);
  }
  .form-helper:hover {
    box-shadow: var(--shadow-4);
  }
`;
export default Wrapper;
