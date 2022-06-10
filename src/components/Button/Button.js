import React from 'react';
import './Button.scss';

const Button = ({ title, isDark, onClick }) => {
    return (
        <button type='button' className={!isDark ? 'button' : 'button button__dark'} onClick={onClick}>{title}</button>
    );
};

export default Button;