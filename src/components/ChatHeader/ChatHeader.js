import { useEffect, useState } from 'react'
import './ChatHeader.css'
import galochka from '../../images/galochka.png'
import photo from '../../images/photo.png'
import editButton from '../../images/editbutton.png'
import defaultAvatar from '../../images/defaultavatar.png'

function ChatHeader({ userAvatar, onAddAvatar, submitHandler, setLoggedIn, setPreloader }) {

    //const [avatarURL, setAvatarURL] = useState('')
    const [isUserCreated, setIsUserCreated] = useState(false)
    const [username, setUsername] = useState('')
    const [avatarLoaded, setAvatarLoaded] = useState(false)

    // закончить с пропорциями шапки на разных размерах

    function onInputChange(e) {
        if (e.target.name === 'username') {
            setUsername(e.target.value)
        }
    }

    useEffect(() => {

        if (sessionStorage.getItem('username')) {
            setUsername(sessionStorage.getItem('username'))
            setIsUserCreated(true)
            setLoggedIn(true)
        }


        if (sessionStorage.getItem(`${sessionStorage.getItem('username')}-avatar`)) {
            //console.log('da')
            onAddAvatar(sessionStorage.getItem(`${username}-avatar`))
            
        } else {
            onAddAvatar(defaultAvatar)
        }
        setAvatarLoaded(true)
        /*
                setUsername(sessionStorage.getItem('username'))
                    setIsUserCreated(true)
                onAddAvatar(sessionStorage.getItem(`${username}-avatar`))
                    setAvatarLoaded(true) */

    }, [])


    function onAvatarChange(e) {
        const avatar = e.target.files[0]
        const avatarURL = URL.createObjectURL(avatar)
        onAddAvatar(avatarURL)
        setAvatarLoaded(true)
    }

    const saveUserData = (e) => {
        e.preventDefault()
        setPreloader(true)

        setTimeout(() => {
            setIsUserCreated(true)
            sessionStorage.setItem('username', username)
            sessionStorage.setItem(`${username}-avatar`, userAvatar)
            //submitHandler(username)
            setLoggedIn(true)
            setPreloader(false)
        }, 1000)
    }

    const editProfileData = () => {
        setIsUserCreated(false)
    }

    return (
        <div className='chatHeader'>

            {isUserCreated ?

                <div className='chatHeader__profile'>
                    <img src={userAvatar} alt='аватар пользователя' className='chatHeader__avatar'></img>
                    <h2 className='chatHeader__username'>{username}</h2>
                    <button type='button' className='chatHeader__edit-button' onClick={editProfileData}>
                        <img className='chatHeader__button-image' src={editButton} alt='редактировать профиль'></img>
                    </button>
                </div> :

                <form className='chatHeader__form' onSubmit={saveUserData}>
                    <label className='chatHeader__label_type_avatar'>
                        <input type='file' className='chatHeader__input chatHeader__input_type_avatar' onChange={onAvatarChange} placeholder='добавьте аватарку'></input>
                        <div className={`chatHeader__photo-container ${avatarLoaded ? 'chatHeader__photo-container_type_no-outline' : ''}`}>
                            <img src={
                                !avatarLoaded ? photo : userAvatar
                            } alt='добавить аватарку' className={`chatHeader__input-button_type_avatar ${avatarLoaded ? 'chatHeader__avatar-loaded' : ''} `}></img>

                        </div>
                    </label>
                    <input className='chatHeader__input chatHeader__input-button_type_name' onChange={onInputChange} name='username' type='text' placeholder='введите имя' value={username} required></input>
                    <button className='chatHeader__submit-button' type='submit'>
                        <img className='chatHeader__submit-image' src={galochka} alt='сохранить данные'></img>
                    </button>
                </form>

            }



        </div>
    )
}

export default ChatHeader