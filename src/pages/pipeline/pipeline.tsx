import './pipeline.scss'
import SubmitButton from '../../components/general/submitButton/submitButton'
import { addPipelineIcon, forcastIcon, listPipelineIcon, pipelineIcon } from '../../assets/pipelineIcons'
import DropDown from '../../components/general/dropdown/dropdown'
import PipelineSection from '../../components/pipeline/pipelineSection/pipelineSection'
import { useContext, useEffect, useState } from 'react';
import ListProjectsView from '../../components/pipeline/projectsTableView/projectsTableView'
import PipelineLayout from '../../layouts/pipelineLayout/pipelineLayout'
import { ProjectContext } from '../../context/project/projectContext';

const Pipeline = () => {
    const [activePipelineSection, setActivePipelineSection] = useState('pipeline');
    const { projectsList, uniqueStages } = useContext(ProjectContext)
    const pipelineActionOptions = [{ icon: addPipelineIcon, value: 'new-pipeline', text: 'New pipeline' }]

    const [totalAmount, setTotalAmount] = useState(0);
    const [totalProjects, setTotalProjects] = useState(0);

    useEffect(() => {
        const projectDetails = projectsList.reduce((acc, project) => {
            acc['totalAmount'] = acc['totalAmount'] + project.amount;
            acc['totalProjects'] = projectsList.length;
            return acc
        }, { totalAmount: 0, totalProjects: 0 })
        setTotalAmount(projectDetails['totalAmount']);
        setTotalProjects(projectDetails['totalProjects']);
    }, [projectsList])

    const handleIconClick = (view: string) => setActivePipelineSection(view)

    const pipelineOptions = ['Integration', 'Testing', ' Build', 'Deployment']

    return (
        <PipelineLayout>
            <div className="pipeline-wrapper">
                <div className="pipeline-page-title">
                    Deals
                </div>

                <div className="pipeline-page-header">
                    <div className="left">
                        <div className="layout-options">
                            <div className={`pipeline-projects-box ${activePipelineSection === "pipeline" ? 'active' : ''}`} onClick={() => handleIconClick("pipeline")}>
                                {pipelineIcon}
                            </div>
                            <div className={`pipeline-projects-list ${activePipelineSection === "list" ? 'active' : ''}`} onClick={() => handleIconClick("list")}>
                                {listPipelineIcon}

                            </div>
                            <div className={`pipeline-projects-forcast ${activePipelineSection === "forecast" ? 'active' : ''}`} onClick={() => handleIconClick("forecast")}>
                                {forcastIcon}
                            </div>
                        </div>
                        <SubmitButton text="Add Deal" />
                    </div>
                    <div className="middle">

                        <div className="projects-info">
                            {totalAmount}.000 $ - {totalProjects} deals
                        </div>

                    </div>
                    <div className="right">

                        <div className="pipeline-dropdown">
                            <DropDown
                                text='Pipeline'
                                pipelineOptions={pipelineOptions}
                                icon={pipelineIcon}
                                options={pipelineActionOptions} />
                        </div>

                        <div className="user-dropdown">
                            <DropDown text='Ahmad Vetrovs' pipelineOptions={pipelineOptions} icon={pipelineIcon} options={pipelineActionOptions} />
                        </div>
                    </div>
                </div>
                {(activePipelineSection === "pipeline") &&
                    <div className="projects-section">
                        {
                            uniqueStages?.map((stage) => {
                                return <PipelineSection pipelineTitle={stage} />
                            })
                        }
                    </div>
                }
                {(activePipelineSection === "list") &&
                    <div className="list-section">
                        <ListProjectsView />
                    </div>
                }
                <div className="pipeline-project-actions-container">
                    <div className='drag-drop-section delete-project'>Delete</div>
                    <div className='drag-drop-section fail-project'>Failed</div>
                    <div className='drag-drop-section success-project'>Success</div>
                    <div className='drag-drop-section move-to-project'>Move to</div>
                </div>
            </div>
        </PipelineLayout>
    )
}

export default Pipeline
