import { DragEvent, FC, ReactNode, useContext, useEffect, useState } from 'react';
import './projectCard.scss'
import { ProjectCardProps } from '../../../../types/project/projectTypes'
import { forwardIcon } from '../../../../assets/pipelineIcons'
import { ProjectContext } from '../../../../context/project/projectContext';

const ProjectCard: FC<ProjectCardProps> = ({ id, title, organisation, amount, avatar }) => {

    const [dragItem, setDragItem] = useState<EventTarget | null>(null);
    const { projectsList, setProjectsList } = useContext(ProjectContext)

    useEffect(() => {

        const dragOverHandler = (event: Event) => {
            event.preventDefault();
            const target = event.target as HTMLElement;
            target.classList.add('hovered')
        }

        const dragLeave = (event: Event) => {
            const target = event.target as HTMLElement;
            target.classList.remove('hovered')
        }

        const dragDrop = (event: Event) => {
            const target = event.target as HTMLElement;
            target.classList.remove('hovered')
            const dropArea = document.querySelector('.pipeline-project-actions-container');
            if (dropArea) dropArea.className = 'pipeline-project-actions-container'
            if (dragItem && (dragItem as HTMLDivElement)?.id) {
                const updatedProducts = projectsList.filter((project) => project.id !== parseInt((dragItem as HTMLDivElement).id));
                setProjectsList(updatedProducts);
                setDragItem(null)
            }
        }

        const dropAreas = document.querySelectorAll('.drag-drop-section');
        dropAreas.forEach((dropArea: Element) => {
            dropArea.addEventListener('dragover', dragOverHandler);
            dropArea.addEventListener('dragleave', dragLeave);
            dropArea.addEventListener('drop', dragDrop);
        })

        return () => {
            dropAreas.forEach((dropArea: Element) => {
                dropArea.removeEventListener('dragover', dragOverHandler);
                dropArea.removeEventListener('dragleave', dragLeave);
                dropArea.removeEventListener('drop', dragDrop);
            });
        };
    }, [dragItem]);

    const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
        setDragItem(event.target);
        const dropArea = document.querySelector('.pipeline-project-actions-container');
        if (dropArea) dropArea.className = 'pipeline-project-actions-container show';
        const target = event.target as HTMLElement;
        setTimeout(() => {
            target.className = 'hidden'
        }, 0)
    };

    const handleDragEnd = (event: DragEvent<HTMLDivElement>) => {
        event.currentTarget.className = 'project-card';
        const dropArea = document.querySelector('.pipeline-project-actions-container');
        if (dropArea) dropArea.className = 'pipeline-project-actions-container'
    };

    return (
        <div className='project-card'
            id={`${id}`}
            draggable={true}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="project-info">
                <div className="title">
                    {title}
                </div>
                <div className="organisation">
                    {organisation}
                </div>
                <div className="amount">
                    {amount}.000 $
                </div>
            </div>
            <div className="project-actions">
                <div>
                    {avatar as ReactNode}
                </div>
                <div className="forward-icon">
                    {forwardIcon}
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
