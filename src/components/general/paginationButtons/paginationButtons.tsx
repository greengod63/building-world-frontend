import { FC } from "react";
import './paginationButtons.scss';
import { paginationButtonsProps } from '../../../types/general/generalTypes'

const PaginationButtons: FC<paginationButtonsProps> = ({ number, setNum }) => {
    return (
        <button className="pagination-button" onClick={()=>{setNum(number)}}>
            {number}
        </button>
    );
};

export default PaginationButtons;