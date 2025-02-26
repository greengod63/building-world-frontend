import { FC, useContext } from 'react';
import './fireWorker.scss'
import { ModalsContext } from '../../../context/modalsContext';
import { fireEmployeeUrl } from '../../../utils/network';
import { authorizedRequest } from '../../../utils/queries';
import ConfirmationModal from '../../general/confirmationModal/confirmationModal';

const FireWorker: FC = () => {

    const { fireWorkerId, setFireWorkerId, fireWorkerIsOpen , setFireWorkerIsOpen } = useContext(ModalsContext);

    const closeModal = (): void => {
        setFireWorkerIsOpen(false);
        setFireWorkerId(-1);
    }

    const fireWorker = (): void => {
        authorizedRequest(fireEmployeeUrl, 'DELETE', 'accessToken', {
            employee_id: fireWorkerId
        }).then((responce) => {
            console.log(responce);
        })
    }

    return (
        <ConfirmationModal title='Fire this employee?' buttons={[{text: 'Yes', onClickHandler: fireWorker}, {text: 'No', onClickHandler: closeModal}]} isOpen={fireWorkerIsOpen} setIsOpen={setFireWorkerIsOpen} />
    )
}
export default FireWorker;