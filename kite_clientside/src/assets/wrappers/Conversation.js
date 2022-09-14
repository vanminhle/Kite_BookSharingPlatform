import styled from 'styled-components';

const Wrapper = styled.section`
  .conversation {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    margin-top: 1px;
    margin-right: 10px;
    background-color: var(--grey-10);
  }

  .isChosenConversation {
    background-color: var(--grey-70);
  }

  .conversation:hover {
    background-color: var(--grey-200);
  }

  .conversation-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
  }

  .conversation-name {
    font-weight: 500;
  }
`;
export default Wrapper;
