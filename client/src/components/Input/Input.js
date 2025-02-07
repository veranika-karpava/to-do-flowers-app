import React, { useReducer, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import './Input.scss';
import ErrorMessage from '../ErrorMessage/ErrorMessage.js';
import Button from '../Button/Button.js';
import { validateInput } from '../../helpers/util/validators.js';

export const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validateInput(action.value, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    case 'CLEAR':
      return {
        ...state,
        value: '',
        isValid: false,
        isTouched: false,
      };
    default:
      return state;
  }
};

const Input = ({
  id,
  type = 'text',
  border = 'border', // border, noborder
  placeholder,
  validators,
  errorText,
  onInput,
  clearInput,
}) => {
  const { theme } = useSelector((state) => state.ui);
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
    isTouched: false,
  });
  const [inputType, setInputType] = useState(type);

  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid);
  }, [id, inputState.value, inputState.isValid, onInput]);

  useEffect(() => {
    if (clearInput) {
      dispatch({ type: 'CLEAR' });
    }
  }, [clearInput]);

  const handleInputChange = (e) =>
    dispatch({ type: 'CHANGE', value: e.target.value, validators: validators });

  const handleInputTouch = () => dispatch({ type: 'TOUCH' });

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const icon = inputType === 'password' ? 'MdOutlineVisibilityOff' : 'MdOutlineVisibility';

  return (
    <div className={cn('form__container', { [border]: border }, { [theme]: theme })}>
      <label className="form__label" htmlFor={id}>
        <input
          className={cn('form__input', { [theme]: theme })}
          autoComplete="off"
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={inputState.value}
          onChange={handleInputChange}
          onBlur={handleInputTouch}
        />
        {type === 'password' && (
          <Button
            variant="visible"
            onClick={togglePasswordVisibility}
            icon={icon}
            classNameIcon={cn('visible', 'icon-visible')}
          />
        )}
      </label>
      {!inputState.isValid && inputState.isTouched && (
        <ErrorMessage errorText={errorText} variant="form" />
      )}
    </div>
  );
};

export default Input;
