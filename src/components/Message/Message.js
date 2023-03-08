import './Message.css'

function Message(props) {

    return (
        <div className='message'>

            {
                props.messageOwner === props.currentUser.username ?
                    <>

                        <div className='message__container message__container_type_mine'>
                            <div className='message__name-container message__name-container_type_mine'>
                                <p className='message__name'>{props.messageOwner}</p>
                            </div>
                            <div className='message__text-container message__text-container_type_mine'>
                                <p className='message__text'>{props.text}</p>
                            </div>
                        </div>
                        <div className='message__avatar-container message__avatar-container_type_mine'>

                            <img className='message__avatar' src={props.currentUser.avatar} alt='моя аватарка'></img>

                        </div>

                    </>

                    :

                    <>
                        <div className='message__avatar-container message__avatar-container_type_mine'>

                            <img className='message__avatar' src={props.messageOwnerAvatar} alt='моя аватарка'></img>

                        </div>
                        <div className='message__container message__container_type_notmine'>
                            <div className='message__name-container message__name-container_type_notmine'>
                                <p className='message__name'>{props.messageOwner}</p>
                            </div>
                            <div className='message__text-container message__text-container_type_notmine'>
                                <p className='message__text'>{props.text}</p>
                            </div>
                        </div>
                    </>

            }
        </div>

    )
}

export default Message