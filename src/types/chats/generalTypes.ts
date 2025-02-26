
import { popupAdditionDataType } from "./actionsType";
import { chatMessageType } from "./messagesTypes";
import { actions, updateAction } from "./actionsType";
import { userMessageType } from "./messagesTypes";

export type forwardMessageProps = {
  forwarded: {
    from: string,
    message: string,
  }
}

export type chatMessagePropsType = {
  // handleDisplayPopup: (ownerName: string, text: string, time: string, fileExist: boolean) => void,
  // additionalDataForPopup: popupAdditionDataType | null,
  // delay: number,
  // needToAnimateBlock: {messageId: number | null | undefined, firstLoad: boolean},
  // messagesScrollHeight: React.RefObject<HTMLDivElement>,
  message: userMessageType;
}

export type messageAreaProps = {
  messageAreaContainer: React.RefObject<HTMLDivElement> | null,
  scrollHandler: () => void,
  // blocksCount: number,
  loading: boolean,
  messages: chatMessageType[],
  date: Date | null
}

export type chatByIdResponse = {
  ok: boolean,
  description: string,
  result: {
    from: {
      employee_id: number,
      user_id: number,
      position: string,
      name: string,
      avatar: string | null,
    },
    peer: {
      employee_id: number,
      user_id: number,
      position: string,
      name: string,
      avatar: string | null,
    },
    date: number,
    chat_id: number,
    company_id: number,
    title: string | null,
    owner_id: number | null,
    description: string | null,
    type: string,
    from_id: number,
    peer_id: number
  }
}
export type selectableChatCardProps = {
  name: string,
  avatar: string | null | undefined,
  onClickHandler: Function
}

export type chatInputProps = {
  changeEditMessage: (actionType: string, value: string | null, from: string | null, messageId: string | null) => void,
  action: actions,
  handleMessages: (action: string, body: chatMessageType) => void,
  messages: chatMessageType[]
}

export type chatMembersType = {
  employeeId: number,
  avatar: string | null,
  name: string
}