import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const Toast = ({ type, message, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 400); // Wait for the fade out animation
    }, 4000); // Show for 4 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleManualClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const isSuccess = type === 'success';

  return (
    <div 
      className={isClosing ? 'toast-fade-out' : 'toast-slide'}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: isSuccess ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${isSuccess ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
        padding: '16px 24px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        zIndex: 1000,
        color: 'var(--text-color)'
      }}
    >
      {isSuccess ? <CheckCircle color="#10b981" size={24} /> : <XCircle color="#ef4444" size={24} />}
      <p style={{ margin: 0, fontWeight: 500, fontSize: '15px' }}>{message}</p>
      
      <button 
        onClick={handleManualClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          marginLeft: '8px',
          padding: '4px'
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
