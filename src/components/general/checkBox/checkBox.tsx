import './checkBox.scss'
import { checkBoxProps } from "../../../types/general/generalTypes";
import { FC } from 'react';

const CheckBox: FC<checkBoxProps> = ({
    isChecked=false,
    setIsChecked,
    label
}) => {
  const check = () => setIsChecked(!isChecked)

  return (
    <div className="checkbox-container">
      <div className="checkbox" onClick={check}>
        <span className={isChecked ? "checked" : "unchecked"}></span>
      </div>
      <p className='checkbox-label' onClick={() => setIsChecked(!isChecked)}>{label}</p>
    </div>
  );
};

export default CheckBox;
