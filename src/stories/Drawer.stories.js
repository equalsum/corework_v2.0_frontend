import React, { useState } from 'react';
import { Button } from 'antd';
import CustomModal from '../pages/antDesign/comp/CustomModal';

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

const Template = ({ placement, size, ...args }) => {
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
      <CustomModal title="Drawer Title" placement={placement} size={size} onClose={onClose} visible={visible} {...args}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </CustomModal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  placement: 'right',
  size: 'small',
};

// ... 다른 스토리 예시들
