import React from 'react';
import '../styles/Alert.css';

function Alert({ message, onDismiss }) {
  return (
    <div className="alert">
      <p>{message}</p>
      <button onClick={onDismiss}>Dismiss</button>
    </div>
  );
}

export default Alert;
