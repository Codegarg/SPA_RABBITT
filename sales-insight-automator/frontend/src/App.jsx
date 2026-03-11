import React from 'react';
import Layout from './components/Layout/Layout';
import UploadCard from './components/UploadCard/UploadCard';
import EmailInput from './components/EmailInput/EmailInput';
import Loader from './components/Loader/Loader';
import SummaryPreview from './components/SummaryPreview/SummaryPreview';
import Toast from './components/Notifier/Toast';
import SystemStatus from './components/SystemStatus/SystemStatus';
import { useUpload, UI_STATES } from './hooks/useUpload';

function App() {
  const {
    file,
    email,
    setEmail,
    summary,
    uiState,
    notification,
    handleFileDrop,
    removeFile,
    submitForm,
    clearNotification
  } = useUpload();

  const isFormValid = file && email && email.includes('@');

  return (
    <Layout>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '540px',
        padding: '40px',
        position: 'relative'
      }}>
        <SystemStatus />
        
        <div className="app-header">
          <h1>Sales Insight Automator</h1>
          <p>Upload your sales dataset and receive AI-generated executive insights instantly.</p>
        </div>

        {uiState === UI_STATES.LOADING ? (
          <Loader />
        ) : (
          <>
            <form onSubmit={submitForm} className="fade-in">
              <UploadCard 
                file={file} 
                onDrop={handleFileDrop} 
                onRemove={removeFile} 
              />
              
              <EmailInput 
                email={email} 
                setEmail={setEmail} 
                onSubmit={submitForm}
                disabled={!isFormValid || uiState === UI_STATES.LOADING}
                loading={uiState === UI_STATES.LOADING}
              />
            </form>
            <SummaryPreview summary={summary} />
          </>
        )}
      </div>

      {notification && (
        <Toast 
          type={notification.type} 
          message={notification.message} 
          onClose={clearNotification} 
        />
      )}
    </Layout>
  );
}

export default App;
