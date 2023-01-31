import React, { useContext } from 'react';

import './Button.scss';
import { ThemeContext } from '../../helpers/context/ThemeContext';

const Button = ({ shape, type, title, onClick, children, disabled }) => {
    const theme = useContext(ThemeContext);

    return (
        <button
            type={type}
            className={`button button__${shape} button__${shape}--${theme.theme}`}
            onClick={onClick}
            disabled={disabled}>
            {title}
            {children}
            {disabled}
        </button>
    );
};

export default Button;