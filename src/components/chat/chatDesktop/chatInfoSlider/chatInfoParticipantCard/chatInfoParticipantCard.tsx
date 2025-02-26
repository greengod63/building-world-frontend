import './chatInfoParticipantCard.scss';
import { FC } from 'react';
import { chatInfoParticipantCardProps } from '../../../../../types/chats/chatInfoSliderTypes';
import { profile } from '../../../../../assets/Icons';

const ChatInfoParticipantCard: FC<chatInfoParticipantCardProps> = ({name, avatar}) => {


    return (
        <div className="chat-info-slider-participant-card-container">
            <div className="chat-info-slider-particioant-avatar">
                {avatar ? <img src={avatar} /> : profile}
            </div>
            <p className="chat-info-slider-particioant-name">{name}</p>
        </div>
    )
}

export default ChatInfoParticipantCard;