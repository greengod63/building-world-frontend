import { FC, useContext, useEffect, useRef } from 'react'
import { copyMessageIcon, pinMessageIcon, replyMessageIcon, forwardMessageIcon, editMessageIcon, deleteMessageIcon } from '../../../../../assets/chatIcons'
import './contextMenu.scss'
import { actions } from '../../../../../types/chats/actionsType'
import { ChatContext } from '../../../../../context/chat/chatContext'

const ContextMenu: FC = () => {
  const { contextMenu, setActionType } = useContext(ChatContext)
  // Destructuring x and y properties from coords object
  // Destructuring text, ownerName and messageId properties from message object

  // Creating ref for popup element
  const contextMenuReference = useRef<HTMLDivElement | null>(null)
  // Using useEffect hook to add 'context-menu-visible' that has opacity: 1 class to popup element after 10ms
  useEffect(() => {
    const contextMenuElement = contextMenuReference.current
    setTimeout(() => {
      if (contextMenuElement !== null) {
        contextMenuElement.classList.add('context-menu-visible')
      }
    }, 10);
  }, [])

  return (
    <div ref={contextMenuReference} className='context-menu' style={{ top: contextMenu?.coords.y, left: contextMenu?.coords.x }}>
      {/* <div className="context-menu-container"> */}
        <div className="context-menu-item" onClick={() => { setActionType({ actionType: actions.REPLY, messageId: contextMenu?.message.messageId }) }}>
          <div className="context-menu-icon">{replyMessageIcon}</div>
          <div className="context-menu-action">Reply</div>
        </div>
        <div className="context-menu-item" onClick={() => { setActionType({ actionType: actions.EDIT, messageId: contextMenu?.message.messageId }) }}>
          <div className="context-menu-icon">{editMessageIcon}</div>
          <div className="context-menu-action">Edit</div>
        </div>
        <div className="context-menu-item" onClick={() => { setActionType({ actionType: actions.COPY, messageId: undefined }) }}>
          <div className="context-menu-icon">{copyMessageIcon}</div>
          <div className="context-menu-action">Copy</div>
        </div>
        <div className="context-menu-item">
          <div className="context-menu-icon">{forwardMessageIcon}</div>
          <div className="context-menu-action">Forward</div>
        </div>
        <div className="context-menu-item">
          <div className="context-menu-icon">{pinMessageIcon}</div>
          <div className="context-menu-action">Pin this message</div>
        </div>
        <div className="context-menu-item">
          <div className="context-menu-icon">{deleteMessageIcon}</div>
          <div className="context-menu-action">Delete for me</div>
        </div>
      {/* </div> */}
    </div>
  )
}

export default ContextMenu
