import './createGroupChat.scss';
import { useContext, useEffect, useState } from 'react';

import Modal from '../../../components/general/modal/modal';
import { ModalsContext } from '../../../context/modalsContext';

import SelectableChatCard from '../../../components/chat/selectableChatCard/selectableChatCard';
import InputField from "../../../components/general/inputField/inputField";
import SubmitButton from "../../../components/general/submitButton/submitButton";
import { employee } from '../../../assets/Icons';


const CreateGroupChat = () => {
    const { createGroupChatIsOpen, setCreateGroupChatIsOpen } = useContext(ModalsContext);
    const [ groupName, setGroupName ] = useState('');
    
    const [ selectedEmployees, setSelectedEmployees ] = useState<number[]>([]);

    console.log(selectedEmployees)
    const closeModal = () => {
        setCreateGroupChatIsOpen(false);
    }

    const selectUserHandler = (employeeId: number, checked: boolean) => {
        if(checked){
            setSelectedEmployees([...selectedEmployees, employeeId])
        }else{
            setSelectedEmployees([...selectedEmployees.filter((element) => element !== employeeId)])
        }
    }

    return (
        <Modal
            closeModal={closeModal}
            open={createGroupChatIsOpen}
            additionalClass='create-group-chat' 
        >
            <p className="create-group-chat-title">Create new group chat</p>

            <form className="create-group-chat-container">
                <div className="create-group-chat-input-container">
                    <InputField
                        placeholder=''
                        name='name'
                        type='text'
                        value={groupName}
                        label='Name'
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    <InputField
                        placeholder=''
                        name='name'
                        type='text'
                        value={groupName}
                        label='Participants'
                        isSearch={true}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </div>
                <div className="create-group-chat-workers-container">
                    <SelectableChatCard
                        name='some'
                        avatar={undefined}
                        onClickHandler={(isChecked: boolean) => selectUserHandler(1, isChecked)}
                    />
                    <SelectableChatCard
                        name='some'
                        avatar={undefined}
                        onClickHandler={(isChecked: boolean) => selectUserHandler(1, isChecked)}
                    />
                    <SelectableChatCard
                        name='some'
                        avatar={undefined}
                        onClickHandler={(isChecked: boolean) => selectUserHandler(1, isChecked)}
                    />
                    <SelectableChatCard
                        name='some'
                        avatar={undefined}
                        onClickHandler={(isChecked: boolean) => selectUserHandler(1, isChecked)}
                    />
                    <SelectableChatCard
                        name='some'
                        avatar={undefined}
                        onClickHandler={(isChecked: boolean) => selectUserHandler(1, isChecked)}
                    />
                    <SelectableChatCard
                        name='some'
                        avatar={undefined}
                        onClickHandler={(isChecked: boolean) => selectUserHandler(1, isChecked)}
                    />
                    <SelectableChatCard
                        name='some'
                        avatar={undefined}
                        onClickHandler={(isChecked: boolean) => selectUserHandler(1, isChecked)}
                    />
                    <SelectableChatCard
                        name='some'
                        avatar={undefined}
                        onClickHandler={(isChecked: boolean) => selectUserHandler(1, isChecked)}
                    />
                    <SelectableChatCard
                        name='some'
                        avatar={undefined}
                        onClickHandler={(isChecked: boolean) => selectUserHandler(1, isChecked)}
                    />

                </div>
                <div className="create-group-chat-submit-container">
                    <SubmitButton text="Create" />
                </div>
            </form>

        </Modal>
    )

}

export default CreateGroupChat;