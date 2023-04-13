import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';

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
          <h2 className="auth__title">{isLoginMode ? 'Log In' : 'Sign Up'}</h2>
          {error && <ErrorMessage errorText={error} textAlign="center" />}
        </div>

        <form className="auth__form" onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="username"
              type="text"
              label="Username"
              placeholder="User name"
              errorText="Please enter your Username"
              validators={[ValidationType.REQUIRE]}
              onInput={inputHandler}
              border="border"
            />
          )}
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="Email"
            errorText="Please enter a valid email address example@example.com"
            validators={[ValidationType.EMAIL]}
            onInput={inputHandler}
            border="border"
          />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="Password"
            errorText="Please enter a valid password, at least 8 characteres, at least one letter and a number from 0 to 99"
            validators={[ValidationType.PASSWORD]}
            onInput={inputHandler}
            border="border"
            rightIcon={
              showPassword ? 'MdOutlineVisibility' : 'MdOutlineVisibilityOff'
            }
            onClickButton={handleClickShowPassword}
          />
          <div className="auth__container-button">
            <Button
              shape="rectangle"
              type="submit"
              title={isLoginMode ? 'Log In' : 'Sign Up'}
            />
          </div>
        </form>
        <div className={cn('auth__wrapper', `auth__wrapper--${theme}`)}>
          <p className="auth__switch-content">
            {isLoginMode ? `Don't have an account?` : 'Do you have an account?'}{' '}
          </p>
          <Button onClick={switchModeHandler} shape="noborder">
            {isLoginMode ? 'Sign Up' : 'Log In'}
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default HomePage;
