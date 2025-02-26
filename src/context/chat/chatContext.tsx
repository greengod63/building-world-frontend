import { createContext, useState, FC } from "react";
import { chat, chatProviderProps, contextMenuType } from '../../types/context/chatContextTypes';
import { actionType, actions } from '../../types/chats/actionsType';
import { chatMembersType } from "../../types/chats/generalTypes";
import { chatInfoType } from "../../types/chats/chatInfoSliderTypes";
import { userMessageType } from "../../types/chats/messagesTypes";

export const ChatContext = createContext<chat>({} as chat);

const ChatProvider: FC<chatProviderProps> = ({ children }) => {
  const [chatId, setChatId] = useState<number>();
  const [messages, setMessages] = useState<userMessageType[]>([]);
  const [contextMenu, setContextMenu] = useState<null | contextMenuType>(null)
  const [actionType, setActionType] = useState<actionType>({ actionType: actions.SEND, messageId: undefined })
  const [chatMembers, setChatMembers] = useState<chatMembersType[]>([]);
  const [chatInfoSliderIsOpened, setChatInfoSliderIsOpened] = useState(false);
  const [chatInfo, setChatInfo] = useState<chatInfoType>({name: '', description: '', avatar: '', group: false});

  return (
    <ChatContext.Provider value={{
      chatId,
      setChatId,
      messages,
      setMessages,
      contextMenu,
      setContextMenu,
      actionType,
      setActionType,
      chatMembers,
      setChatMembers,
      chatInfoSliderIsOpened,
      setChatInfoSliderIsOpened,
      chatInfo,
      setChatInfo
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider;
