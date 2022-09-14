import styled from 'styled-components';

const Wrapper = styled.section`
  .messenger {
    height: calc(92vh - 70px);
    display: flex;
    padding: 15px;
    background-color: var(--grey-10);
    border-radius: 5px;
    box-shadow: 3px 0px 30px -10px rgb(0 0 0 / 24%);
  }

  .chat-title {
    text-align: center;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 10px;
    margin-top: 5px;
  }

  .chat-menu {
    flex: 3.5;
  }

  .chat-box {
    flex: 5.5;
  }

  .chatBoxTop {
    height: 100%;
    overflow-y: scroll;
  }

  .chatBoxWrapper {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .chatBoxTop {
    height: 100%;
    overflow-y: scroll;
    padding-right: 10px;
  }

  .chatBoxBottom {
    margin-top: 5px;
    display: flex;
    align-items: center;
    margin-top: 25px;
    gap: 10px;
  }

  .chatMessageInput {
    width: 100%;
    padding: 10px;
  }

  .chatSubmitButton {
    width: 70px;
    height: 40px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
  }

  .chat-online {
    flex: 3;
  }

  .chartMenuWrapper,
  .chatBoxWrapper,
  .chatOnlineWrapper {
    padding: 10px;
    height: 100%;
  }

  .openSupportSection {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin-top: 40px;
    flex-direction: column;
    gap: 50px;
  }

  .openSupportSection h5 {
    text-transform: uppercase;
    font-weight: 500;
  }

  .noConversationText:hover {
    color: var(--grey-1000);
  }
`;
export default Wrapper;
