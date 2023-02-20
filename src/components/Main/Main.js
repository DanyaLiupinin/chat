import React from 'react'
import './Main.css'
import ChatHeader from '../ChatHeader/ChatHeader'
import ChatSection from '../ChatSection/ChatSection'
import ChatInput from '../ChatInput/ChatInput'
import { useEffect, useState } from 'react'
import { openDB, deleteDB, wrap, unwrap } from 'idb';

function Main() {

    // кастомизировать скролл
    // создать контекст пользователя

    const [userAvatar, setUserAvatar] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const [chatList, setChatList] = React.useState([]);

    const onAddAvatar = (avatar) => {
        setUserAvatar(avatar)
    }


    function getObjectKey(object) {
        return Object.keys(object)[0];
    }

    function sendMessage(data) {
        const { message } = data;
        const messageData = {
            //userKey: getObjectKey(currentUser),
            //userName: Object.values(currentUser)[0],
            date: Date.now(),
            message,
        };
        updateChatList(messageData);
    }

    function updateChatList (data = {}) {
        const chatList = localStorage.getItem('chatList');
        const chatListArr = Boolean(chatList) ? JSON.parse(chatList) : [];
        chatListArr.unshift(data);

        const sort = chatListArr.filter((item) => {
            const arr = Object.values(item);

            return Boolean(arr[arr.length - 1]);
        })

        localStorage.setItem('chatList', JSON.stringify(sort));
        setChatList(sort);
    }


    React.useEffect(() => {
        //document.title = Object.values(currentUser)[0];
    
        //handleUserList();
        updateChatList();
    
        window.addEventListener('storage', () => {
          //handleUserList();
          updateChatList();
        });
      }, []);


    return (
        <main className='main'>
            <section className='main__section'>
                <ChatHeader
                    userAvatar={userAvatar}
                    onAddAvatar={onAddAvatar}
                />
                <ChatSection
                    messages={chatList}
                    avatar={userAvatar}
                //onUpdateMessages={onUpdateMessages}
                />
                <ChatInput
                    onSendMessage={sendMessage}
                />
            </section>
        </main>
    )
}

export default Main