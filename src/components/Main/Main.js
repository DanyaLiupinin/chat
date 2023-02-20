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

    function sortArr(arr, key = '') {

        const sortedArr = arr.map((item, index) => {
            return {
                index: index,
                value: Boolean(key) ? item[key] : item[getObjectKey(item)],
            };
        });

        sortedArr.sort((a, b) => {
            if (a.value > b.value) {
                return -1;
            }
            if (a.value < b.value) {
                return 1;
            }
            return 0;
        });

        return sortedArr.map((item) => arr[item.index]);
    }

    function updateChatList (data = {}) {
        const chatList = localStorage.getItem('chatList');
        const chatListArr = Boolean(chatList) ? JSON.parse(chatList) : [];
        chatListArr.push(data);

        const sortedChatList = sortArr(chatListArr.filter((item) => {

            const arr = Object.values(item);

            return Boolean(arr[arr.length - 1]);  // если нет даты, то сообщение отлетает

        }), 'date'); 

        localStorage.setItem('chatList', JSON.stringify(sortedChatList));
        setChatList(sortedChatList);
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