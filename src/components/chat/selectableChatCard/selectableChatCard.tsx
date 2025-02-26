import { useEffect, useRef, useState, FC } from 'react'
import './selectableChatCard.scss';
import CheckBox from '../../general/checkBox/checkBox';
import { selectableChatCardProps } from '../../../types/chats/generalTypes';
import { profile } from '../../../assets/Icons';

const SelectableChatCard: FC<selectableChatCardProps> = ({
    name,
    avatar,
    onClickHandler
}) => {

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        onClickHandler(isChecked);
    }, [isChecked]);

    return (
        <div className='selectable-card' onClick={() => setIsChecked(!isChecked)}>
            <div className='selectable-card-info'>

                <div className='selectable-card-avatar'>
                    {!avatar ? profile : <img src={avatar} />}
                </div>

                <div className="selectable-card-name">
                    {name}
                </div>
            </div>
            <div className="check-box">
                <CheckBox
                    setIsChecked={setIsChecked}
                    label=''
                    isChecked={isChecked}
                />
            </div>
        </div >
    )
}
export default SelectableChatCard;