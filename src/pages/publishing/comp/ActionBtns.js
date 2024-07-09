import React from 'react';
import { Button } from 'antd';

const ActionButtons = ({ cancelText = '취소', confirmText = '추가', onCancel, onConfirm }) => (
  <div>
    <Button onClick={onCancel} size="large" style={{ marginRight: 8 }}>
      {cancelText}
    </Button>
    <Button type="primary" size="large" onClick={onConfirm}>
      {confirmText}
    </Button>
  </div>
);

export default ActionButtons;
