import './Message.css'

function Message (props) {

    return (
        <div className='message'>
            {/*
            <div className='message__avatar-container'>
                <img className='message__avatar-image' src={props.avatar || 'default'} alt='user avatar'></img>
            </div> 
            */} 
             
            <div className='message__text-container'>
                <p className='message__text'>{props.text}</p>
            </div>
        </div>
    )
}

export default Message