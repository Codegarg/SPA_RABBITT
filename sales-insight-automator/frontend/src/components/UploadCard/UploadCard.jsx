import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileSpreadsheet, X } from 'lucide-react';

const UploadCard = ({ file, onDrop, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Extend react-dropzone to handle specific mimes
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    maxFiles: 1
  });

  const getBorderColor = () => {
    if (isDragReject) return '#ef4444'; // Red
    if (isDragActive || isHovered) return 'var(--accent-purple)'; // Purple Accent
    if (file) return '#10b981'; // Green Success
    return 'var(--glass-border)'; // Default
  };

  const getGlow = () => {
    if (isDragActive || isHovered) return 'var(--accent-glow)';
    if (file) return '0 0 20px rgba(16, 185, 129, 0.2)';
    return 'none';
  };

  return (
    <div
      {...(!file ? getRootProps() : {})}
      onMouseEnter={() => !file && setIsHovered(true)}
      onMouseLeave={() => !file && setIsHovered(false)}
      style={{
        border: `2px dashed ${getBorderColor()}`,
        borderRadius: '16px',
        padding: '3rem 2rem',
        textAlign: 'center',
        cursor: file ? 'default' : 'pointer',
        transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: (isDragActive && !file) ? 'rgba(139, 92, 246, 0.05)' : 'transparent',
        boxShadow: getGlow(),
        transform: isDragActive ? 'scale(1.02)' : 'scale(1)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '220px'
      }}
    >
      {!file && <input {...getInputProps()} />}
      
      {file ? (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%' }}>
            <FileSpreadsheet size={40} color="#10b981" />
          </div>
          <div>
            <p className="file-name">Selected file: {file.name}</p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            style={{
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
          >
            <X size={16} /> Remove File
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', pointerEvents: 'none' }}>
           <div style={{ 
              padding: '20px', 
              background: isDragActive ? 'rgba(139, 92, 246, 0.2)' : 'var(--glass-bg)', 
              borderRadius: '50%',
              transition: 'all 0.3s ease'
            }}>
            <UploadCloud size={48} color={isDragActive ? 'var(--accent-purple)' : 'var(--text-muted)'} />
          </div>
          <div>
            <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-color)', marginBottom: '8px' }}>
              {isDragReject ? 'Format not supported' : isDragActive ? 'Drop dataset here...' : 'Drag & drop dataset'}
            </p>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              Supported formats: .CSV, .XLSX (Max 5MB)
            </p>
            <p style={{ fontSize: '14px', color: '#64748b', marginTop: '12px', textDecoration: 'underline' }}>
              or click to browse
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadCard;
