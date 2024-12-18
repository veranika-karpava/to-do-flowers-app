import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';

import { VALIDATION_TYPE, LABEL_AUTH_MODE, LABEL_AUTH_TITLE, LABEL_AUTH_TEXT, LABEL_AUTH_INPUT,  ERROR_AUTH_TEXT } from '../../constants';

import { authActions } from '../../store/auth-slice';

import './HomePage.scss';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useForm } from '../../helpers/hooks/FormHook';
import { useHttpClient } from '../../helpers/hooks/HttpHook';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const HomePage = () => {
  const theme = useSelector(state => state.ui.theme);
  const dispatch = useDispatch();

  const [passwordIsVisiable, setPasswordIsVisiable] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const { isLoading, error, setError, sendRequest } = useHttpClient();

  const history = useHistory();

  const toggleLoginModeHandler = () => {
    const { email, password, username } = formState.inputs;

    const updatedInputs = isLoginMode 
    ? { ...formState.inputs, username: undefined } 
    : { ...formState.inputs, username: { value: '', isValid: false } };

    const isFormValid = isLoginMode
    ? email.isValid && password.isValid
    : email.isValid && password.isValid && username.isValid;

    setFormData(updatedInputs, isFormValid);
    setIsLoginMode(prevMode => !prevMode);
  };

  const handlePasswordIsVisiable = () => {
    setPasswordIsVisiable(prevPasswordIsisiable => !prevPasswordIsisiable);
  };

  const authSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const url = `${API_URL}/user/${isLoginMode ? 'login' : 'signup' }`;
      const payload = isLoginMode 
        ? { email: formState.inputs.email.value, password: formState.inputs.password.value,}
        : { email: formState.inputs.email.value, password: formState.inputs.password.value, username: formState.inputs.username.value,};

        const responseData = await sendRequest(url, 'POST', payload, { 'Content-Type': 'application/json' });
        dispatch(authActions.login({
          userId: responseData.userId,
          userName: responseData.userName,
          userToken: responseData.jwtToken
        }))
        history.push('/tasks');
    } catch(err) {
      setError('An error occurred. Please try again later.');
    }
  }

  useEffect(() => {
    setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.inputs]);

  return (
    <section className={cn('auth', theme)}>
      <Card>
        {isLoading && (
          <div className="auth__message">
            <LoadingSpinner />
          </div>
        )}
        <div
          className={cn(
            'auth__container-title',
            `auth__container-title--${theme}`
          )}
        >
          <h2 className="auth__title">{isLoginMode ? LABEL_AUTH_TITLE.LOGIN : LABEL_AUTH_TITLE.SIGNUP}</h2>
          {error && <ErrorMessage errorText={error} textAlign="center" />}
        </div>

        <form className="auth__form" onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id={LABEL_AUTH_INPUT.USERNAME.toLowerCase()}
              placeholder={LABEL_AUTH_INPUT.USERNAME}
              errorText={ERROR_AUTH_TEXT.USERNAME}
              validators={[VALIDATION_TYPE.REQUIRE]}
              onInput={inputHandler}
            />
          )}
          <Input
            id={LABEL_AUTH_INPUT.EMAIL.toLowerCase()}
            type="email"
            placeholder={LABEL_AUTH_INPUT.EMAIL}
            errorText={ERROR_AUTH_TEXT.EMAIL}
            validators={[VALIDATION_TYPE.EMAIL]}
            onInput={inputHandler}
          />
          <Input
            id={LABEL_AUTH_INPUT.PASSWORD.toLowerCase()}
            type={passwordIsVisiable ? 'text' : 'password'}
            placeholder={LABEL_AUTH_INPUT.PASSWORD}
            errorText={ERROR_AUTH_TEXT.PASSWORD}
            validators={[VALIDATION_TYPE.PASSWORD]}
            onInput={inputHandler}
            rightIcon={passwordIsVisiable ? 'MdOutlineVisibility' : 'MdOutlineVisibilityOff'}
            onClickButton={handlePasswordIsVisiable}
          />
          <div className="auth__container-button">
            <Button
              shape="rectangle"
              type="submit"
              title={isLoginMode ? LABEL_AUTH_MODE.LOGIN : LABEL_AUTH_MODE.SIGNUP}
            />
          </div>
        </form>
        <div className={cn('auth__wrapper', `auth__wrapper--${theme}`)}>
          <p className="auth__switch-content">
            {isLoginMode ? LABEL_AUTH_TEXT.SIGNUP : LABEL_AUTH_TEXT.LOGIN }
          </p>
          <Button onClick={toggleLoginModeHandler} shape="noborder">
            {isLoginMode ? LABEL_AUTH_MODE.SIGNUP : LABEL_AUTH_MODE.LOGIN }
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default HomePage;
