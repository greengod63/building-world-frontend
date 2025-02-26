import { addChat } from '../../../../assets/chatIcons';
import './chatBarHeader.scss';
import { useContext } from 'react';
import { ModalsContext } from '../../../../context/modalsContext';


const ChatBarHeader = () => {
  const { setCreateGroupChatIsOpen, setChatSearchInput } = useContext(ModalsContext);
  return (
    <div className='chat-bar-header-wrapper'>
      <input type="text" placeholder='Search' onChange={(e) => { setChatSearchInput(e.target.value) }} className='chat-bar-header-input' />
      <div className='chat-bar-header-button' onClick={() => setCreateGroupChatIsOpen(true)}>
        {addChat}
      </div>
    </div>
  );
};

export default ChatBarHeader;
