import React from 'react';
import { DatePicker, Space, ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import koKR from 'antd/lib/locale/ko_KR';

dayjs.locale('ko');

const { RangePicker } = DatePicker;

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
  },
  decorators: [(Story) => <ConfigProvider locale={koKR}>{Story()}</ConfigProvider>],
};

export const Default = (args) => {
  return (
    <Space direction="vertical" size={12}>
      <DatePicker {...args} />
      <DatePicker {...args} showTime />
      <RangePicker {...args} />
      <RangePicker {...args} showTime />
    </Space>
  );
};

Default.args = {
  bordered: true,
  disabled: false,
  size: 'middle',
  picker: 'date',
};

export const CustomFormat = (args) => {
  const dateFormat = 'YYYY년 MM월 DD일';
  const weekFormat = 'YYYY년 wo주';
  const monthFormat = 'YYYY년 MM월';

  const dateFormatList = ['YYYY년 MM월 DD일', 'YY년 MM월 DD일', 'YYYY-MM-DD', 'YY-MM-DD'];

  const customFormat = (value) => `커스텀 형식: ${value.format(dateFormat)}`;

  return (
    <Space direction="vertical" size={12}>
      <DatePicker defaultValue={dayjs('2015/01/01', 'YYYY/MM/DD')} format={dateFormat} />
      <DatePicker defaultValue={dayjs('2015/01', 'YYYY/MM')} format={monthFormat} picker="month" />
      <DatePicker defaultValue={dayjs()} format={customFormat} />
      <RangePicker
        defaultValue={[dayjs('2015/01/01', 'YYYY/MM/DD'), dayjs('2015/01/01', 'YYYY/MM/DD')]}
        format={dateFormat}
      />
      <DatePicker defaultValue={dayjs('2015/01/01', 'YYYY/MM/DD')} format={dateFormatList} />
    </Space>
  );
};

export const DisabledDate = (args) => {
  const disabledDate = (current) => {
    return current && current < dayjs().endOf('day');
  };

  return (
    <Space direction="vertical" size={12}>
      <DatePicker disabledDate={disabledDate} />
      <RangePicker disabledDate={disabledDate} />
    </Space>
  );
};

DisabledDate.args = {
  bordered: true,
  disabled: false,
  size: 'middle',
  picker: 'date',
};
