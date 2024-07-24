import React from 'react';
import CustomDropdown from '../pages/publishing/comp/CustomDropdown';

export default {
  title: 'Components/CustomDropdown',
  component: CustomDropdown,
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight'],
    },
    triggerType: {
      control: { type: 'inline-check' },
      options: ['hover', 'click'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    labelText: {
      control: 'text',
    },
    SecLabelText: {
      control: 'text',
    },
  },
};

const Template = (args) => {
  const items = [
    { value: '1', label: '멤버 1', onClick: () => console.log('멤버 1 선택') },
    { value: '2', label: '멤버 2', onClick: () => console.log('멤버 2 선택') },
    { value: '3', label: '멤버 3', onClick: () => console.log('멤버 3 선택') },
  ];

  return (
    <>
      <CustomDropdown items={items} {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  placement: 'bottomRight',
  triggerType: ['click'],
  size: 'medium',
  labelText: '멤버',
  SecLabelText: '명',
};

Default.parameters = {
  docs: {
    source: {
      code: `
() => {
  const items = [
    { value: '1', label: '멤버 1', onClick: () => console.log('멤버 1 선택') },
    { value: '2', label: '멤버 2', onClick: () => console.log('멤버 2 선택') },
    { value: '3', label: '멤버 3', onClick: () => console.log('멤버 3 선택') },
  ];

  return (
    <CustomDropdown
      placement="bottomRight"
      size="medium"
      labelText="멤버"
      SecLabelText="명"
      items={items}
      triggerType={['click']}
    />
  );
}
      `,
    },
  },
};
