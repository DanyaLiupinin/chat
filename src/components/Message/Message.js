import './Message.css'

function Message (props) {

    return (
        <div className='message'>
            <div className={`message__text-container ${props.messageUser === props.currentUser.username ? 'message__text-container_type_mine' : 'message__text-container_type_notmine'}`}>
                <p className='message__text'>{props.text}</p>
            </div>
        </div>
    )
}

export default Message