import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';

import { LABEL_AUTH_MODE, LABEL_AUTH_TITLE, LABEL_AUTH_TEXT, LABEL_AUTH_INPUT,  ERROR_AUTH_TEXT } from '../../constants';

import './HomePage.scss';
import { ValidationType } from '../../helpers/util/validators';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useForm } from '../../helpers/hooks/FormHook';
import { useHttpClient } from '../../helpers/hooks/HttpHook';
import { ThemeContext } from '../../helpers/context/ThemeContext';
import { AuthContext } from '../../helpers/context/AuthContext';
const API_URL = process.env.REACT_APP_BACKEND_URL;

const HomePage = () => {
  const { theme } = useContext(ThemeContext);
  const { login } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const { isLoading, error, setError, sendRequest } = useHttpClient();
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

  const history = useHistory();

  const switchModeHandler = () => {
    if (isLoginMode) {
      setFormData(
        { ...formState.inputs, username: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          username: { value: '', isValid: false },
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async e => {
    e.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${API_URL}/user/login`,
          'POST',
          {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          },
          {
            'Content-Type': 'application/json',
          }
        );
        login(
          responseData.userName,
          responseData.userId,
          responseData.jwtToken
        );
        history.push('/tasks');
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const responseData = await sendRequest(
          `${API_URL}/user/signup`,
          'POST',
          {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            username: formState.inputs.username.value,
          },
          {
            'Content-Type': 'application/json',
          }
        );
        login(
          responseData.userName,
          responseData.userId,
          responseData.jwtToken
        );
        history.push('/tasks');
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.inputs]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
              validators={[ValidationType.REQUIRE]}
              onInput={inputHandler}
            />
          )}
          <Input
            id={LABEL_AUTH_INPUT.EMAIL.toLowerCase()}
            type="email"
            placeholder={LABEL_AUTH_INPUT.EMAIL}
            errorText={ERROR_AUTH_TEXT.EMAIL}
            validators={[ValidationType.EMAIL]}
            onInput={inputHandler}
          />
          <Input
            id={LABEL_AUTH_INPUT.PASSWORD.toLowerCase()}
            type={showPassword ? 'text' : 'password'}
            placeholder={LABEL_AUTH_INPUT.PASSWORD}
            errorText={ERROR_AUTH_TEXT.PASSWORD}
            validators={[ValidationType.PASSWORD]}
            onInput={inputHandler}
            rightIcon={
              showPassword ? 'MdOutlineVisibility' : 'MdOutlineVisibilityOff'
            }
            onClickButton={handleClickShowPassword}
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
          <Button onClick={switchModeHandler} shape="noborder">
            {isLoginMode ? LABEL_AUTH_MODE.SIGNUP : LABEL_AUTH_MODE.LOGIN }
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default HomePage;
