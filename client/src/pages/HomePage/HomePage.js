import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './HomePage.scss';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../helpers/util/validators';
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
  const theme = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, setError, sendRequest } = useHttpClient();

  const [formState, handleInputSubmit, setFormData] = useForm(
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

  const switchModeHandler = () => {
    if (!isLoginMode) {
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

  const authSubmitHandler = async event => {
    event.preventDefault();

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
        auth.login(responseData.userId, responseData.jwtToken);
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
        auth.login(responseData.userId, responseData.jwtToken);
        history.push('/tasks');
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setError(null);
  }, [formState.inputs]);

  return (
    <section className={`auth auth__${theme.theme}`}>
      {isLoading && <LoadingSpinner />}
      <Card className={`auth auth__${theme.theme}`}>
        <div
          className={`auth__container-title auth__container-title--${theme.theme}`}
        >
          <h2 className="auth__title">{isLoginMode ? 'Log In' : 'Sign Up'}</h2>
          {error && <ErrorMessage errorText={error} textAlign="center" />}
        </div>

        <form className="auth__form" onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="username"
              type="text"
              label="Usermane"
              placeholder="username"
              errorText="Please enter an Username."
              validators={[VALIDATOR_REQUIRE()]}
              onInput={handleInputSubmit}
              border="border"
            />
          )}
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="example@example.com"
            errorText="Please enter a valid email address."
            validators={[VALIDATOR_EMAIL()]}
            onInput={handleInputSubmit}
            border="border"
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="******"
            errorText="Please enter a valid password, at least 6 characteres."
            validators={[VALIDATOR_MINLENGTH(6)]}
            onInput={handleInputSubmit}
            border="border"
          />
          <div className="auth__container-button">
            <Button
              shape="rectangle"
              type="submit"
              title={isLoginMode ? 'Log In' : 'Sign Up'}
              disabled={!formState.isValid}
            />
          </div>
        </form>
        <div className={`auth__wrapper auth__wrapper--${theme.theme}`}>
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
