import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { TITLE_FOOTER } from '../../constants';

import './Footer.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon';

const Footer = () => {
  const theme = useSelector(state => state.ui.theme);

  return (
    <footer className={cn('footer', { [theme]: theme })}>
      <p className={cn('footer__content', { [theme]: theme })}>
        {TITLE_FOOTER.RIGHT}
        <span className={cn('footer__container-heart-icon', { [theme]: theme })}>
          <DynamicIcon name="FaHeart" className="footer__icon" />
        </span>
        {TITLE_FOOTER.LEFT}
      </p>
    </footer>
  );
};

export default Footer;
