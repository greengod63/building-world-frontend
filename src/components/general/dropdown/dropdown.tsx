import { FC, ReactNode, useEffect, useRef, useState } from "react";
import './dropdown.scss'
import { DropDownType } from "../../../types/general/generalTypes";
import { dropdownIcon, tickIcon } from "../../../assets/pipelineIcons";

const Dropdown: FC<DropDownType> = ({
    icon,
    text,
    options,
    pipelineOptions = [],
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(text);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleDropdownClick = () => setIsOpen(!isOpen);

    return (
        <div className="dropdown" ref={dropdownRef}  onClick={handleDropdownClick}>
            <div className="dropdown-header">
                <div className="dropdown-header-main-icon">{icon as ReactNode}</div>
                <p className="selected-option">{selectedOption ?? text}</p>
                <div className="dropdown-header-icon">{dropdownIcon}</div>
            </div>

            <div className={`dropdown-options-container ${!isOpen ? "" : "open"}`}>
                <div className="dropdown-main-options">
                    <div className="selected-option">
                        <div className="selected-option-text">{selectedOption}</div>
                        <div className="selected-option-icon">
                            {tickIcon}
                        </div>
                    </div>
                    {
                        pipelineOptions.map((pipeline: string) =>
                            <div className="dropdown-options"
                                key={pipeline}
                                onClick={() => handleOptionClick(pipeline)}
                            >{pipeline}</div>
                        )
                    }
                </div>
                <div className="dropdown-actions-options">
                    {options.map((option) => (
                        <div className="dropdown-action-option">
                            <div className="dropdown-action-option-icon">{option.icon}</div>
                            <p className="dropdown-action-option-text" >
                                {option.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;

