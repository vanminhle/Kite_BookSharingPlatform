import styled from 'styled-components';

const Wrapper = styled.section`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
  margin-top: 3rem;
  .btn-container {
    background: var(--primary-100);
  }
  .pageBtn {
    background: white;
    border-color: transparent;
    width: 50px;
    height: 40px;
    font-weight: 500;
    font-size: 1.1rem;
    color: var(--grey-800);
    transition: var(--transition);
    cursor: pointer;
  }
  .active {
    background: var(--primary-500);
    color: var(--white);
  }
  .prev-btn,
  .next-btn {
    width: 100px;
    height: 40px;
    background: white;
    border: transparent;
    color: var(--grey-800);
    font-weight: 500;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary-500);
    color: var(--white);
  }
`;
export default Wrapper;
