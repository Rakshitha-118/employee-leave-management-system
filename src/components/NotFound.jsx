import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page Not Found</p>
      <button 
        className="primary"
        onClick={() => navigate('/login')}
      >
        Back to Login
      </button>
    </div>
  );
};

export default NotFound;
