import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export const DatePickerExamples = (args) => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDates((prev) => {
        const dateStr = date.format('YYYY-MM-DD');
        if (prev.includes(dateStr)) {
          return prev.filter((d) => d !== dateStr);
        } else {
          return [...prev, dateStr];
        }
      });
    }
  };

  const isDateSelected = (current) => {
    const dateStr = current.format('YYYY-MM-DD');
    return selectedDates.includes(dateStr);
  };

  const dateRender = (current) => {
    const style = {};
    if (isDateSelected(current)) {
      style.border = '1px solid #1890ff';
      style.borderRadius = '50%';
    }
    return (
      <div className="ant-picker-cell-inner" style={style}>
        {current.date()}
      </div>
    );
  };

  return (
    <Space direction="vertical" size={12}>
      <DatePicker {...args} />
      <DatePicker {...args} showTime />
      <RangePicker {...args} />
      <RangePicker {...args} showTime />
      <DatePicker
        {...args}
        onChange={handleDateChange}
        dateRender={dateRender}
        disabledDate={isDateSelected}
        multiple
      />
      <div>선택된 날짜: {selectedDates.join(', ')}</div>
    </Space>
  );
};

export default {
  title: 'Ant Design/DatePicker',
  component: DatePicker,
  argTypes: {
    bordered: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      options: ['small', 'middle', 'large'],
      control: { type: 'radio' },
    },
    picker: {
      options: ['date', 'week', 'month', 'quarter', 'year'],
      control: { type: 'select' },
    },
    showTime: { control: 'boolean' },
    multiple: { control: 'boolean' },
  },
};

DatePickerExamples.args = {
  bordered: true,
  disabled: false,
  size: 'middle',
  picker: 'date',
  showTime: false,
  multiple: false,
};
