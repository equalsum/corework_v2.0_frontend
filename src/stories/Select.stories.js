import React, { useState } from 'react';
import { Select, Input, Avatar } from 'antd';

const { Option } = Select;

export default {
  title: 'Ant Design/Select',
  component: Select,
  argTypes: {
    showLeaderSelect: { control: 'boolean' },
  },
};

const Template = ({ showLeaderSelect = true }) => {
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const leaderOptions = [
    { value: '1', label: '홍길동', department: '개발팀', imageUrl: 'https://example.com/user1.jpg' },
    { value: '2', label: '김철수', department: '디자인팀', imageUrl: 'https://example.com/user2.jpg' },
    { value: '3', label: '이영희', department: '마케팅팀', imageUrl: 'https://example.com/user3.jpg' },
  ];

  const filteredOptions = leaderOptions.filter((leader) =>
    leader.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleLeaderSelect = (value) => {
    const selected = leaderOptions.find((leader) => leader.value === value);
    setSelectedLeader(selected);
  };

  const handleLeaderClick = () => {
    // 리더 클릭 처리 로직
  };

  const renderOption = (leader) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={leader.imageUrl} size="small" style={{ marginRight: '8px' }} />
        <span>{leader.label}</span>
      </div>
      <span style={{ color: '#888' }}>{leader.department}</span>
    </div>
  );

  // ... (나머지 코드는 동일)

  return (
    <div className="leader-select-container" style={{ position: 'relative', width: '300px' }}>
      <Select
        className="custom-select"
        placeholder={selectedLeader ? selectedLeader.label : '리더 선택'}
        onChange={handleLeaderSelect}
        value={selectedLeader?.value}
        style={{ width: '100%' }}
        dropdownStyle={{ minWidth: '200px', maxHeight: '300px' }}
        dropdownRender={(menu) => (
          <div>
            <Input
              placeholder="리더 검색"
              style={{ margin: '8px' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {menu}
          </div>
        )}
        notFoundContent={
          leaderOptions.length === 0 ? '구성원이 없습니다. 구성원을 추가해주세요.' : '검색 결과가 없습니다.'
        }
        filterOption={false}
      >
        {filteredOptions.map((leader) => (
          <Option key={leader.value} value={leader.value} label={leader.label}>
            {renderOption(leader)}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  showLeaderSelect: true,
};

export const TeamLeaderDisplay = Template.bind({});
TeamLeaderDisplay.args = {
  showLeaderSelect: false,
};
