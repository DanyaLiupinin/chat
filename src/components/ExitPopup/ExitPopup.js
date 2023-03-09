import './ExitPopup.css'

const ExitPopup = () => {
    return (
        <div className='exitPopup'>
            <button className='exitPopup__button exitPopup__button_type_clear' type='button'>Очистить чат</button>
            <button className='exitPopup__button exitPopup__button_type_signout' type='button'>Выйти</button>
        </div>
    )
}

export default ExitPopup