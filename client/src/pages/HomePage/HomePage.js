import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import {
  VALIDATION_TYPE,
  LABEL_AUTH_MODE,
  LABEL_AUTH_TITLE,
  LABEL_AUTH_TEXT,
  LABEL_AUTH_INPUT,
  ERROR_AUTH_TEXT,
} from '../../data/constants.js';
import { useForm } from '../../helpers/hooks/FormHook.js';

import { setCredentials } from '../../store/auth-slice.js';
import { useLoginMutation, useSignupMutation } from '../../store/usersApiSlice.js';

import './HomePage.scss';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import Card from '../../components/Card/Card.js';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.js';

const HomePage = () => {
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
    false,
  );

  const [isLoginMode, setIsLoginMode] = useState(true);

  const { theme } = useSelector((state) => state.ui);
  const { isAuth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isError: isLogError, error: loginerr }] = useLoginMutation();
  const [signup, { isError: isSignError, error: signuperr }] = useSignupMutation();

  useEffect(() => {
    if (isAuth) {
      navigate('/tasks');
    }
  }, [isAuth, navigate]);

  const toggleLoginMode = () => {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, username: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid,
      );
    } else {
      setFormData({ ...formState.inputs, username: { value: '', isValid: false } }, false);
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password, username } = formState.inputs;

    try {
      const credentials = isLoginMode
        ? await login({ email: email.value, password: password.value }).unwrap()
        : await signup({
            email: email.value,
            password: password.value,
            username: username.value,
          }).unwrap();
      dispatch(setCredentials(credentials));
      navigate('/tasks');
    } catch (err) {
      console.log(err);
    }
  };

  const errorMessage = isLoginMode
    ? isLogError && loginerr?.message
    : isSignError && signuperr?.message;

  return (
    <section className={cn('auth', theme)}>
      <Card>
        <div className={cn('auth__container-title', { [theme]: theme })}>
          <h2 className="auth__title">
            {isLoginMode ? LABEL_AUTH_TITLE.LOGIN : LABEL_AUTH_TITLE.SIGNUP}
          </h2>
          {errorMessage && <ErrorMessage errorText={errorMessage} variant="login " />}
        </div>

        <form className="auth__form" onSubmit={submitHandler} noValidate>
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
            type="password"
            placeholder={LABEL_AUTH_INPUT.PASSWORD}
            errorText={ERROR_AUTH_TEXT.PASSWORD}
            validators={[VALIDATION_TYPE.PASSWORD]}
            onInput={inputHandler}
          />
          <div className="auth__container-button">
            <Button variant="filled" type="submit" disabled={!formState.isFormValid}>
              {isLoginMode ? LABEL_AUTH_MODE.LOGIN : LABEL_AUTH_MODE.SIGNUP}
            </Button>
          </div>
        </form>
        <div className={cn('auth__wrapper', { [theme]: theme })}>
          <p className="auth__switch-content">
            {isLoginMode ? LABEL_AUTH_TEXT.SIGNUP : LABEL_AUTH_TEXT.LOGIN}
          </p>
          <Button onClick={toggleLoginMode} variant="text">
            {isLoginMode ? LABEL_AUTH_MODE.SIGNUP : LABEL_AUTH_MODE.LOGIN}
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default HomePage;
