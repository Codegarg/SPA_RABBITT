import React from 'react';

const SummaryPreview = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="summary-preview-container fade-in">
      <h3 className="summary-preview-title">
        <span role="img" aria-label="chart">📊</span> AI Generated Executive Summary
      </h3>
      <div className="summary-preview-content">
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default SummaryPreview;
