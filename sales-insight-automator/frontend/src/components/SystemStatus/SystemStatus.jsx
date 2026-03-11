import React, { useEffect, useState } from 'react';
import { checkHealth } from '../../services/api';

const SystemStatus = () => {
  const [backendStatus, setBackendStatus] = useState('Checking...');

  useEffect(() => {
    const verifyHealth = async () => {
      try {
        const data = await checkHealth();
        if (data && data.status === 'ok') {
          setBackendStatus('Connected');
        } else {
          setBackendStatus('Disconnected');
        }
      } catch (error) {
        setBackendStatus('Disconnected');
      }
    };

    verifyHealth();
  }, []);

  return (
    <div className="system-status">
      <span>Frontend: Online</span> |
      <span>Backend API: {backendStatus}</span>
      {backendStatus === 'Connected' && (
        <> | <span>AI Engine: Ready</span></>
      )}
    </div>
  );
};

export default SystemStatus;
