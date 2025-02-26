import './chatMessage.scss';
import { chatMessagePropsType } from '../../../../../types/chats/generalTypes';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import FileMessage from './fileMessage/fileMessage'
import { messageStatus, messageTypes } from '../../../../../types/chats/messagesTypes';
import { ChatContext } from '../../../../../context/chat/chatContext';
import { sentStatusIcon, readStatusIcon } from '../../../../../assets/chatIcons';
import ChatMessageLoadingIcon from '../../../chatMessageLoadingIcon/сhatMessageLoadingIcon';
import { profile } from '../../../../../assets/Icons';
import ContextMenu from '../contextMenu/contextMenu';
import { actions } from '../../../../../types/chats/actionsType';
import ReplyBanner from './replyBanner/replyBanner';
import { forwardedIcon } from '../../../../../assets/chatIcons';

const ChatMessages: FC<chatMessagePropsType> = ({ message }) => {

  const { file, text, date, forwarded, edited, type, status, senderId, messageId } = message

  const [ needToAnimate, setNeedToAnimateBlock ] = useState(true);

  const { setContextMenu, contextMenu, chatMembers, messages, setMessages } = useContext(ChatContext)

  const sender = chatMembers[chatMembers.findIndex((elem) => elem.employeeId === senderId)];

  const messageBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(message)
    setNeedToAnimateBlock(false);
    messages[messages.findIndex((elem) => elem.messageId === messageId)].block = messageBlockRef?.current
    setMessages([...messages])
  }, [])


  const contextMenuHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (contextMenu?.display) {
      setContextMenu(null)
    } else {
      setContextMenu({
        display: true,
        coords: {
          x: e.clientX,
          y: e.clientY
        },
        message: message
      })
    }
  }

  return (
    <div className={`chat-message-container ${type === messageTypes.USER ? 'user-message-container' : 'stranger-message-container'} ${needToAnimate ? 'hidden-message' : ''}`}>
      {type === messageTypes.STRANGER ? <div className='chat-message-avatar-container'>{sender?.avatar ? sender?.avatar : profile}</div> : null}
      <div
        ref={messageBlockRef}
        key={messageId}
        onContextMenu={(e) => contextMenuHandler(e)}
        className={`chat-message ${type === messageTypes.USER ? 'user-message' : 'stranger-message'}`}
      >
        {contextMenu ? <ContextMenu /> : null}
        <div className="chat-message-data-container">
          <div className="chat-message-item">
            {forwarded ? <p className="additional">{forwardedIcon}{forwarded.from}</p> : null}
            {edited ? <p className="additional">Edited</p> : null}
            <p className="sender">{type === messageTypes.USER ? 'You' : sender?.name}</p>
          </div>
          <p className="time">{`${date.getHours()}:${date.getMinutes()}`}</p>
        </div>
        <ReplyBanner/>
        <div className="chat-message-files-container">
          {file.map((fileData) => {
            return <FileMessage fileData={fileData} />
          })}
        </div>
        <p className="chat-message-text">
          {text}
        </p>
        {
          type === messageTypes.USER ?
            <div className="chat-message-status">
              {status === messageStatus.SENT ? sentStatusIcon : status === messageStatus.READ ? readStatusIcon : status === messageStatus.SENDING ? <ChatMessageLoadingIcon /> : null}
            </div> : null
        }
      </div>
    </div>
  );
};

export default ChatMessages;
