import { SetStateAction } from "react"
import { Project } from "../project/projectTypes"

export type projectContextType = {
    projectsList: Project[],
    setProjectsList: React.Dispatch<SetStateAction<Project[]>>
    uniqueStages: string[] | undefined,
    setUniqueStages: React.Dispatch<SetStateAction<string[] | undefined>>
} 