import React from 'react';
import LoadingSpinner from './loading.spinner.component';

const LoadingButtonComponent = ({children = null, text = null}) => {
  return (
    <div
      className="py-2.5 w-full print:hidden px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded focus:outline-none inline-flex items-center justify-center"
    >
      {children ? children : <LoadingSpinner />}
      {text ? text : 'Loading...'}
    </div>
  );
};

export default LoadingButtonComponent;
