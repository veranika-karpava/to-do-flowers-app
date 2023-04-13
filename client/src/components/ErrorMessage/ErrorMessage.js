import React from 'react';
import cn from 'classnames';

import './ErrorMessage.scss';

const ErrorMessage = ({ errorText, textAlign }) => {
  return (
    <div className={cn('error-message')} style={{ textAlign: textAlign }}>
      <p>{errorText}</p>
    </div>
  );
};

export default ErrorMessage;
