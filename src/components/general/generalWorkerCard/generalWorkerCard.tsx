import { FC } from 'react';
import { generalWorkerCardProps } from '../../../types/general/generalWorkerCardTypes';
import './generalWorkerCard.scss';
import { profile } from "../../../assets/Icons";


const GeneralWorkerCard: FC<generalWorkerCardProps> = ({ name, position, avatar, userId, onClickHandler= () => {} }) => {
  return (
    <div className={`worker-card ${!userId ? 'worker-card-placeholder' : null}`} onClick={() => onClickHandler()}>
      <div className="worker-card-img">
        {avatar ? <img src={avatar} alt=""/> : <>{profile}</>}
      </div>
      <div className="worker-card-info">
        <p className="worker-card-name">{name}</p>
        <p className="worker-card-position">{position}</p>
      </div>
    </div>
  )
}

export default GeneralWorkerCard;

