import { userMessageType } from "./messagesTypes"



export type popupCoordsType = {
  coords: {
    x: number,
    y: number
  }
}


export type popupAdditionDataType = {
  ownerName: string, text: string, time: string, fileExist: boolean
}

export enum actions {
  REPLY = 'REPLY',
  EDIT = 'EDIT',
  COPY = 'COPY',
  SEND = 'SEND',
  DELETE = 'DELETE'
}

export type actionType = {
  actionType: actions,
  messageId: number | undefined
}

export type actionBannerProps = { text: string, sender: string, }

export type updateAction = (actionType: actions, messageId: number | undefined) => void
