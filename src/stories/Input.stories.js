import React from 'react';
import { Input } from 'antd';

export default {
  title: 'Ant Design/Input',
  component: Input,
  argTypes: {
    size: {
      options: ['large', 'middle', 'small'],
      control: { type: 'radio' }
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    allowClear: { control: 'boolean' },
    bordered: { control: 'boolean' },
    maxLength: { control: 'number' },
    onChange: { action: 'changed' },
    onPressEnter: { action: 'enter pressed' },
  },
};

const InputTemplate = (args) => <Input {...args} />;
const SearchTemplate = (args) => <Input.Search {...args} />;
const PasswordTemplate = (args) => <Input.Password {...args} />;
const TextAreaTemplate = (args) => <Input.TextArea {...args} />;

export const Default = InputTemplate.bind({});
Default.args = {
  placeholder: 'Please input',
  size: 'middle',
};

export const Search = SearchTemplate.bind({});
Search.args = {
  placeholder: 'Search...',
  allowClear: true,
  enterButton: 'Search',
  size: 'middle',
};

export const Password = PasswordTemplate.bind({});
Password.args = {
  placeholder: 'Input password',
  size: 'middle',
};

export const TextArea = TextAreaTemplate.bind({});
TextArea.args = {
  placeholder: 'Input text area',
  rows: 4,
};

export const DisabledInput = InputTemplate.bind({});
DisabledInput.args = {
  placeholder: 'Disabled input',
  disabled: true,
};

export const InputWithClearButton = InputTemplate.bind({});
InputWithClearButton.args = {
  placeholder: 'Input with clear button',
  allowClear: true,
};

export const InputWithMaxLength = InputTemplate.bind({});
InputWithMaxLength.args = {
  placeholder: 'Input with max length',
  maxLength: 10,
};