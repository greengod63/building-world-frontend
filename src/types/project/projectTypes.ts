import { ReactNode, SetStateAction } from "react"

export type Project = {
    id: number,
    title: string,
    organisation: string,
    amount: number,
    stage: string
}

export type ProjectCardProps = {
    id: number,
    title: string,
    organisation: string,
    amount: number,
    avatar: React.SVGAttributes<ReactNode>
}