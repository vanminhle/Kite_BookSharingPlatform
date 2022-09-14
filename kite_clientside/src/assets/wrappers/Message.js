import styled from 'styled-components';

const Wrapper = styled.section`
  .message {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .messageContainer {
    display: flex;
    gap: 10px;
    margin-bottom: 2px;
  }

  .messageImg {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .messageText {
    padding: 7px 15px 7px 15px;
    border-radius: 20px;
    background-color: var(--primary-500);
    color: white;
    max-width: 300px;
    margin-bottom: 0;
  }

  .messageTime {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .message.own {
    align-items: flex-end;
  }

  .message.own .messageText {
    background-color: rgb(245, 241, 241);
    color: black;
  }
`;
export default Wrapper;
