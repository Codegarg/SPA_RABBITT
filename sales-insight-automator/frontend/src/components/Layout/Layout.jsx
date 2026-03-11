import React from 'react';
import AnimatedBackground from './AnimatedBackground';

const Layout = ({ children }) => {
  return (
    <>
      <AnimatedBackground />
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        {children}
      </div>
    </>
  );
};

export default Layout;
