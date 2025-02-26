import './chatInput.scss'
import { FC, useContext, useEffect, useState } from 'react'
import ActionBanner from './actionBanner/actionBanner'
import { chatInputProps } from '../../../../types/chats/chatInputTypes'
import { userMessageType, messageTypes, messageStatus } from '../../../../types/chats/messagesTypes'
import { actions } from '../../../../types/chats/actionsType'
import ChatAudioRecorder from './chatAudioRecorder/chatAudioRecorder'
import ChatInputMessage from './chatInputMessage/chatInputMessage'
import { ChatContext } from '../../../../context/chat/chatContext'

const ChatInput: FC<chatInputProps> = ({ submitMessage, messages }) => {
  // State variables
  // Determines whether the edit component is currently displayed
  // const [displayEditComponent, setDisplayEditComponent] = useState(true);

  const { actionType, setActionType, chatMembers } = useContext(ChatContext)

  // Stores the current value of the chat input field
  const [chatInputValue, setChatInputValue] = useState('');

  // // Indicates whether the user is currently recording audio
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);

  // // Stores the recorded audio data in the form of a Blob object and the length of the audio clip
  const [recordingAudioBlob, setRecordingAudioBlob] = useState<{ recordingAudioBlob: Blob, audioLength: string } | null>(null);


  const actionMessageIndex = messages.findIndex((item) => item.messageId === actionType.messageId);
  const actionMessage = messages[actionMessageIndex];

  const sender = chatMembers[chatMembers.findIndex((member) => member.employeeId === actionMessage?.senderId)];

  // Function to close edit popup
  // const handleCloseEditPopup = () => {
  //   setDisplayEditComponent(!displayEditComponent)
  //   changeEditMessage('', null, null, null)
  // }

  // // Function to change recording state
  // const changeIsRecording = (isRec: boolean) => {
  //   setIsRecordingAudio(isRec)
  // }

  // Function to add audio blob to state
  const handleAddAudioBlob = (audioBlob: Blob | null, audioLength: string | null) => {
    if (audioBlob && audioLength) {
      setRecordingAudioBlob({ recordingAudioBlob: audioBlob, audioLength })
    } else {
      setRecordingAudioBlob(null)
    }
  }

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | null = null) => {
    // Prevent page from refreshing on form submission
    e?.preventDefault();

    // If chat input has text, add message to state
    if (chatInputValue.length > 0) {
      // Create message body
      const body: userMessageType = {
        messageId: undefined,
        type: messageTypes.USER,
        senderId: undefined,
        date: new Date(),
        text: chatInputValue,
        file: [],
        edited: false,
        forwarded: null,
        replied: null,
        status: messageStatus.SENDING,
        block: null
      }

      // If there is a reply action, add forwarded message data to message body
      if (actionType.actionType === actions.REPLY && actionType.messageId) {
        body.replied = {
          toMessageId: actionType.messageId,
          message: actionMessage.text
        }
        submitMessage(actions.REPLY, body)
      }
      // If there is an edit action, edit the corresponding message in state
      else if (actionType.actionType === actions.EDIT) {
        body.messageId = actionMessage.messageId
        body.edited = true
        body.text = chatInputValue
        submitMessage(actions.EDIT, body)
      }
      // Otherwise, just add the message to state
      else {
        submitMessage(actions.SEND, body)
      }


      setChatInputValue('')
      setActionType({ actionType: actions.SEND, messageId: undefined })
      // authorizedRequest(sendChatMessageUrl('1', chatInputValue), "POST", 'accessToken', body).then((_) => setChatInputValue(''))
      // sendChatMessage('1', chatInputValue).then((_) => setChatInputValue(''))

      // If audio has been recorded, add audio message to state
      if (recordingAudioBlob) {
        // Create audio message body
        const body: userMessageType = {
          messageId: undefined,
          type: messageTypes.USER,
          senderId: undefined,
          date: new Date(),
          text: '',
          file: [{ file: recordingAudioBlob.recordingAudioBlob, fileName: '', fileType: 'audio' }],
          edited: false,
          forwarded: null,
          replied: null,
          status: messageStatus.SENDING,
          block: null
        }
        submitMessage(actions.SEND, body)
        // Clear audio blob and chat input value, and reset edit message state
        setRecordingAudioBlob(null)
        setChatInputValue('')
        setActionType({ actionType: actions.SEND, messageId: undefined })
      }
    }
  }

  // // Set empty chat input value if there is a popup reply action
  // useEffect(() => {
  //   if(popupActionType.value !== null && popupActionType.actionType !== 'Reply') {
  //     setChatInputValue(popupActionType.value)
  //   }
  // }, [popupActionType.value])
  console.log(actionType)

  return (
    <form onSubmit={handleSubmit} className='chat-input-wrapper'>
      <ActionBanner text={actionMessage ? actionMessage.text : ''} sender={sender && sender.name ? sender.name : ''} />
      <div className={`chat-input-container ${actionType.actionType !== actions.SEND ? 'chat-input-container-action' : ''}`}>

        {isRecordingAudio
          ? <ChatAudioRecorder handleSubmit={handleSubmit} isRecordingAudio={isRecordingAudio} setIsRecordingAudio={setIsRecordingAudio} handleAddAudioBlob={handleAddAudioBlob} />
          : <ChatInputMessage chatInputValue={chatInputValue} setChatInputValue={setChatInputValue} setIsRecordingAudio={setIsRecordingAudio} />}
      </div>
    </form>
  );
};

export default ChatInput;
