import React, { useContext } from 'react';

import './Footer.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon';
import { ThemeContext } from '../../helpers/context/ThemeContext';

const Footer = () => {
  const theme = useContext(ThemeContext);

  return (
    <footer className={`footer footer__${theme.theme}`}>
      <p className="footer__content">
        Created with
        <span className="footer__container-heart-icon">
          <DynamicIcon name="FaHeart" className="footer__icon" />
        </span>
        by Veranika Karpava © 2022{' '}
      </p>
    </footer>
  );
};

export default Footer;
