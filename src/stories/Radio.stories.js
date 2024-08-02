import React, { useState } from 'react';
import { Radio, Space } from 'antd';

export default {
  title: 'Ant Design/Radio',
  component: Radio,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      options: ['small', 'middle', 'large'],
      control: { type: 'radio' },
    },
  },
};

export const Default = (args) => <Radio {...args}>Radio</Radio>;
Default.args = {
  checked: false,
  disabled: false,
  size: 'middle',
};

// Basic Radio
export const Basic = () => <Radio>Radio</Radio>;

// Disabled Radio
export const Disabled = () => (
  <Space direction="vertical">
    <Radio disabled={true}>Disabled Radio</Radio>
    <Radio disabled={true} checked={true}>
      Disabled Checked Radio
    </Radio>
  </Space>
);

// Radio Group
export const RadioGroup = () => {
  const [value, setValue] = useState(null);
  const options = ['Apple', 'Pear', 'Orange'];
  const [disabled, setDisabled] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return <Radio.Group options={options} value={value} onChange={onChange} disabled={disabled} />;
};

// Solid Radio Button
export const SolidRadioButton = () => {
  const [value, setValue] = useState('a');

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Space direction="vertical">
      <Radio.Group onChange={onChange} value={value} buttonStyle="solid" size="large">
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b">Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>

      <Radio.Group onChange={onChange} value={value} buttonStyle="solid" size="middle">
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b">Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>

      <Radio.Group onChange={onChange} value={value} buttonStyle="solid" size="small">
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b">Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>
    </Space>
  );
};
