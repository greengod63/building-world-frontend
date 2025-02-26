import { useState } from "react"
import CheckBox from "../../../general/checkBox/checkBox";
import './projectDetailRow.scss'

const ProjectDetailRow = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className='row'>
            <div className='cell check-box'>
                <CheckBox
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                    label=""
                />
            </div>
            <div className='cell title'>Title</div>
            <div className='cell value'>Value</div>
            <div className='cell org'>Organisation</div>
            <div className='cell cp'>Contact person</div>
            <div className='cell ecd'>Expected close date</div>
            <div className='cell nad'>Next activity day</div>
            <div className='cell owner'>Owner</div>
        </div>
    )
}

export default ProjectDetailRow
