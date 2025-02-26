import { FC, useContext, useEffect, useState } from 'react';
import './pipelineSection.scss';
import { PipelineSectionType } from '../../../types/pipeline/pipelineTypes'
import ProjectCard from './projectCard/projectCard'
import { profile } from '../../../assets/Icons'
import { ProjectContext } from '../../../context/project/projectContext';

const PipelineSection: FC<PipelineSectionType> = ({ pipelineTitle }) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalProjects, setTotalProjects] = useState(0);
    const { projectsList } = useContext(ProjectContext)

    useEffect(() => {
        const projectDetails = projectsList.reduce((acc, project) => {
            if (project.stage === pipelineTitle) {
                acc['totalAmount'] = acc['totalAmount'] + project.amount;
                acc['totalProjects'] = acc['totalProjects'] + 1
            }
            return acc
        }, { totalAmount: 0, totalProjects: 0 })
        setTotalAmount(projectDetails['totalAmount']);
        setTotalProjects(projectDetails['totalProjects']);
    }, [projectsList])

    return (
        <div className='pipeline-projects-container'>
            <div className="pipeline-header-title">
                {pipelineTitle}
            </div>
            <div className="pipeline-project-info">
                {totalAmount}.000 $ - {totalProjects} deals
            </div>
            <div className="pipeline-projects">
                {projectsList.map(({ title, id, organisation, amount, stage }) => {
                    return (
                        stage === pipelineTitle &&
                        <ProjectCard
                            id={id}
                            key={id}
                            title={title}
                            organisation={organisation}
                            avatar={profile}
                            amount={amount}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default PipelineSection
