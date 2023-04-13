import React, { useContext } from 'react';
import cn from 'classnames';

import './Footer.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon';
import { ThemeContext } from '../../helpers/context/ThemeContext';

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={cn('footer', { [theme]: theme })}>
      <p className={cn('footer__content', { [theme]: theme })}>
        Created with
        <span
          className={cn('footer__container-heart-icon', { [theme]: theme })}
        >
          <DynamicIcon name="FaHeart" className="footer__icon" />
        </span>
        by Veranika Karpava © 2022{' '}
      </p>
    </footer>
  );
};

export default Footer;
