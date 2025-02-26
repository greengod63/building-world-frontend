import './messageArea.scss';
import ChatInput from '../chatInput/chatInput';
import ChatMessages from './chatMessages/chatMessages';
import ChatInfoText from '../../chatInfoText/chatInfoText';
import { FC, useContext, useEffect, useState } from 'react';
import { actionType, popupAdditionDataType } from '../../../../types/chats/actionsType';
import { messageAreaProps } from '../../../../types/chats/generalTypes';
import { chatMessageType, userMessageType, messageTypes } from '../../../../types/chats/messagesTypes';

import { actions } from '../../../../types/chats/actionsType';
import ChatMessageLoadingIcon from '../../chatMessageLoadingIcon/сhatMessageLoadingIcon';
import { ChatContext } from '../../../../context/chat/chatContext';

const MessageArea: FC<messageAreaProps> = ({ loading, scrollHandler, messages, messageAreaContainer, date }) => {
  //clicked message data
  //set block that we need to animate and its first loading of message animate all blocks with default animation
  const { setContextMenu, contextMenu } = useContext(ChatContext);
  const [ dateText, setDateText ] = useState('');
  const months = [
    'January',
    'February',
    'March',
    'April',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  
  useEffect(() => {
    if(date){
      const currentDate = new Date();
      
      if(currentDate.getDate() === date.getDate() && currentDate.getMonth() === date.getMonth() && currentDate.getFullYear() === date.getFullYear()){
        setDateText('Today')
      }else{
        setDateText(`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear() !== currentDate.getFullYear() ? date.getFullYear() : ''}`)
      }
    }
  }, [date])

  return (
    <div className={`message-area ${contextMenu ? 'message-area-block-scroll' : ''}`} ref={messageAreaContainer} onScroll={scrollHandler} onClick={() => {
      setContextMenu(null)
    }}>
      {loading ? <div className='loading-messages'><ChatMessageLoadingIcon /></div> : null}
      <div className={`date-banner ${!date ? 'hidden-date-banner' : null}`}>{dateText}</div>
      {messages.map((message) => {
        if (message.type === messageTypes.DATE) {
          return <ChatInfoText text={message.text} />
        } else {
          return <ChatMessages
            message={message as userMessageType}
          />
        }
      })}
    </div>
  );
};

export default MessageArea;
