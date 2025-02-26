import CheckBox from '../../general/checkBox/checkBox';
import './projectsTableView.scss';
import ProjectDetailRow from './projectDetailRow/projectDetailRow';
import { useState } from 'react';

const ListProjectsView = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className='list-project-view'>
            <div className='table'>
                <div className='head'>
                    <div className='head-row'>
                        <div className='head-cell check-box'>
                            <CheckBox
                                isChecked={isChecked}
                                setIsChecked={setIsChecked}
                                label=""
                            />
                        </div>
                        <div className='head-cell title'>Title</div>
                        <div className='head-cell value'>Value</div>
                        <div className='head-cell org'>Organisation</div>
                        <div className='head-cell cp'>Contact person</div>
                        <div className='head-cell ecd'>Expected close date</div>
                        <div className='head-cell nad'>Next activity day</div>
                        <div className='head-cell owner'>Owner</div>

                    </div>
                </div>
                <div className='body'>
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                    <ProjectDetailRow />
                </div>
            </div>
        </div>
    )
}

export default ListProjectsView
