import React from 'react';

const Form = ({ inputText, setInputText, placeholder, submitHandler }) => {

    const inputHandleChange = (e) => {
        setInputText(e.target.value);
    }


    return (
        <form className='form'>
            <label htmlFor='add-item' className='form__label'>
                <button type='submit' className='form__button-submit' onClick={submitHandler}></button>
                <input type='text' className='form__input' id='add-item' name='add-item' placeholder={placeholder} onChange={inputHandleChange} value={inputText} />
            </label>
        </form>
    );
};

export default Form;