import styled from 'styled-components';

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
    background: var(--grey-5);
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: center;
    margin-top: 17px;
  }
`;

export default Wrapper;
