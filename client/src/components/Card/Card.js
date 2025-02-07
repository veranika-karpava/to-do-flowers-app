import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import './Card.scss';

const Card = ({ children }) => {
  const { theme } = useSelector((state) => state.ui);

  return <div className={cn('card', { [theme]: theme })}>{children}</div>;
};

export default Card;
