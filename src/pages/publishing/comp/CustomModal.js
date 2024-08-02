import { React } from 'react';
import { Drawer } from 'antd';

const CustomModal = ({ placement = 'right', size = 'small', visible, onClose, title, children, ...props }) => {
  let width = '30%';
  let height = '100%';

  if (size === 'medium') {
    width = '50%';
  } else if (size === 'large') {
    width = '80%';
  }

  if (placement === 'top' || placement === 'bottom') {
    width = '100%';
    height = size === 'small' ? '30%' : size === 'medium' ? '50%' : '80%';
  }
  return (
    <Drawer
      className="custom-modal"
      title={title}
      placement={placement}
      onClose={onClose}
      open={visible}
      width={width}
      height={height}
      {...props}
    >
      {children}
    </Drawer>
  );
};

export default CustomModal;
