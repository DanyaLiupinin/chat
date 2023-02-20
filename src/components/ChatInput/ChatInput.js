import { useState } from 'react'
import './ChatInput.css'
import sendMessage from '../../images/sendmessage.svg'

function ChatInput({ onSendMessage }) {

    //const [message, setMessage] = useState('')
    const [messageData, setMessageData] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setMessageData({
            ...messageData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage(messageData);
        setMessageData({});
      }


    return (
        <div className='chatInput'>

            <form className='chatInput__form' onSubmit={handleSubmit}>
                <input className='chatInput__input' type='text' name='message' placeholder='введите сообщение' onChange={handleChange} value={messageData.message || ''}></input>
                <button className={`chatInput__submit-button ${!messageData.message ? 'chatInput__submit-button_inactive' : ''}`} type='submit'>
                    <img className='chatInput__submit-image' alt='send message' src={sendMessage}></img>
                </button>
            </form>

        </div>
    )
}

export default ChatInput