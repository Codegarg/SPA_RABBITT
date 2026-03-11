import { useState, useCallback } from 'react';
import { generateSummary } from '../services/api';

export const UI_STATES = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

export const useUpload = () => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [summary, setSummary] = useState('');
  const [uiState, setUiState] = useState(UI_STATES.IDLE);
  const [notification, setNotification] = useState(null);

  const handleFileDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const removeFile = () => {
    setFile(null);
  };

  const submitForm = async (e) => {
    if (e) e.preventDefault();
    
    if (!file) {
      showError('Please upload a CSV or XLSX file.');
      return;
    }
    
    if (!email || !email.includes('@')) {
      showError('Please enter a valid email address.');
      return;
    }

    try {
      setUiState(UI_STATES.LOADING);
      const data = await generateSummary(file, email);
      
      if (data.summary) {
        setSummary(data.summary);
      }
      
      setUiState(UI_STATES.SUCCESS);
      showSuccess(data.message || 'Executive summary generated and sent!');
      
      // Auto reset after 5 seconds to analyze another file
      setTimeout(() => {
        resetForm();
      }, 5000);
      
    } catch (error) {
      setUiState(UI_STATES.ERROR);
      const errorMsg = error.response?.data?.error || error.message || 'An unexpected error occurred.';
      showError(errorMsg);
      
      setTimeout(() => {
        setUiState(UI_STATES.IDLE);
      }, 4000);
    }
  };

  const showSuccess = (msg) => setNotification({ type: 'success', message: msg });
  const showError = (msg) => setNotification({ type: 'error', message: msg });
  const clearNotification = () => setNotification(null);

  const resetForm = () => {
    setFile(null);
    setEmail('');
    setSummary('');
    setUiState(UI_STATES.IDLE);
    setNotification(null);
  };

  return {
    file,
    email,
    setEmail,
    summary,
    uiState,
    notification,
    handleFileDrop,
    removeFile,
    submitForm,
    clearNotification,
    setUiState
  };
};
