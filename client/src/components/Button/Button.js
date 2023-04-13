import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import './Button.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon';
import { ThemeContext } from '../../helpers/context/ThemeContext';

const Button = ({
  to,
  mode,
  shape,
  type,
  title,
  onClick,
  children,
  active,
  icon,
  classNameIcon,
}) => {
  const { theme } = useContext(ThemeContext);

  return to ? (
    <NavLink
      exact
      to={to}
      onClick={onClick}
      className={cn('button', { 'btn-circle': to || mode })}
    >
      {icon && (
        <DynamicIcon name={icon} className={cn('button', classNameIcon)} />
      )}
      {children}
    </NavLink>
  ) : (
    <button
      type={type}
      className={cn(
        'button',
        { [theme]: theme },
        { [shape]: shape },
        { [active]: active },
        { 'btn-circle': to || mode }
      )}
      onClick={onClick}
    >
      {title}
      {children}
      {icon && (
        <DynamicIcon name={icon} className={cn('button', classNameIcon)} />
      )}
    </button>
  );
};

export default Button;
