import styled from 'styled-components';

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 6rem auto auto auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    column-gap: 3rem;
    margin-top: -7rem;
    grid-template-columns: 1fr 1fr;
  }
  h1 {
    font-weight: 700;
    margin-bottom: 0rem;
  }
  h2 {
    span {
      color: var(--primary-500);
    }
    font-weight: 450;
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: block;
  }
`;
export default Wrapper;
