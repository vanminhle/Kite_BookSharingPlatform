import { useEffect, useState } from 'react';
import Wrapper from './../assets/wrappers/Conversation';
import noProfilePicture from '../assets/images/noProfilePicture.svg';
import customFetch from '../utils/axios';
import { toast } from 'react-toastify';

const Conversation = ({ conversation, currentUser, currentChat }) => {
  const [receiverUser, setReceiverUser] = useState(null);

  useEffect(() => {
    const receiverId = conversation?.members.find((m) => m !== currentUser._id);

    const getReceiverUserData = async () => {
      try {
        const res = await customFetch.get(`http/api/users/${receiverId}`);
        setReceiverUser(res.data.data.user);
      } catch (err) {
        toast.error(
          'Problem when loading the support conversation data. Please try again!'
        );
      }
    };
    getReceiverUserData();
  }, [currentUser, conversation]);

  return (
    <Wrapper>
      <div
        className={
          currentChat?._id === conversation?._id
            ? 'conversation isChosenConversation'
            : 'conversation'
        }
      >
        <img
          className="conversation-img"
          src={receiverUser?.photo || noProfilePicture}
          alt={receiverUser?.fullName}
        />
        <div className="conversation-name">{receiverUser?.fullName}</div>
      </div>
    </Wrapper>
  );
};

export default Conversation;
