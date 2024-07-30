import React from 'react';
import { Tabs } from 'antd';

// Ant Design Tabs 컴포넌트에 대한 Storybook 설정
export default {
  title: 'Ant Design/Tabs', // 스토리 제목
  component: Tabs, // 렌더링할 컴포넌트
  argTypes: {
    defaultActiveKey: { control: 'text' }, // 기본 활성 탭 키에 대한 컨트롤
    type: {
      options: ['line', 'card', 'editable-card'], // 탭 유형 옵션
      control: { type: 'select' }, // 탭 유형에 대한 컨트롤 타입
    },
    size: {
      options: ['large', 'default', 'small'], // 탭 크기 옵션
      control: { type: 'radio' }, // 탭 크기에 대한 컨트롤 타입
    },
    tabPosition: {
      options: ['top', 'right', 'bottom', 'left'], // 탭 위치 옵션
      control: { type: 'select' }, // 탭 위치에 대한 컨트롤 타입
    },
    centered: { control: 'boolean' }, // 중앙 정렬 탭에 대한 컨트롤
    animated: { control: 'boolean' }, // 애니메이션 탭에 대한 컨트롤
    tabBarGutter: { control: 'number' }, // 탭 사이의 간격에 대한 컨트롤
    tabBarStyle: { control: 'object' }, // 탭 바 스타일에 대한 컨트롤
    tabBarExtraContent: { control: 'text' }, // 탭 바에 추가 콘텐츠에 대한 컨트롤
    destroyInactiveTabPane: { control: 'boolean' }, // 비활성 탭 패널을 삭제할지 여부에 대한 컨트롤
    hideAdd: { control: 'boolean' }, // editable-card 유형에서 추가 버튼 숨김에 대한 컨트롤
    onChange: { action: 'changed' }, // 탭 변경 이벤트에 대한 액션
  },
};

// args를 사용하여 Tabs 컴포넌트를 렌더링하는 템플릿
const Template = (args) => (
  <Tabs
    {...args} // args를 Tabs 컴포넌트에 전달
    items={[
      {
        key: '1', // 탭 1의 키
        label: 'Tab 1', // 탭 1의 라벨
        children: 'Content of Tab Pane 1', // 탭 패널 1의 콘텐츠
      },
      {
        key: '2', // 탭 2의 키
        label: 'Tab 2', // 탭 2의 라벨
        children: 'Content of Tab Pane 2', // 탭 패널 2의 콘텐츠
      },
      {
        key: '3', // 탭 3의 키
        label: 'Tab 3', // 탭 3의 라벨
        children: 'Content of Tab Pane 3', // 탭 패널 3의 콘텐츠
      },
    ]}
  />
);

// 기본 스토리 설정
export const Default = Template.bind({});
Default.args = {
  defaultActiveKey: '1', // 기본 활성 탭 키
  onChange: () => {}, // onChange 이벤트에 대한 빈 함수
  size: 'default', // 기본 탭 크기
  tabPosition: 'top', // 기본 탭 위치
  type: 'line', // 기본 탭 유형
  tabBarGutter: 16, // 기본 탭 사이의 간격
  tabBarStyle: {}, // 기본 탭 바 스타일
  tabBarExtraContent: '', // 기본 탭 바 추가 콘텐츠
  destroyInactiveTabPane: false, // 기본 비활성 탭 패널 삭제 설정
  hideAdd: false, // 기본 editable-card 유형에서 추가 버튼 숨김 설정
};
