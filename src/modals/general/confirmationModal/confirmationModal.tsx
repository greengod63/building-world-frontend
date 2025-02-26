import { FC } from 'react';
import './confirmationModal.scss'
import SubmitButton from '../../../components/general/submitButton/submitButton';
import Modal from '../../../components/general/modal/modal';
import { buttonType, confirmationModalProps } from '../../../types/general/generalTypes';

const ConfirmationModal: FC<confirmationModalProps> = ({ title, buttons, isOpen, setIsOpen }) => {

    const closeModal = (): void => {
        setIsOpen(false);
    }

    return (
        <Modal
            closeModal={closeModal}
            closeButton={false}
            open={isOpen}
            additionalClass='confirmation-modal'
        >
            <p className="confirmation-modal-title">{title}</p>
            <div className="confirmation-modal-buttons">
                {
                    buttons.map(({text, onClickHandler}) => 
                        <SubmitButton type={buttonType.button} text={text} onClick={() => {
                            onClickHandler();
                        }}/>
                    )
                }
            </div>
        </Modal>
    )
}
export default ConfirmationModal;