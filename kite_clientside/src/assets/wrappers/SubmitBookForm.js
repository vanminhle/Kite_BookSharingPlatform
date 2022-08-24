import styled from 'styled-components';

const Wrapper = styled.section`
  .br-icon {
    position: fixed;
    bottom: 2.8rem;
    right: 3.6rem;
    z-index: 100;
    height: 4.1rem;
    width: 4.1rem;
    border-radius: 100%;
    background-color: var(--primary-400);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: scale(0.92);
    transform: scale(0.92);
    transition: var(--transition);
  }
  .br-icon:hover {
    box-shadow: var(--shadow-4);
    transition: var(--transition);
    background-color: var(--primary-600);
  }
  .br-icon::before {
    content: '+';
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 1.75rem;
    font-weight: 600;
  }
`;
export default Wrapper;
