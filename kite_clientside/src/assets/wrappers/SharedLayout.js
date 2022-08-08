import styled from 'styled-components';

const Wrapper = styled.section`
  .home {
    display: grid;
    grid-template-columns: 1fr;
  }
  .home-page {
    width: 90vw;
    margin: 0 auto;
    padding-top: 3rem;
  }
  .home {
    grid-template-columns: auto 1fr;
  }
  .home-page {
    width: 90%;
  }
`;
export default Wrapper;
