import React, { useContext, useReducer, useEffect } from 'react';

import './Input.scss';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { validate } from '../../helpers/util/validators';
import { ThemeContext } from '../../helpers/context/ThemeContext';

// reducer
const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            };
        case 'TOUCH':
            return {
                // allows not to lose data
                ...state,
                isTouched: true,
            };
        default:
            return state;
    }
};

const Input = ({ id, type, placeholder, validators, errorText, onInput, initialValue, initialValid, border }) => {
    const theme = useContext(ThemeContext);
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initialValue || '',
        isValid: initialValid || false,
        isTouched: false,
    });

    // new value from input filed back from the task list where use Input component
    useEffect(() => {
        onInput(id, inputState.value, inputState.isValid);
    }, [id, inputState.value, inputState.isValid, onInput]);

    // for calling reducer and pass current state
    const onChangeHandler = e => {
        dispatch({ type: 'CHANGE', val: e.target.value, validators: validators });
    };

    // for call reducer and pass current state
    const touchHandler = () => {
        dispatch({
            type: 'TOUCH',
        });
    };


    return (
        <div className={`form__container-${border} form__container-${border}--${theme.theme}`}>
            <label
                className='form__label'
                htmlFor={id}
            >
            </label>
            <input
                className={`form__input form__input--${theme.theme}`}
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={onChangeHandler}
                value={inputState.value}
                onBlur={touchHandler}
            />
            {!inputState.isValid && inputState.isTouched && (
                <ErrorMessage errorText={errorText} textAlign='left' />
            )}
        </div>
    );
};

export default Input;