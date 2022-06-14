import React from 'react';

const Form = ({ inputText, setInputText, placeholder, onClick }) => {

    const inputHandleChange = (e) => {
        console.log(e.target.value)
        setInputText(e.target.value);
    }

    return (
        <form className='form'>
            <label htmlFor='add-item' className='form__label'>
                <button type='submit' className='form__button-submit' onClick={onClick}></button>
                <input type='text' className='form__input' id='add-item' name='add-item' placeholder={placeholder} onChange={inputHandleChange} value={inputText} />
            </label>
        </form>
    );
};

export default Form;