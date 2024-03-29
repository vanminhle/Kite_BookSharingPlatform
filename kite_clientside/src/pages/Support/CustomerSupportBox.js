import { Conversation } from '../../components';
import Message from '../../components/Message';
import Wrapper from './../../assets/wrappers/SupportBox';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getConversations,
  getMessages,
  sendMessage,
  setMessages,
  createConversation,
} from '../../features/supportConversations/supportConversationsSlice';
import { useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { Button, Input } from 'reactstrap';
import openSupport from '../../assets/images/openSupport.svg';

const SupportBox = () => {
  const { user } = useSelector((store) => store.user);
  const { conversations, messages, isNewConversationCreated } = useSelector(
    (store) => store.supportConversations
  );
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const dispatch = useDispatch();
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io('ws://localhost:8080');
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      dispatch(setMessages(arrivalMessage));
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit('addUser', user._id);
    socket.current.on('getUsers', (users) => {});
  }, [user]);

  useEffect(() => {
    dispatch(getConversations(user._id));
  }, [user._id, isNewConversationCreated]);

  useEffect(() => {
    dispatch(getMessages(currentChat?._id));
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCurrentChatExists = () => {
    if (conversations?.length > 0) {
      setCurrentChat(conversations[0]);
    } else {
      dispatch(
        createConversation({
          senderId: user._id,
        })
      );
    }
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members?.find(
      (member) => member !== user._id
    );
    socket.current.emit('sendMessage', {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    dispatch(sendMessage(message));
    setNewMessage([]);
  };

  return (
    <Wrapper>
      <div className="messenger">
        <div className="chat-box">
          <div className="chatBoxWrapper">
            {!currentChat ? (
              <div className="openSupportSection">
                <img
                  src={openSupport}
                  alt="open a support conversation"
                  style={{
                    width: '30%',
                  }}
                />
                <h5>Need Help? Open a Support Chat Now!</h5>
                <Button
                  color={!isNewConversationCreated ? 'primary' : `success`}
                  style={{
                    marginTop: '-45px',
                  }}
                  onClick={handleCurrentChatExists}
                >
                  {!isNewConversationCreated
                    ? 'Open a Support Chat'
                    : `Start now!`}
                </Button>
              </div>
            ) : (
              <>
                <h5 className="chat-title">Chat with Supporter</h5>
                <div className="chatBoxTop">
                  {messages.map((message, index) => (
                    <div key={index} ref={scrollRef}>
                      <Message
                        messages={message}
                        own={message?.sender === user._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <Input
                    type="text"
                    className="chatMessageInput"
                    placeholder="Say something...."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <Button
                    color="primary"
                    className="chatSubmitButton"
                    onClick={handleSubmitMessage}
                  >
                    Send
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SupportBox;
