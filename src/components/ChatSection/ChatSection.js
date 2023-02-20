import './ChatSection.css'
import Message from '../Message/Message'

function ChatSection ({messages, avatar, onUpdateMessages}) {


    return (
        <div className='chatSection'>
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