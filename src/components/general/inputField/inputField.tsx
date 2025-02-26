import './inputField.scss';
import { FC } from 'react';

import { inputFieldProps } from '../../../types/general/generalTypes';
// import { BiSearch } from "react-icons/bi"; //!!!!

const InputField: FC<inputFieldProps> = ({
  type,
  name,
  value,
  isSearch = false,
  placeholder,
  label = null,
  onChange,
  onBlur,
  ...addtionalProps
}) => {
  return (
    label ?
      <div className="input-field-input">
        <label htmlFor={name}>{label}</label>
        <div className="input-field-container">
          <input type={type} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} name={name} {...addtionalProps} />
          {/* {isSearch ? <BiSearch className="textfield-searc-icon" size={"1.45vw"} /> : null} */}
        </div>
      </div>
      :
      <div className="input-field-container">
        <input type={type} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} name={name} {...addtionalProps} />
        {/* {isSearch ? <BiSearch className="textfield-searc-icon" size={"1.45vw"} /> : null} */}
      </div>

  )
}

export default InputField;
