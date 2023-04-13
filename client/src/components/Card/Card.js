import React, { useContext } from 'react';
import cn from 'classnames';

import './Card.scss';
import { ThemeContext } from '../../helpers/context/ThemeContext';

const Card = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return <div className={cn('card', { [theme]: theme })}>{children}</div>;
};

export default Card;
