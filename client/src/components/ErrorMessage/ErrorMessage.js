import React from 'react';

import './ErrorMessage.scss';

const ErrorMessage = ({ errorText, textAlign }) => {
  return (
    <div className="error-message" style={{ textAlign: textAlign }}>
      <p className="error__message__content">{errorText}</p>
    </div>
  );
};

export default ErrorMessage;
