import './ChatSection.css'
import Message from '../Message/Message'

function ChatSection ({messages, loggedIn}) {


    return (
        <div className={`chatSection ${!loggedIn ? 'inactive' : ''}`}>
            {/*<button type='button' onClick={updateMessages} className='test-button'></button>*/}
            {
            messages.map((message, i) => {
                return (
                    <Message 
                        key={i}
                        text={message.message}
                        avatar={message.avatar}
                    />
                )
            })
            }
        </div>
    )
}

export default ChatSection