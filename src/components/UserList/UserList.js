import { useState } from 'react'
import './UserList.css'

function UserList() {

    const [userListOpened, setUserListOpened] = useState(false)

    const toggleUserListOpened = () => {
        setUserListOpened(!userListOpened)
    }

    return (

        <div className="userlist">
            {
                !userListOpened ?
                    <button type='button' className="userlist__button userlist__button_type_down" onClick={toggleUserListOpened} ></button> :
                    <button type='button' className="userlist__button userlist__button_type_up" onClick={toggleUserListOpened} ></button>
            }
            <h3 className='userlist__title'>Участники чата</h3>
            <div className={`userlist__users ${userListOpened ? 'userlist__users_active' : ''}`}>
                <p className='userlist__item'>Link 1</p>
                <p className='userlist__item'>Link 1</p>
                <p className='userlist__item'>Link 1</p>
                <p className='userlist__item'>Link 1</p>
            </div>
        </div>

    )
}

export default UserList