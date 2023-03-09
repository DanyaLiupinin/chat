import React from 'react'
import './Main.css'
import ChatHeader from '../ChatHeader/ChatHeader'
import ChatSection from '../ChatSection/ChatSection'
import ChatInput from '../ChatInput/ChatInput'
import UserList from '../UserList/UserList'
import InfoPopup from '../InfoPopup/InfoPopup'
import Preloader from '../Preloader/Preloader'
import ExitPopup from '../ExitPopup/ExitPopup'

import { useEffect, useState } from 'react'

function Main() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [preloader, setPreloader] = useState(false)
    const [infoPopup, setInfoPopup] = useState(true)
    const [exitPopup, setExitPopup] = useState(true)

    const [currentUser, setCurrentUser] = useState({});
    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([]);

    const signIn = ({ username, userAvatar }) => {

        const newUser = {
            username: username,
            avatar: userAvatar,
            id: Date.now()
        }

        setCurrentUser(newUser)

        sessionStorage.setItem('currentUser', JSON.stringify(newUser))

        if (users.length > 0) {
            setUsers([newUser, ...users])
        } else {
            setUsers([newUser])
        }

        if (localStorage.getItem('allUsers')) {
            const allUsers = JSON.parse(localStorage.getItem('allUsers'))
            localStorage.setItem('allUsers', JSON.stringify([...allUsers, newUser]))

        } else {
            localStorage.setItem('allUsers', JSON.stringify([newUser]))
        }

        setLoggedIn(true)
        setInfoPopup(false)
    }

    const sendMessage = (message) => {

        const messageData = {
            date: Date.now(),
            userName: currentUser.username,
            userAvatar: currentUser.avatar,
            userId: currentUser.id,
            message
        }

        updateMessages(messageData)
    }

    const updateMessages = (data = {}) => {

        const messages = localStorage.getItem('allMessages');
        const messagesArray = Boolean(messages) ? JSON.parse(messages) : [];

        messagesArray.push(data);

        const sortedMessagesArray = sortArray(messagesArray.filter((item) => {
            const valArr = Object.values(item);
            return Boolean(valArr[0]);
        }), 'date').reverse()

        localStorage.setItem('allMessages', JSON.stringify(sortedMessagesArray));
        setMessages(sortedMessagesArray);
    }

    function sortArray(arr, key = '') {

        const sortedArray = arr.map((item, index) => {
            return {
                index: index,
                value: Boolean(key) ? item[key] : item[Object.keys(item)[0]],
            };

        });

        sortedArray.sort((a, b) => {
            if (a.value > b.value) {
                return 1;
            }
            if (a.value < b.value) {
                return -1;
            }
            return 0;
        });
        return sortedArray.map((item) => arr[item.index]);
    }

    const updateUserList = () => {
        if (localStorage.getItem('allUsers')) {
            const allUsers = JSON.parse(localStorage.getItem('allUsers'));
            setUsers(allUsers)
        }
    }

    /*
    const signOut = () => {
        
        sessionStorage.clear()

        if (localStorage.getItem('allUsers')) {

            const allUsers = JSON.parse(localStorage.getItem('allUsers'));
            const currentUserId = currentUser.id
            
            const newUserList = allUsers.filter((user) => {
                return user.id !== currentUserId
            })

            setUsers(newUserList)
        }
    } */

    useEffect(() => {
        if (sessionStorage.getItem('currentUser')) {
            const user = JSON.parse(sessionStorage.getItem('currentUser'))
            setCurrentUser(user)
            setLoggedIn(true)
            setInfoPopup(false)
        }
    }, [])

    React.useEffect(() => {
        if (!loggedIn) {
            updateUserList();
            return
        }
        updateUserList();
        updateMessages()

        window.addEventListener('storage', () => {
            updateUserList();
            updateMessages()
        });

    }, [loggedIn]);

    return (
        <main className='main'>
            <section className='main__section'>

                {preloader ?
                    <Preloader /> :
                    ''
                }

                {infoPopup ?
                    <InfoPopup /> :
                    ''
                }

                {exitPopup ?
                    <ExitPopup /> :
                    ''
                }

                <ChatHeader
                    setLoggedIn={setLoggedIn}
                    loggedIn={loggedIn}
                    setPreloader={setPreloader}
                    submitHandler={signIn}
                    currentUser={currentUser}
                    users={users}
                />

                <UserList
                    loggedIn={loggedIn}
                    users={users}
                />

                <ChatSection
                    loggedIn={loggedIn}
                    messages={messages}
                    currentUser={currentUser}
                //avatar={userAvatar}
                //onUpdateMessages={onUpdateMessages}
                />
                <ChatInput
                    currentUser={currentUser}
                    loggedIn={loggedIn}
                    onSendMessage={sendMessage}
                />

            </section>
        </main>
    )
}

export default Main

// подумать как изящно закинуть валидацию в отедльную папку

// сделать logout

// рефакторинг

// написать документацию 

