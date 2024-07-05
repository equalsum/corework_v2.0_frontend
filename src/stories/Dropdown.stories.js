import React, { useState } from 'react';
import { Dropdown, Space } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

export default {
  title: 'Ant Design/Dropdown',
  component: Dropdown,
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight'],
    },
    trigger: {
      control: { type: 'inline-check' },
      options: ['hover', 'click'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the dropdown menu',
    },
  },
};

const Template = ({ size, ...args }) => {
  const items = [
    { key: '1', label: '멤버 1' },
    { key: '2', label: '멤버 2' },
    { key: '3', label: '멤버 3' },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMembersClick = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleVisibleChange = (visible) => {
    setIsDropdownOpen(visible);
  };

  // 크기에 따른 스타일 정의 (rem 단위 사용)
  const sizeStyles = {
    small: { width: '10rem', maxHeight: '15rem' },
    medium: { width: '15rem', maxHeight: '20rem' },
    large: { width: '20rem', maxHeight: '25rem' },
  };

  const dropdownStyle = sizeStyles[size] || sizeStyles.medium;

  return (
    <Dropdown
      menu={{
        items,
        style: dropdownStyle,
      }}
      {...args}
      onOpenChange={handleVisibleChange}
    >
      <a onClick={handleMembersClick}>
        <Space>
          멤버 <span>{items.length}명</span>
          {isDropdownOpen ? <UpOutlined /> : <DownOutlined />}
        </Space>
      </a>
    </Dropdown>
  );
};

export const Default = Template.bind({});
Default.args = {
  placement: 'bottomLeft',
  trigger: ['click'],
  size: 'medium',
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  placement: 'bottomLeft',
  trigger: ['click'],
  size: 'small',
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  placement: 'bottomLeft',
  trigger: ['click'],
  size: 'large',
};

export const HoverTrigger = Template.bind({});
HoverTrigger.args = {
  placement: 'bottomLeft',
  trigger: ['hover'],
  size: 'medium',
};

export const TopPlacement = Template.bind({});
TopPlacement.args = {
  placement: 'topLeft',
  trigger: ['click'],
  size: 'medium',
};
