import React from 'react';
import { Mail, Sparkles } from 'lucide-react';

const EmailInput = ({ email, setEmail, onSubmit, disabled, loading }) => {
  return (
    <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Mail size={16} /> Deliver Summary To:
      </label>
      
      <div style={{ position: 'relative' }}>
        <input
          type="email"
          placeholder="executive@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px 20px',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid var(--glass-border)',
            borderRadius: '12px',
            color: 'var(--text-color)',
            fontSize: '15px',
            outline: 'none',
            transition: 'all 0.3s ease',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-purple)';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15), inset 0 2px 4px rgba(0,0,0,0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--glass-border)';
            e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.1)';
          }}
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={disabled}
        className={disabled ? '' : 'hover-scale'}
        style={{
          marginTop: '8px',
          width: '100%',
          padding: '16px',
          background: 'var(--primary-gradient)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: 600,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.7 : 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          transition: 'all 0.3s ease',
        }}
      >
        <Sparkles size={20} />
        {loading ? 'Generating...' : 'Generate AI Summary'}
      </button>
    </div>
  );
};

export default EmailInput;
