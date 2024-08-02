import React, { useState, useEffect } from 'react';
import { Checkbox, Space } from 'antd';

export default {
  title: 'Ant Design/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export const Default = (args) => <Checkbox {...args}>Checkbox</Checkbox>;
Default.args = {
  checked: false,
  disabled: false,
};

// Basic Checkbox
export const Basic = () => <Checkbox>Checkbox</Checkbox>;

// Disabled Checkbox
export const Disabled = () => (
  <Space direction="vertical">
    <Checkbox disabled={true}>Disabled Checkbox</Checkbox>
    <Checkbox disabled={true} checked={true}>
      Disabled Checked Checkbox
    </Checkbox>
  </Space>
);

// Checkbox Group
export const CheckboxGroup = () => {
  const [value, setValue] = useState([]);
  const [options, setOptions] = useState(['Apple', 'Pear', 'Orange']);
  const [Disabled, setDisabled] = useState(false);

  const onChange = (checkedValues) => {
    setValue(checkedValues);
  };

  return <Checkbox.Group options={options} value={value} onChange={onChange} disabled={Disabled} />;
};

export const CheckAll = () => {
  const [options, setOptions] = useState(['Apple', 'Pear', 'Orange']);
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    setIndeterminate(!!checkedList.length && checkedList.length < options.length);
    setCheckAll(checkedList.length === options.length);
  }, [checkedList, options]);

  const onCheckAllChange = (e) => {
    const newCheckedList = e.target.checked ? options : [];
    setCheckedList(newCheckedList);
  };

  const onCheckedListChange = (list) => {
    setCheckedList(list);
  };

  return (
    <Space direction="vertical">
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} disabled={false}>
        Check all
      </Checkbox>
      <Checkbox.Group options={options} value={checkedList} onChange={onCheckedListChange} disabled={false} />
    </Space>
  );
};
