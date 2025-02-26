import { actions, actionType } from './../chats/actionsType';
import { Dispatch, SetStateAction } from "react";
import { userMessageType } from '../chats/messagesTypes';
import { chatMembersType } from '../chats/generalTypes';
import { chatInfoType } from '../chats/chatInfoSliderTypes';

export type contextMenuType = {
  display: boolean,
  coords: {
    x: number,
    y: number
  },
  message: userMessageType
}

export type chat = {
  chatId: number | undefined,
  setChatId: Dispatch<SetStateAction<number | undefined>>,
  messages: userMessageType[],
  setMessages: Dispatch<SetStateAction<userMessageType[]>>,
  contextMenu: contextMenuType | null,
  setContextMenu: Dispatch<SetStateAction<contextMenuType | null>>,
  actionType: actionType,
  setActionType: Dispatch<SetStateAction<actionType>>,
  chatMembers: chatMembersType[],
  setChatMembers: Dispatch<SetStateAction<chatMembersType[]>>,
  chatInfoSliderIsOpened: boolean,
  setChatInfoSliderIsOpened: Dispatch<SetStateAction<boolean>>,
  chatInfo: chatInfoType,
  setChatInfo: Dispatch<SetStateAction<chatInfoType>>
}

export type chatProviderProps = {
  children: React.ReactNode
}
