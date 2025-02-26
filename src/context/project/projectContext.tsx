import { FC, useEffect, useState } from 'react'
import { createContext } from 'react';
import { projects } from '../../pages/pipeline/pipelineMockData'
import { projectContextType } from '../../types/context/projectContextTypes';
import { childrenProps } from '../../types/general/generalTypes';

export const ProjectContext = createContext({
    setProjectsList: () => null,
    projectsList: [],
    setUniqueStages: () => null,
    uniqueStages: [],
} as projectContextType)

const ProjectProvider: FC<childrenProps> = ({ children }) => {
    const [projectsList, setProjectsList] = useState(projects);
    const [uniqueStages, setUniqueStages] = useState<string[]>();

    useEffect(() => {
        const stages = Array.from(new Set((projectsList.map((project) => project.stage))));
        setUniqueStages(stages);
    }, [projectsList])

    const value = { projectsList, setProjectsList, uniqueStages, setUniqueStages };

    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectProvider
