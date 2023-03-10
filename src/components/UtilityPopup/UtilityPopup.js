import './UtilityPopup.css'

import krestik from '../../images/krestik.png'

const UtilityPopup = ({setExitPopup, onSignOut, clearChat}) => {



    return (
        
        <div className='exitPopup'>
            <button className='exitPopup__button exitPopup__button_type_сlose' type='button' onClick={() => setExitPopup(false)} >
                <img className='exitPopup__button-image exitPopup__button-image_type_delete' alt='закрыть попап' src={krestik} ></img>
            </button>
            <button className='exitPopup__button exitPopup__button_type_clear' type='button' onClick={clearChat} >Очистить чат</button>
            <button className='exitPopup__button exitPopup__button_type_signout' type='button' onClick={onSignOut}>Выйти</button>
        </div>
    )
}

export default UtilityPopup