import './chatInfoSlider.scss';

import { FC, useContext, useEffect } from 'react';
import { ChatContext } from '../../../../context/chat/chatContext';
import { groupChatBasicAvatar } from '../../../../assets/chatIcons';
import { profile } from '../../../../assets/Icons';
import { vector } from '../../../../assets/Icons';
import { chatInfoSearchIcon } from '../../../../assets/chatIcons';
import ChatInfoParticipantCard from './chatInfoParticipantCard/chatInfoParticipantCard'

const ChatInfoSlider: FC = () => {
    const { chatInfoSliderIsOpened, setChatInfoSliderIsOpened, chatInfo } = useContext(ChatContext);

    const { name, description, avatar, group } = chatInfo;

    console.log(avatar ? <img src={avatar} alt="" /> : group ? groupChatBasicAvatar : profile)

    return (
        <div className={`chat-info-slider${chatInfoSliderIsOpened ? ' open-chat-info-slider': ''}`}>
            <div className="chat-info-slider-container">
                <div className="chat-info-slider-header-avatar">
                    {
                        avatar ? <img src={avatar} alt="" /> : group ? groupChatBasicAvatar : profile
                    }
                </div>
                <div className="chat-info-slider-header-text-container">
                    <p className="chat-info-slider-header-title">{name}</p>
                    <p className="chat-info-slider-header-subtitle">{description}</p>
                </div>
            </div>

            <div className="chat-info-slider-container">
                <p className="chat-info-slider-text">Group created by Rustam November 21, 2022; d 15:45</p>
                <div className="chat-info-slider-more-data-container more-media-data-container">
                    <p className="chat-info-slider-text">Media, links and documents</p>
                    <div className="chat-info-slider-more-data-arrow-container">
                        <p className="chat-info-slider-text">2</p>
                        <div className="chat-info-slider-more-data-arrow">
                            {vector}
                        </div>
                    </div>
                </div>
            </div>

            <div className="chat-info-slider-container">
                <div className="chat-info-slider-participants-header">
                    <p className="chat-info-slider-text">0 people</p>
                    <div className="chat-info-slider-participants-search">
                        {chatInfoSearchIcon}
                    </div>
                </div>
                <div className="chat-info-slider-participants-container">
                    <ChatInfoParticipantCard name='ahmad vetros' avatar={null} />
                    <ChatInfoParticipantCard name='ahmad vetros' avatar={null} />
                    <ChatInfoParticipantCard name='ahmad vetros' avatar={null} />
                    <ChatInfoParticipantCard name='ahmad vetros' avatar={null} />
                    <ChatInfoParticipantCard name='ahmad vetros' avatar={null} />
                </div>
            </div>

        </div>
    )
}

export default ChatInfoSlider;