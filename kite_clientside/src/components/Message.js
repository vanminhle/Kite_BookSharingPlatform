import { useEffect, useState } from 'react';
import Wrapper from './../assets/wrappers/Message';
import { format } from 'timeago.js';
import noProfilePicture from '../assets/images/noProfilePicture.svg';
import customFetch from '../utils/axios';
import { toast } from 'react-toastify';

const Message = ({ messages, own }) => {
  const [receiverUser, setReceiverUser] = useState(null);

  useEffect(() => {
    const getReceiverUserData = async () => {
      try {
        const res = await customFetch.get(`http/api/users/${messages?.sender}`);
        setReceiverUser(res.data.data.user);
      } catch (err) {
        toast.error(
          'Problem when loading the conversation data. Please try again!'
        );
      }
    };
    getReceiverUserData();
  }, [messages]);

  return (
    <Wrapper>
      <div className={own ? 'message own' : 'message'}>
        <div className="messageTime">
          {format(messages?.createdAt, 'vi_VN')}
        </div>
        <div className="messageContainer">
          <img
            src={receiverUser?.photo || noProfilePicture}
            alt={receiverUser?.fullName}
            className="messageImg"
          />
          <p className="messageText">{messages?.text}</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Message;
