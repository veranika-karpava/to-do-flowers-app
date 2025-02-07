import React from 'react';
import cn from 'classnames';

import './ErrorMessage.scss';

//variant - new, update, login, form
const ErrorMessage = ({ errorText, variant }) => {
  return (
    <div className={cn('error-message', variant)}>
      <p>{errorText}</p>
    </div>
  );
};

export default ErrorMessage;
