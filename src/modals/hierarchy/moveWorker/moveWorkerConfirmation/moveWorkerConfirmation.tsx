import { FC, useContext } from "react";
import ConfirmationModal from '../../../general/confirmationModal/confirmationModal';
import { ModalsContext } from '../../../../context/modalsContext';
import { authorizedRequest } from '../../../../utils/queries';
import { moveWorkerUrl } from '../../../../utils/network';

const MoveWorkerConfirmation: FC = () => {
    const { moveWorkerConfirmationIsOpen, setMoveWorkerConfirmationIsOpen, moveWorkerData, setMoveWorkerData } = useContext(ModalsContext);
    
    const companyId = parseInt(localStorage.getItem('companyId') || '-1');

    const approveHandler = (withTeam: boolean) => {
        authorizedRequest(moveWorkerUrl(companyId, moveWorkerData.employeeId), 'PATCH', 'accessToken', { new_leader_id: moveWorkerData.newLeaderId, move_with_team: withTeam })
    }
    

    const closeModal = () => {
        setMoveWorkerConfirmationIsOpen(false);
        setMoveWorkerData({employeeId: -1, newLeaderId:-1, team: false});
    }

    const buttons = moveWorkerData.team ? 
    [{text: 'Yes', onClickHandler: () => {approveHandler(true)} }, {text: 'No', onClickHandler: () => {approveHandler(false)} }, {text: 'Cancel', onClickHandler: closeModal}] 
    : 
    [{text: 'Yes', onClickHandler: () => {approveHandler(true)} }, {text: 'No', onClickHandler: closeModal }]


    return <ConfirmationModal title={ !moveWorkerData.team ? 'Move the employee?' : 'Move the employee with their team?'} buttons={buttons} isOpen={moveWorkerConfirmationIsOpen} setIsOpen={setMoveWorkerConfirmationIsOpen}/>
}

export default MoveWorkerConfirmation;