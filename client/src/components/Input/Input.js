import React, { useContext, useReducer, useEffect } from 'react';
import cn from 'classnames';

import './Input.scss';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Button from '../Button/Button';
import { validateInput } from '../../helpers/util/validators';
import { ThemeContext } from '../../helpers/context/ThemeContext';

// Define the reducer function - spread state allows not to lose data
const inputReducer = (state, action) => {
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
  type,
  placeholder,
  validators,
  errorText,
  onInput,
  initialValue = '',
  initialValid = false,
  border,
  clearInput,
  setClearInput,
  rightIcon,
  onClickButton,
}) => {
  const { theme } = useContext(ThemeContext);
  // Initialize the state using useReducer()
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue,
    isValid: initialValid,
    isTouched: false,
  });

  // new value from input filed back from the task list where use Input component
  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid);
  }, [id, inputState.value, inputState.isValid, onInput]);

  // for clear input field
  useEffect(() => {
    if (clearInput) {
      dispatch({ type: 'CLEAR' });
      setClearInput(false);
    }
  }, [clearInput]);

  // Define the event handlers that call dispatch with action type change
  const handleInputChange = e => {
    dispatch({ type: 'CHANGE', value: e.target.value, validators: validators });
  };

  // Define the event handlers that call dispatch with action type touch
  const handleInputTouch = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  return (
    <div
      className={`form__container-${border} form__container-${border}--${theme}`}
    >
      <label className="form__label" htmlFor={id}>
        <input
          className={`form__input form__input--${theme}`}
          id={id}
          type={type}
          placeholder={placeholder}
          onChange={handleInputChange}
          value={inputState.value}
          onBlur={handleInputTouch}
        />
        {rightIcon && (
          <Button
            type="button"
            shape="visibility"
            onClick={onClickButton}
            icon={rightIcon}
            classNameIcon={cn('visibility', 'icon-visibility')}
          />
        )}
      </label>

      {!inputState.isValid && inputState.isTouched && (
        <ErrorMessage errorText={errorText} textAlign="left" />
      )}
    </div>
  );
};

export default Input;
