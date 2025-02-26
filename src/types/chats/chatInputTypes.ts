import { chatMessageType, userMessageType } from './messagesTypes';
import { actionType, actions, updateAction } from './actionsType';

export type chatInputProps = {
  submitMessage: (action: actions, body: userMessageType) => void,
  messages: chatMessageType[]
}
