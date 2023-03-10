import { useRef, useEffect } from 'react'

import './UtilityPopup.css'

import krestik from '../../images/krestik.png'

const UtilityPopup = ({ setUtilityPopup, onSignOut, clearChat }) => {

    const popup = useRef(null);

    useEffect(() => {
        const onClick = e => popup.current.contains(e.target) || setUtilityPopup(false)
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    return (
        
        <div className='exitPopup' ref={popup}>
            <button className='exitPopup__button exitPopup__button_type_сlose' type='button' onClick={() => setUtilityPopup(false)}>
                <img className='exitPopup__button-image exitPopup__button-image_type_delete' alt='закрыть попап' src={krestik} ></img>
            </button>
            <button className='exitPopup__button exitPopup__button_type_clear' type='button' onClick={clearChat}>Очистить чат</button>
            <button className='exitPopup__button exitPopup__button_type_signout' type='button' onClick={onSignOut}>Выйти</button>
        </div>
    )
}

export default UtilityPopup