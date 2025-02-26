import { submitbuttonProps } from '../../../types/general/generalTypes'
import './submitButton.scss'
import { FC } from 'react';

const SubmitButton: FC<submitbuttonProps> = ({ text, type, onClick, }) => {
  return (
    <button className="submit-button" type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default SubmitButton;
