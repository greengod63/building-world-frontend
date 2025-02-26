import { FC } from 'react'
import { clip, microphone, sendMessageIcon } from '../../../../../assets/chatIcons'
import { chatInputMessageProps } from '../../../../../types/chats/audioMessageType'

const ChatInputMessage: FC<chatInputMessageProps> = ({ chatInputValue, setChatInputValue, setIsRecordingAudio }) => {
  return (
    <>
      <div className='tools'>
        {clip}
      </div>
      <input type="text" placeholder='Message' className='chat-input' value={chatInputValue} onChange={(e) => { setChatInputValue(e.target.value) }} />

      {chatInputValue.length === 0
        ? <div className='tools tools-microphone' onClick={() => { setIsRecordingAudio(true) }}>
          {microphone}
        </div>
        : <div className='tools tools-microphone tools-send-message' >
          {sendMessageIcon}
        </div>
      }
    </>
  )
}

export default ChatInputMessage
