import './chatBar.scss';
import ChatBarCard from './chatBarCard/chatBarCard';
import ChatBarHeader from './chatBarHeader/chatBarHeader';
import { getChatListUrl } from '../../../utils/network';
import { authorizedRequest } from '../../../utils/queries';
import { useEffect, useState } from 'react';
import { chatBarCardType } from '../../../types/chats/chatsBarTypes';

const ChatBar = () => {
    const companyId = parseInt(localStorage.getItem('companyId') || '-1');
    const [ chatList, setChatList ] = useState<chatBarCardType[]>([]);

    useEffect(() => {
        authorizedRequest(getChatListUrl(companyId), 'GET')
        .then((respose) => {
            const result = respose.result;
            console.log(result)
            const chatList: chatBarCardType[] = [];
            for(let i=0; i<result.length; i++){
                chatList.push({
                    avatar: result[i].avatar,
                    lastMessage: result[i].lastMessage,
                    name: result[i].name,
                    unreadMessages: result[i].unread_count,
                    chatId: result[i].chat_id
                })
            }

            setChatList(chatList);
        })
    }, [])

    return (
        <div className="chat-bar-container">
            <ChatBarHeader />
            <div className="chat-bar-chats-container">
                {
                    chatList.map(({avatar, name, lastMessage, unreadMessages, chatId}) => {
                        return <ChatBarCard avatar={avatar} name={name} lastMessage={lastMessage} unreadMessages={unreadMessages} chatId={chatId} key={`chat-bar-card-${chatId}`}/>
                    })
                }
                {/* <ChatBarCard avatar={null} name="Ivan" lastMessage="Blalmd vmd vmd md cmsd cala" unreadMessages={1} chatId={1}/>
                <ChatBarCard avatar="cdjk" name="Ivan" lastMessage="Blalmd vmd vmd md cmsd cala" unreadMessages={1} chatId={1}/>
                <ChatBarCard avatar="cdjk" name="Ivan" lastMessage="Blalmd vmd vmd md cmsd cala" unreadMessages={1} chatId={1}/>
                <ChatBarCard avatar="cdjk" name="Ivan" lastMessage="Blalmd vmd vmd md cmsd cala" unreadMessages={1} chatId={1}/>
                <ChatBarCard avatar="cdjk" name="Ivan" lastMessage="Blalmd vmd vmd md cmsd cala" unreadMessages={1} chatId={1}/>
                <ChatBarCard avatar="cdjk" name="Ivan" lastMessage="Blalmd vmd vmd md cmsd cala" unreadMessages={1} chatId={1}/>
                <ChatBarCard avatar="cdjk" name="Ivan" lastMessage="Blalmd vmd vmd md cmsd cala" unreadMessages={1} chatId={1}/>
                <ChatBarCard avatar="cdjk" name="Ivan" lastMessage="Blalmd vmd vmd md cmsd cala" unreadMessages={1} chatId={1}/>
                <ChatBarCard avatar="cdjk" name="Ivan" lastMessage="Blalmd vmd vmd md cmsd cala" unreadMessages={1} chatId={1}/>
                <ChatBarCard avatar="cdjk" name="Ivan" lastMessage="Blalmd vmd vmd md cmsd cala" chatId={1}/>
                <ChatBarCard avatar="cdjk" name="Ivan" lastMessage="Blalmd vmd vmd md cmsd cala" chatId={1}/>
                <ChatBarCard avatar="cdjk" name="Ivan" lastMessage="Blalmd vmd vmd md cmsd cala" chatId={1}/>
                <ChatBarCard avatar="cdjk" name="Ivan" lastMessage="Blalmd vmd vmd md cmsd cala" chatId={1}/>
                <ChatBarCard avatar="cdjk" name="Ivan" lastMessage="Blalmd vmd vmd md cmsd cala" chatId={1}/>
                <ChatBarCard avatar="cdjk" name="Ivan" lastMessage="Blalmd vmd vmd md cmsd cala" chatId={1}/>
                <ChatBarCard avatar="cdjk" name="Ivan" lastMessage="Blalmd vmd vmd md cmsd cala" chatId={1}/>
                <ChatBarCard avatar="cdjk" name="Ivan" lastMessage="Blalmd vmd vmd md cmsd cala" chatId={1}/>
                <ChatBarCard avatar="cdjk" name="Ivan" lastMessage="Blalmd vmd vmd md cmsd cala" chatId={1}/> */}
            </div>
        </div>
    );
};

export default ChatBar;
