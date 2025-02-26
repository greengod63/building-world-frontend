import { hierarchyItem } from './generalTypes';

export type hierarchyUserCardProps = {
    employee: hierarchyItem,
    inTeam: boolean,
    hierarchy: hierarchyItem[][],
    setHierarchy: React.Dispatch<React.SetStateAction<hierarchyItem[][]>>,
    isActive: boolean,
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
    hierarchyLevel: number,
    setHierarchyLevel: React.Dispatch<React.SetStateAction<number>>,
    currentLevel: number,
    index: number
}
