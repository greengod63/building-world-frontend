import { userMessageType } from "./messagesTypes";

export type audioWaveProps = {
  height: number;
}

export type chatAudioRecorderProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement> | null) => void,
  isRecordingAudio: boolean,
  setIsRecordingAudio: React.Dispatch<React.SetStateAction<boolean>>,
  handleAddAudioBlob: (audioBlob: Blob | null, audioLength: string | null) => void,
}
export type chatAudioPlayerProps = {
  audioBlobUrl: Blob,
  setPlayingAudioTime?:(time: number) => void
}
export type chatAudioMessageProps = {
  message: userMessageType,
  needToDisplayMiniPopupWithoutFile: () => JSX.Element | null,
  needToDisplayForwardMessage: () => JSX.Element | null,
  needToDisplayEdditedMessage: () => JSX.Element | null,
  handleRightClick: (e: React.MouseEvent<HTMLDivElement>) => void
}
export type ChatFileMessageProps = {
  message: userMessageType,
  needToDisplayMiniPopup: () => JSX.Element | null,
  needToDisplayForwardMessage: () => JSX.Element | null,
  needToDisplayEdditedMessage: () => JSX.Element | null,
  handleRightClick: (e: React.MouseEvent<HTMLDivElement>) => void
}
export type chatTimerProps = {
  timer: number,
  isRec: boolean,
  blob: Blob
}

export type chatTextMessageProps = {
  message: userMessageType,
  needToDisplayMiniPopupWithoutFile: () => JSX.Element | null,
  needToDisplayForwardMessage: () => JSX.Element | null,
  needToDisplayEdditedMessage: () => JSX.Element | null,
  handleRightClick: (e: React.MouseEvent<HTMLDivElement>) => void
}


export type chatInputMessageProps = {
  chatInputValue: string,
  setChatInputValue: (value: string) => void,
  setIsRecordingAudio: React.Dispatch<React.SetStateAction<boolean>>,
}