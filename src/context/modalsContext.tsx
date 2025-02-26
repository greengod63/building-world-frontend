import { createContext, useState, FC } from "react";
import { modals, modalsProviderProps, moveWorkerData } from '../types/context/modalsContextTypes';

export const ModalsContext = createContext<modals>({} as modals);


const ModalsProvider: FC<modalsProviderProps> = ({ children }) => {
  const [hireWorkerModalIsOpen, setHireWorkerModalIsOpen] = useState(false);
  const [companisListModalIsOpen, setCompanisListModalIsOpen] = useState(false);
  const [createCompanyIsOpen, setCreateCompanyIsOpen] = useState(false);
  const [hireWorkerLeader, setHireWorkerLeader] = useState(-1);
  const [fireWorkerIsOpen, setFireWorkerIsOpen] = useState(false);
  const [fireWorkerId, setFireWorkerId] = useState(-1);
  const [moveWorkerIsOpen, setMoveWorkerIsOpen] = useState(false);
  const [moveWorkerConfirmationIsOpen, setMoveWorkerConfirmationIsOpen] = useState(false);
  const [moveWorkerData, setMoveWorkerData] = useState<moveWorkerData>({ employeeId: -1, newLeaderId: -1, team: false });

  const [createGroupChatIsOpen, setCreateGroupChatIsOpen] = useState(false);

  const [chatSearchInput, setChatSearchInput] = useState('')

  return (
    <ModalsContext.Provider value={{
      hireWorkerModalIsOpen,
      setHireWorkerModalIsOpen,
      companisListModalIsOpen,
      setCompanisListModalIsOpen,
      createCompanyIsOpen,
      setCreateCompanyIsOpen,
      hireWorkerLeader,
      setHireWorkerLeader,
      fireWorkerIsOpen,
      setFireWorkerIsOpen,
      fireWorkerId,
      setFireWorkerId,
      moveWorkerIsOpen,
      setMoveWorkerIsOpen,
      moveWorkerConfirmationIsOpen,
      setMoveWorkerConfirmationIsOpen,
      moveWorkerData,
      setMoveWorkerData,
      createGroupChatIsOpen,
      setCreateGroupChatIsOpen,
      chatSearchInput,
      setChatSearchInput
    }}>
      {children}
    </ModalsContext.Provider>
  )
}

export default ModalsProvider;
