import './ExitPopup.css'

import krestik from '../../images/krestik.png'

const ExitPopup = () => {
    return (
        <div className='exitPopup'>
            
            <button className='exitPopup__button exitPopup__button_type_сlose' type='button'>
                <img className='exitPopup__button-image exitPopup__button-image_type_delete' alt='закрыть попап' src={krestik} ></img>
            </button>

            <button className='exitPopup__button exitPopup__button_type_clear' type='button'>Очистить чат</button>
            <button className='exitPopup__button exitPopup__button_type_signout' type='button'>Выйти</button>
        </div>
    )
}

export default ExitPopup