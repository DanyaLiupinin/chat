import React from 'react'
import './Main.css'
import ChatHeader from '../ChatHeader/ChatHeader'
import ChatSection from '../ChatSection/ChatSection'
import ChatInput from '../ChatInput/ChatInput'
import UserList from '../UserList/UserList'
import InfoPopup from '../InfoPopup/InfoPopup'
import Preloader from '../Preloader/Preloader'

import { BroadcastChannel } from 'broadcast-channel';

import { useEffect, useState } from 'react'


function Main() {

    // кастомизировать скролл
    // создать контекст пользователя

    const [loggedIn, setLoggedIn] = useState(false)
    const [messages, setMessages] = useState([]);
    const [preloader, setPreloader] = useState(false)
    const [infoPopup, setInfoPopup] = useState(true)



    const [currentUser, setCurrentUser] = useState({});
    const [users, setUsers] = useState([])

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

        updateUserList();

        window.addEventListener('storage', () => {
            updateUserList();
        });

    }, []);

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

                <ChatHeader
                    setLoggedIn={setLoggedIn}
                    loggedIn={loggedIn}
                    setPreloader={setPreloader}
                    submitHandler={signIn}
                    currentUser={currentUser}
                />

                <UserList
                    loggedIn={loggedIn}
                    users={users}
                />



                <ChatSection
                    loggedIn={loggedIn}
                    messages={messages}
                //avatar={userAvatar}
                //onUpdateMessages={onUpdateMessages}
                />
                <ChatInput
                    loggedIn={loggedIn}
                //onSendMessage={sendMessage}
                />




            </section>
        </main>
    )
}

export default Main