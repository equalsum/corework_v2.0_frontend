import React from 'react';
import { Tabs } from 'antd';

export default {
  title: 'Ant Design/Tabs',
  component: Tabs,
  argTypes: {
    defaultActiveKey: { control: 'text' },
    type: {
      options: ['line', 'card', 'editable-card'],
      control: { type: 'select' },
    },
    size: {
      options: ['large', 'default', 'small'],
      control: { type: 'radio' },
    },
    tabPosition: {
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'select' },
    },
    centered: { control: 'boolean' },
    animated: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
};

const Template = (args) => (
  <Tabs
    {...args}
    items={[
      {
        key: '1',
        label: 'Tab 1',
        children: 'Content of Tab Pane 1',
      },
      {
        key: '2',
        label: 'Tab 2',
        children: 'Content of Tab Pane 2',
      },
      {
        key: '3',
        label: 'Tab 3',
        children: 'Content of Tab Pane 3',
      },
    ]}
  />
);

export const Default = Template.bind({});
Default.args = {
  defaultActiveKey: '1',
  onChange: () => {},
  size: 'default',
  tabPosition: 'top',
  type: 'line',
};

export const CardType = Template.bind({});
CardType.args = {
  ...Default.args,
  type: 'card',
};

export const VerticalTabs = Template.bind({});
VerticalTabs.args = {
  ...Default.args,
  tabPosition: 'left',
  style: { height: 220 },
};
