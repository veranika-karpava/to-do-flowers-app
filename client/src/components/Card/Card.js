import React, { useContext } from 'react';

import { ThemeContext } from '../../helpers/context/ThemeContext';
import './Card.scss';

const Card = ({ children }) => {
  const theme = useContext(ThemeContext);

  return <div className={`card card__${theme.theme}`}>{children}</div>;
};

export default Card;
