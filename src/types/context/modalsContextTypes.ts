import { Dispatch, SetStateAction } from "react";

export type moveWorkerData = {
  employeeId: number,
  newLeaderId: number,
  team: boolean
}

export type modals = {
  hireWorkerModalIsOpen: boolean,
  setHireWorkerModalIsOpen: Dispatch<SetStateAction<boolean>>,
  companisListModalIsOpen: boolean,
  setCompanisListModalIsOpen: Dispatch<SetStateAction<boolean>>,
  createCompanyIsOpen: boolean,
  setCreateCompanyIsOpen: Dispatch<SetStateAction<boolean>>,
  hireWorkerLeader: number,
  setHireWorkerLeader: Dispatch<SetStateAction<number>>,
  fireWorkerIsOpen: boolean,
  setFireWorkerIsOpen: Dispatch<SetStateAction<boolean>>,
  fireWorkerId: number,
  setFireWorkerId: Dispatch<SetStateAction<number>>,
  moveWorkerIsOpen: boolean,
  setMoveWorkerIsOpen: Dispatch<SetStateAction<boolean>>,
  moveWorkerConfirmationIsOpen: boolean,
  setMoveWorkerConfirmationIsOpen: Dispatch<SetStateAction<boolean>>,
  moveWorkerData: moveWorkerData,
  setMoveWorkerData: Dispatch<SetStateAction<moveWorkerData>>,
  createGroupChatIsOpen: boolean,
  setCreateGroupChatIsOpen: Dispatch<SetStateAction<boolean>>,
  chatSearchInput: string,
  setChatSearchInput: Dispatch<SetStateAction<string>>
}

export type modalsProviderProps = {
  children: React.ReactNode
}
