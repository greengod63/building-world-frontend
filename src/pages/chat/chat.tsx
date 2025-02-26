import './chat.scss';
import ChatDesktop from '../../components/chat/chatDesktop/chatDesktop';
import ChatBarHeader from "../../components/chat/chatBar/chatBarHeader/chatBarHeader";
import ChatBar from "../../components/chat/chatBar/chatBar";
import { useEffect, useRef, useState, useContext } from 'react';
import { chatByIdResponse } from '../../types/chats/generalTypes';
import { chatMessageType } from '../../types/chats/messagesTypes';
import { useInfiniteScroll } from '../../customHooks/useInfiniteScroll';
import { authorizedRequest } from '../../utils/queries';
import { chatInfoById } from '../../utils/network';
import ChatBaseLayout from '../../layouts/chatBaseLayout/chatBaseLayout';
import CreateGroupChat from '../../modals/chat/createGroupChat/createGroupChat';
import { profile } from '../../assets/Icons';
import { ChatContext } from '../../context/chat/chatContext';


const Chat = () => {
  const [userChat, setUserChat] = useState<chatByIdResponse>();
  const [ messages, SetMessages ] = useState<chatMessageType[]>()
  const [currentUserHeight, setCurrentUserHeight] = useState<number>(0)
  const messagesScrollHeight = useRef<HTMLDivElement>(null)
  const blockHeight = messagesScrollHeight.current !== null ? messagesScrollHeight.current.scrollHeight : 100000
  // const { count, loading } = useInfiniteScroll(blockHeight, currentUserHeight, 100, 20);
  const { chatId } = useContext(ChatContext);

  const handleScroll = () => {
    const currentHeight = messagesScrollHeight.current
    if (currentHeight) {
      setCurrentUserHeight(currentHeight.scrollTop)
    }
  }

  return (
    <ChatBaseLayout>
      <div className="chat-container">
        <div className='chat-container-layout'>
          {
            chatId ?
              <ChatDesktop />
              :
              null
          }
        </div>
        <ChatBar />
      </div>
      <CreateGroupChat />
    </ChatBaseLayout>
  );
};

export default Chat;