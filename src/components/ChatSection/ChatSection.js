import './ChatSection.css'
import Message from '../Message/Message'

function ChatSection({ messages, loggedIn, currentUser }) {


    return (
        <div className={`chatSection ${!loggedIn ? 'inactive' : ''}`}>
            {/*<button type='button' onClick={updateMessages} className='test-button'></button>*/}
            {
                messages.map((message) => {
                    return (
                        <Message
                            key={message.date}
                            text={message.message}
                            messageId={message.date}
                            messageUser={message.userName}
                            //avatar={message.avatar}
                            currentUser={currentUser}
                        />
                    )
                })
            }
        </div>
    )
}

export default ChatSection