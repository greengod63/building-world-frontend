import { FC, useContext } from 'react';
import { profile } from '../../../../assets/Icons';
import { groupChatBasicAvatar } from '../../../../assets/chatIcons';
import './chatHeader.scss';
import { ChatTools, ChatsearchSvg } from '../../../../assets/chatIcons';
import { ChatContext } from '../../../../context/chat/chatContext';

const ChatHeader: FC = () => {
    const { chatInfoSliderIsOpened, setChatInfoSliderIsOpened, chatInfo } = useContext(ChatContext)

    return (
        <div className="chat-header-container" onClick={() => setChatInfoSliderIsOpened(!chatInfoSliderIsOpened)}>
            <div className="chat-info-container">
                <div className="chat-avatar">
                    {chatInfo.avatar ?  <img src={chatInfo.avatar} alt={chatInfo.name} /> : chatInfo.group ? groupChatBasicAvatar : profile}
                </div>
                <div className='chat-name-container'>
                    <p className='name'>{chatInfo.name}</p>
                    <p className='status'>{chatInfo.name}</p>
                </div>
            </div>
            <div className="additional-tools">
                {ChatsearchSvg}
                {ChatTools}
            </div>
        </div>
    );
};

export default ChatHeader;
