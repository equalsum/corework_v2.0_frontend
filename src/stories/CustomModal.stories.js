import React, { useState } from 'react';
import { Button } from 'antd';
import CustomModal from '../pages/publishing/comp/CustomModal';

export default {
  title: 'Components/CustomModal',
  component: CustomModal,
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

export const DefaultModalTemplate = ({ placement, size }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button onClick={showDrawer}>Open Drawer</Button>
      <CustomModal placement={placement} size={size} onClose={onClose} title="Drawer Title" visible={visible}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </CustomModal>
    </>
  );
};
