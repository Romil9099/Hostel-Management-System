import React from 'react';
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '72px', color: '#333' }}>404</h1>
      <p style={{ fontSize: '24px', color: '#777' }}>Page Not Found</p>
      <Link to="/" style={{ fontSize: '18px', color: '#007BFF' }}>Go to Home</Link>
    </div>
  );
};

export default NotFound;

