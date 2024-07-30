import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

export default {
  title: 'Ant Design/Input',
  component: Input,
  argTypes: {
    size: {
      options: ['large', 'middle', 'small'],
      control: { type: 'radio' },
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    allowClear: { control: 'boolean' },
    bordered: { control: 'boolean' },
    maxLength: { control: 'number' },
    onChange: { action: 'changed' },
    onPressEnter: { action: 'enter pressed' },
    addonBefore: { control: 'text' },
    addonAfter: { control: 'text' },
    prefix: { control: 'text' },
    suffix: { control: 'text' },
    style: { control: 'object' },
    className: { control: 'text' },
  },
};

const InputTemplate = (args) => <Input {...args} />;
const SearchTemplate = (args) => <Search {...args} />;
const PasswordTemplate = (args) => <Input.Password {...args} />;
const TextAreaTemplate = (args) => <Input.TextArea {...args} />;

export const Default = InputTemplate.bind({});
Default.args = {
  placeholder: 'Please input',
  size: 'middle',
};

export const CustomSearch = SearchTemplate.bind({});
CustomSearch.args = {
  placeholder: '팀명을 입력하세요.',
  allowClear: true,
  prefix: <SearchOutlined style={{ marginRight: 8 }} />,
  enterButton: (
    <Button type="primary" size="large">
      검색
    </Button>
  ),
  size: 'large',
  style: { width: '20rem' },
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
