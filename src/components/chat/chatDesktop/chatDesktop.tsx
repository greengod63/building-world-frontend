import './chatDesktop.scss';
import { FC, useEffect, useContext, useState, useRef } from 'react';
import MessageArea from './messageArea/messageArea';
import ChatHeader from './chatHeader/chatHeader';
import ChatInput from './chatInput/chatInput';
import { ChatContext } from '../../../context/chat/chatContext';
import { actions, actionType } from '../../../types/chats/actionsType';
import { userMessageType } from '../../../types/chats/messagesTypes';
import { useInfiniteScroll } from '../../../customHooks/useInfiniteScroll';
import ChatInfoSlider from './chatInfoSlider/chatInfoSlider';
import { authorizedRequest } from '../../../utils/queries';
import { getChatMessagesUrl, getChatInfoUrl, readMessageUrl } from '../../../utils/network';
import { messageTypes, messageStatus } from '../../../types/chats/messagesTypes';

const ChatDesktop: FC = () => {

  const employeeId = parseInt(localStorage.getItem('employeeId') || '-1')


  // const { count, loading } = useInfiniteScroll(blockHeight, currentUserHeight, 100, 20);

  const [loading, setLoading] = useState(false);
  const [ date, setDate ] = useState<Date | null>(null);
  const messageAreaContainer = useRef<null | HTMLDivElement>(null); // horizontal scrolling element
  const [needToScrollDown, setNeedToScrollDown] = useState(false)

  const { chatId, setChatMembers, chatInfoSliderIsOpened, setChatInfo, messages, setMessages } = useContext(ChatContext);
  // const [ messages, setMessages ] = useState<userMessageType[]>([]);
  const [ messagesPage, setMessagesPage ] = useState(1);
  const [ difference, setDifference ] = useState(0);

  // const [needToAnimateBlock, setNeedToAnimateBlock] = useState<{ messageId: number | null | undefined, firstLoad: boolean }>({
  //   messageId: null,
  //   firstLoad: true
  // })

  
  const [dateTimeout, setDateTimeout] = useState<any>(null)

  const scrollHandler = () => {
    const messagesInView = messages.filter((elem) => {
      const elementBlock = elem.block;
      const messageArea = messageAreaContainer.current;



      if(messageArea && elementBlock){
        return elementBlock.offsetTop-90 >= messageArea.scrollTop 
      }
      return false
    })
    // console.log(messages)
    console.log(messagesInView)
    
    messages.forEach((elem, index) => {
      const elementBlock = elem.block;
      const messageArea = messageAreaContainer.current;

      if(elementBlock && messageArea && elem.status != messageStatus.READ){
        if(elementBlock.offsetTop-90 >= messageArea.scrollTop && elementBlock.offsetTop-90+elementBlock.clientHeight <= messageArea.scrollTop+messageArea.clientHeight){
          authorizedRequest(readMessageUrl(chatId || -1), 'PATCH', 'accessToken', {message_id: elem.messageId})
          .then((responce) => {
            console.log(responce)
            messages[index].status = messageStatus.READ
            setMessages([...messages])
          })
        }
      }
    })

    if(messagesInView[0]){
      setDate(messagesInView[0].date);
    }else{
      setDate(null)
    }
    clearTimeout(dateTimeout);
    setDateTimeout(setTimeout(() => {
      setDate(null)
    }, 3000))

    if(messageAreaContainer?.current && messageAreaContainer?.current.scrollTop < 500 && chatId && !loading){
      getMessages(chatId, messagesPage+1, 10, false)
    }

    if(messageAreaContainer?.current){

      for(let i=0; i<messages.length; i++){

        const messageArea = messageAreaContainer.current;
        const docViewTop = messageArea.scrollTop;
        const docViewBottom = docViewTop + messageArea.clientHeight;
  
        const elem = messages[i].block
        if(elem){
          const elemTop = elem.offsetTop;
          const elemBottom = elemTop + elem.clientHeight;
          if((elemBottom <= docViewBottom) && (elemTop >= docViewTop)){
            console.log(messages[i].date)
          } 
        }
      }
    }


  }

  const getMessages = (chatId: number, page: number, amountPerPage: number, initial: boolean) => {
    authorizedRequest(getChatMessagesUrl(chatId, page, amountPerPage), 'GET')
    .then((data) => {
      setLoading(true)

      const result = data.result.reverse();
      console.log(result)
      const messagesData: userMessageType[] = [];
      for(let i=0; i<result.length; i++){
        const message = result[i];
        const messageDate = new Date(message.date);

        messagesData.push(
          {
            senderId: message.sender_id,
            date: messageDate,
            text: message.text,
            file: message.files,
            messageId: message.message_id,
            edited: false,
            forwarded: null,
            replied: message.reply_to_msg_id,
            type: message.sender_id === employeeId ? messageTypes.USER : messageTypes.STRANGER,
            status: message.is_read ? messageStatus.READ : messageStatus.SENT,
            block: null
          }
        )
      }

      if(messageAreaContainer.current){
        // messageAreaContainer.current.classList.add('message-area-block-scroll');
        var initialScrollHeight = messageAreaContainer.current.scrollHeight
        console.log(messageAreaContainer.current.scrollHeight)
      }
      setMessages([...messagesData, ...messages])
      
      setMessagesPage(page);
      setLoading(false)
      setTimeout(() => {

        if(messageAreaContainer.current){
          console.log(messageAreaContainer.current.scrollHeight - initialScrollHeight)
          setDifference(messageAreaContainer.current.scrollHeight - initialScrollHeight)
        }
      }, 500)

      // if(initial){
      //   setNeedToScrollDown(initial);
      // }
      

    })
  }

  useEffect(() => {
    console.log(difference)
    if(messageAreaContainer.current){
      console.log(messageAreaContainer.current.scrollHeight)
      messageAreaContainer.current.scrollTop += difference;
    }
  }, [difference])


  useEffect(() => {
    if (chatId) {

      setChatMembers([
        {employeeId: 1, avatar: 'sss', name: 'sd22'}, 
        {employeeId: 5, avatar: null, name: 'sd22333'}, 
      ])
      
      setChatInfo({
        name: 'sdfds',
        description: 'safsaf',
        avatar: null,
        group: true
      })

      // authorizedRequest(`http://127.0.0.1:5000/api/company/${localStorage.getItem('companyId')}/chats`, 'GET')
      // .then((responce) => {
      //   console.log(responce)
      // })

      authorizedRequest(getChatInfoUrl(chatId), 'GET')
      .then((responce) => {
        console.log(responce)
        const result = responce.result;
        // setChatMembers([

        // ])

        setChatInfo({
          name: result.name,
          description: 'safsaf',
          avatar: result.avatar,
          group: result.is_group
        })

      })

      setMessages([])
      getMessages(chatId, messagesPage, 10, true)
      // setTimeout(() => setNeedToScrollDown(true), 100)
    }
  }, [chatId])

  // useEffect(() => {
  //   if(messageAreaContainer.current){
  //     if(needToScrollDown){
    
  //       messageAreaContainer.current.scrollTop += messageAreaContainer.current.scrollHeight;
  //       setNeedToScrollDown(false)
  //     }else{
  //       messageAreaContainer.current.classList.remove('message-area-block-scroll')
  
  //     }
  //   }
  // }, [needToScrollDown])


  // useEffect(() => {
  //   if(showDate){

  //   }
  // }, [showDate])

  // Handle editing of messages

  // Handle adding, deleting, and editing of messages
  const submitMessage = (action: actions, message: userMessageType) => {
    if (action === actions.SEND || action === actions.REPLY) {
      // setNeedToAnimateBlock({ messageId: message.messageId, firstLoad: false })
      setMessages([...messages, message])
      setNeedToScrollDown(true);
    }
    // if (action === actions.DELETE) {
    //   console.log(messages.filter((item) => item.messageId !== message.messageId))
    //   setMessages([...messages.filter((item) => item.messageId !== message.messageId)])
    //   // setNeedToAnimateBlock({ messageId: message.messageId, firstLoad: false })
    // }
    if (action === actions.EDIT) {
      const currentMessage = messages[messages.findIndex((item) => item.messageId === message.messageId)]
      currentMessage.text = message.text
      currentMessage.edited = true
      setMessages([...messages])
    }

  }

  return (
    <div className="chat-desktop">
      <ChatHeader/>
      <div className="chat-desktop-container">
        <div className="chat-desktop-message-area-container" style={chatInfoSliderIsOpened ? {maxWidth: '50%'} : {}}>
          <MessageArea
            loading={loading}
            // blocksCount={count}
            messageAreaContainer={messageAreaContainer}
            scrollHandler={scrollHandler}
            messages={messages}
            date={date}
          />
          <ChatInput submitMessage={submitMessage} messages={messages} />
        </div>
        <ChatInfoSlider/>
      </div>
    </div>
  )
}

export default ChatDesktop;
