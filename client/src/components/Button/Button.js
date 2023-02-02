import React, { useContext } from 'react';

import './Button.scss';
import { ThemeContext } from '../../helpers/context/ThemeContext';

const Button = ({
  shape,
  type,
  title,
  onClick,
  children,
  disabled,
  value,
  active,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <button
      type={type}
      className={`button button__${shape} ${
        active && `button__${shape}--${active}`
      } button__${shape}--${theme.theme}`}
      onClick={onClick}
      disabled={disabled}
      value={value}
    >
      {title}
      {children}
      {disabled}
    </button>
  );
};

export default Button;
