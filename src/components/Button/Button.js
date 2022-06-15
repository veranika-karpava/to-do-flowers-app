import React from 'react';
import './Button.scss';

const Button = ({ title, isDark, onClick, value }) => {
    return (
        <button type='button' className={!isDark ? 'button' : 'button button__dark'} onClick={onClick} value={value}>{title}</button>
    );
};

export default Button;