import { useState } from 'react'
import './ChatInput.css'
import sendMessage from '../../images/sendmessage.svg'

function ChatInput({ onSendMessage, loggedIn }) {

    const [message, setMessage] = useState('');
    const [inputValidity, setInputValidity] = useState(false)

    const inputValidation = (value) => {
        if (value.trim() === '') {
            return false
        } else {
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage(message);
        setMessage('');
        setInputValidity(false)
    }


    return (
        <div className='chatInput'>
            <form className={`chatInput__form ${!loggedIn ? 'inactive' : ''}`} onSubmit={handleSubmit} disabled={!inputValidity ? true : false}>
                <textarea className='chatInput__input' type='text' name='message' readOnly={!loggedIn ? true : false} placeholder='введите сообщение' onChange={(e) => {
                    setMessage(e.target.value)
                    setInputValidity(inputValidation(e.target.value))
                }} value={message || ''}></textarea>
                <button className={`chatInput__submit-button ${!inputValidity ? 'chatInput__submit-button_inactive' : ''}`} type='submit' disabled={!loggedIn || !inputValidity ? true : false}>
                    <img className='chatInput__submit-image' alt='send message' src={sendMessage}></img>
                </button>
            </form>
            <p className='chatInput__caption'>для отправки нажмите tab+enter</p>
        </div>
    )
}

export default ChatInput