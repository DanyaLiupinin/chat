import { useState, useEffect, useRef } from 'react'

import './UserList.css'

function UserList({users, loggedIn}) {

    const [userListOpened, setUserListOpened] = useState(false)
    
    const rootEl = useRef(null);

    const toggleUserListOpened = () => {
        setUserListOpened(!userListOpened)
    }

    useEffect(() => {
        const onClick = e => rootEl.current.contains(e.target) || setUserListOpened(false)

        document.addEventListener('click', onClick);

        return () => document.removeEventListener('click', onClick);
    }, []);
    

    return (

        <div className={`userlist ${!loggedIn ? 'inactive' : ''}`} ref={rootEl}>
            {
                !userListOpened ?
                    <button type='button' disabled={!loggedIn ? true : false} className={`userlist__button userlist__button_type_down ${!loggedIn ? 'inactive' : ''}`} onClick={toggleUserListOpened} ></button> :
                    <button type='button' disabled={!loggedIn ? true : false} className={`userlist__button userlist__button_type_up ${!loggedIn ? 'inactive' : ''}`} onClick={toggleUserListOpened} ></button>
            }
            <h3 className='userlist__title'>Участники чата</h3>
            <div className={`userlist__users ${userListOpened ? 'userlist__users_active' : ''}`}>
                {users.length > 0 && users.map((user) => {
                    return (
                        <p className='userlist__item' key={user.id}>{user.username}</p>
                    )
                }) }
            </div>
        </div>

    )
}

export default UserList