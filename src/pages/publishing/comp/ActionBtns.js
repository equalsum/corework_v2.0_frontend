import React from 'react';
import { Button } from 'antd';

const ActionButtons = ({ cancelText = '취소', confirmText = '추가', customClass, onCancel, onConfirm }) => (
  <div className={customClass}>
    <Button onClick={onCancel} size="large" style={{ marginRight: 8 }}>
      {cancelText}
    </Button>
    <Button type="primary" size="large" onClick={onConfirm}>
      {confirmText}
    </Button>
  </div>
);

export default ActionButtons;
