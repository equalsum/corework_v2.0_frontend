import React from 'react';

const EmptyContent = ({ message }) => (
  <div className="empty-wrap">
    <div className="empty-state">
      <i className="icon-empty"></i>
      <p className="empty-message">{message}</p>
    </div>
  </div>
);

export default EmptyContent;
