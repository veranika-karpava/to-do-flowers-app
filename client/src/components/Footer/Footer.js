import React from 'react';
import './Footer.scss';

const Footer = ({ isDark }) => {
    return (
        <footer className={!isDark ? 'footer' : 'footer footer__dark'}>
            <p className='footer__heading'>Created by <a href="https://www.vkarpava.tech" className='footer__link'>Veranika Karpava</a></p>
        </footer>
    );
};

export default Footer;