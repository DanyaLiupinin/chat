import './Message.css'

function Message (props) {

    return (
        <div className='message'>
            <div className='message__text-container'>
                <p className='message__text'>{props.text}</p>
            </div>
        </div>
    )
}

export default Message