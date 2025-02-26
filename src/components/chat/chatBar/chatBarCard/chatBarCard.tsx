import './chatBarCard.scss'
import { FC, useContext } from 'react';
import { chatBarCardProps } from '../../../../types/chats/chatsBarTypes';
import { profile } from '../../../../assets/Icons';
import { ChatContext } from '../../../../context/chat/chatContext';

const ChatBarCard: FC<chatBarCardProps> = ({avatar, name, lastMessage, unreadMessages, chatId}) => {

    const { setChatId } = useContext(ChatContext);

    return (
        <div className="chat-card-container" onClick={() => setChatId(chatId)}>
            <div className="chat-card-avatar-container">
                {avatar ? 
                    <img src={avatar}/>
                    :
                    profile
                }
            </div>
            <div className="chat-card-information-container">
                <p className="name">{name}</p>
                <div className="chat-card-message-container">
                    <p className="message">{lastMessage}</p>
                </div>
            </div>

                {unreadMessages ? 
                    <div className="notifications-container">
                        <p className="notifications">{unreadMessages}</p> 
                    </div>
                :
                null}
        </div>
    );
};

export default ChatBarCard;
