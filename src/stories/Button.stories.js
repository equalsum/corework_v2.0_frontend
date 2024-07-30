import React from 'react';
import { Button } from 'antd';
export default {
  title: 'Ant Design/Button',
  component: Button,
  argTypes: {
    type: {
      options: ['primary', 'default', 'dashed', 'text', 'link'],
      control: { type: 'select' },
    },
    size: {
      options: ['large', 'middle', 'small'],
      control: { type: 'radio' },
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    ghost: { control: 'boolean' },
    danger: { control: 'boolean' },
    block: { control: 'boolean' },
    icon: { control: 'text' },
    onClick: { action: 'clicked' },
    shape: {
      options: ['default', 'circle', 'round'],
      control: { type: 'radio' },
    },
    style: { control: 'object' },
    className: { control: 'text' },
  },
};
export const Default = (args) => <Button {...args}>Button</Button>;
Default.args = {
  type: 'default',
  size: 'middle',
};
