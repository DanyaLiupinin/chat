import './Message.css'

function Message(props) {

    return (
        <div className='message'>
            <div className={`message__container ${props.messageUser === props.currentUser.username ? 'message__container_type_mine' : 'message__container_type_notmine'}`}>

                <div className={`message__name-container ${props.messageUser === props.currentUser.username ?
                    'message__name-container_type_mine' : 'message__name-container_type_notmine'}`}>
                    <p className='message__name message__name_type_mine'>{props.messageUser}</p>
                </div>

                <div className={`message__text-container ${props.messageUser === props.currentUser.username ? 'message__text-container_type_mine' : 'message__text-container_type_notmine'}`}>
                    <p className='message__text'>{props.text}</p>
                </div>


            </div>
        </div>
    )
}

export default Message