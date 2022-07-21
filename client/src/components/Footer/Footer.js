import React from 'react';
import './Footer.scss';
import { AiFillGithub } from "react-icons/ai";

const Footer = ({ isDark }) => {
    return (
        <footer className={!isDark ? 'footer' : 'footer footer__dark'}>
            <div className='footer__container-content'>
                <p className='footer__content'>Created by <a href="https://www.vkarpava.tech" className='footer__link'>Veranika Karpava</a></p>
            </div>
            <div className='footer__container-link'>
                <a className='footer__link-github' href='https://github.com/veranika-karpava/to-do-app-gardens' target='blank'>
                    <AiFillGithub className='footer__icon' />
                </a>
            </div>
        </footer>
    );
};

export default Footer;