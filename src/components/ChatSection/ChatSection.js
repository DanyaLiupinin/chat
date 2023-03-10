import './ChatSection.css'

import Message from '../Message/Message'

function ChatSection({ messages, loggedIn, currentUser }) {

    return (
        <div className={`chatSection ${!loggedIn ? 'inactive' : ''}`}>
            {
                messages.map((message) => {
                    return (
                        <Message
                            key={message.date}
                            text={message.message}
                            messageId={message.date}
                            messageOwner={message.userName}
                            messageOwnerAvatar={message.userAvatar}
                            currentUser={currentUser}
                        />
                    )
                })
            }
        </div>
    )
}

export default ChatSection