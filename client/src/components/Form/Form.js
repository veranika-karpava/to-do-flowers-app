import React from 'react';
import './Form.scss';

const Form = ({ isDark, inputText, setInputText, placeholder, submitHandler }) => {

    const inputHandleChange = (e) => {
        setInputText(e.target.value);
    }

    return (
        <form className={!isDark ? 'form' : 'form form__dark'}>
            <button type='submit' className='form__button-submit' onClick={submitHandler}></button>
            <input type='text' className={!isDark ? 'form__input' : 'form__input form__input-dark'} id='add-item' name='add-item' placeholder={placeholder} onChange={inputHandleChange} value={inputText} />
        </form>
    );
};

export default Form;