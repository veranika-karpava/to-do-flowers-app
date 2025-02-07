import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import './Button.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon.js';

const Button = ({
  children,
  classNameIcon,
  disabled = false,
  icon,
  isActive = false,
  variant, // filled, text, visible, round, filter, delete, update
  type = 'button',
  count,
  ...props
}) => {
  const { theme } = useSelector((state) => state.ui);

  const iconElement = icon && <DynamicIcon name={icon} className={cn('button', classNameIcon)} />;

  const buttonClasses = cn(
    'button',
    theme,
    variant, // Apply variant class (filled, text, visible, round, filter, delete, update)
    {
      active: isActive, // Apply 'active' class if isActive is true
    },
  );

  return (
    <button type={type} className={buttonClasses} disabled={disabled} {...props}>
      {children}
      {iconElement}
      {count >= 0 && <span className="button__count">{count}</span>}
    </button>
  );
};

export default Button;
