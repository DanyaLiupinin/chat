import { useEffect, useState } from 'react'
import './ChatHeader.css'
import galochka from '../../images/galochka.png'
import photo from '../../images/photo.png'
import editButton from '../../images/editbutton.png'
import defaultAvatar from '../../images/defaultavatar.png'

function ChatHeader({ submitHandler, setPreloader, currentUser, loggedIn, users }) {

    //const [avatarURL, setAvatarURL] = useState('')
    const [username, setUsername] = useState('')
    const [userAvatar, setUserAvatar] = useState(defaultAvatar)
    const [avatarLoaded, setAvatarLoaded] = useState(false)
    const [usernameError, setUsernameError] = useState(false)

    //const [isUserCreated, setIsUserCreated] = useState(false)

    const usernameValidation = (data, userlist = users) => {
        for (let i = 0; i < users.length; ++i) {
            if (userlist[i].username === data) {
                setUsernameError(true)
                return
            } else {
                setUsernameError(false)
            }
        }
    }

    function onAvatarChange(e) {
        const avatar = e.target.files[0]
        const avatarURL = URL.createObjectURL(avatar)
        setUserAvatar(avatarURL)
        setAvatarLoaded(true)
    }

    const saveUserData = (e) => {
        e.preventDefault()
        setPreloader(true)


        setTimeout(() => {
            submitHandler({ username, userAvatar })
            setPreloader(false)
        }, 1000)
    }

    return (
        <div className='chatHeader'>

            {loggedIn ?

                <div className='chatHeader__profile'>
                    <img src={currentUser.avatar} alt='аватар пользователя' className='chatHeader__avatar'></img>
                    <h2 className='chatHeader__username'>{currentUser.username}</h2>
                    <button type='button' className='chatHeader__edit-button'
                    //onClick={editProfileData}
                    >
                        <img className='chatHeader__button-image' src={editButton} alt='редактировать профиль'></img>
                    </button>
                </div> :

                <form className='chatHeader__form' onSubmit={saveUserData}>
                    <label className='chatHeader__label_type_avatar'>
                        <input type='file' className='chatHeader__input chatHeader__input_type_avatar' onChange={onAvatarChange}
                            placeholder='добавьте аватарку'></input>
                        <div className={`chatHeader__photo-container ${avatarLoaded ? 'chatHeader__photo-container_type_no-outline' : ''}`}>
                            <img src={
                                !avatarLoaded ? photo : userAvatar
                            } alt='добавить аватарку' className={`chatHeader__input-button_type_avatar ${avatarLoaded ? 'chatHeader__avatar-loaded' : ''} `}></img>

                        </div>
                    </label>
                    <input className='chatHeader__input chatHeader__input-button_type_name'
                        onChange={(e) => {
                            setUsername(e.target.value)
                            usernameValidation(e.target.value)
                        }}
                        name='username' type='text' placeholder='введите имя' value={username} required></input>
                    <span className={`chatHeader__input-error ${usernameError ? 'chatHeader__input-error_active' : ''} `}>Такой пользователь уже зарегистрирован</span>
                    <button className={`chatHeader__submit-button ${usernameError || username === '' ? 'chatHeader__submit-button_disabled' : ''} `} type='submit' disabled={usernameError ? true : false} >
                        <img className='chatHeader__submit-image' src={galochka} alt='сохранить данные'></img>
                    </button>
                </form>

            }



        </div>
    )
}

export default ChatHeader