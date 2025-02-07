import React from 'react';

import './LoadingSpinner.scss';
import DynamicIcon from '../DynamicIcon/DynamicIcon.js';

const LoadingSpinner = () => {
  return (
    <div className="loading">
      <DynamicIcon name="VscLoading" className="loading__icon" />
    </div>
  );
};

export default LoadingSpinner;
