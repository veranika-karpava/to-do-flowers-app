import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { TITLE_FOOTER } from '../../data/constants.js';

import './Footer.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon.js';

const Footer = () => {
  const { theme } = useSelector((state) => state.ui);

  return (
    <footer className={cn('footer', { [theme]: theme })}>
      <p className="footer__content">
        {TITLE_FOOTER.RIGHT}
        <span className="footer__container-heart-icon">
          <DynamicIcon name="FaHeart" className="footer__icon" />
        </span>
        {TITLE_FOOTER.LEFT}
      </p>
    </footer>
  );
};

export default Footer;
