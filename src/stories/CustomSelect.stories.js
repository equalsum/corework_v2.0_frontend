import React, { useState } from 'react';
import CustomSelect from '../pages/publishing/comp/CustomSelect';

export default {
  title: 'Components/CustomSelect',
  component: CustomSelect,
  argTypes: {
    size: {
      options: ['small', 'middle', 'large'],
      control: { type: 'radio' },
      description: '선택 컴포넌트의 크기를 결정합니다.',
    },
    showProfileInfo: {
      control: 'boolean',
      description: '프로필 정보(이미지, 부서 등)를 표시할지 여부를 결정합니다.',
    },
    placeholder: {
      control: 'text',
      description: '선택하기 전 표시될 안내 텍스트입니다.',
    },
    searchPlaceholder: {
      control: 'text',
      description: '검색 입력 필드에 표시될 안내 텍스트입니다.',
    },
    mode: {
      options: ['default', 'multiple', 'tags'],
      control: { type: 'radio' },
      description: '선택 모드를 결정합니다. (단일/다중/태그)',
    },
    notFoundContent: {
      control: 'text',
      description: '검색 결과가 없을 때 표시할 안내 텍스트입니다.',
    },
  },
};

export const Default = (args) => {
  const [selectedLeader, setSelectedLeader] = useState(null);

  const leaderOptions = [
    { value: '1', name: '홍길동', department: '개발팀', profileImage: 'https://example.com/user1.jpg' },
    { value: '2', name: '김철수', department: '디자인팀', profileImage: 'https://example.com/user2.jpg' },
    { value: '3', name: '이영희', department: '마케팅팀', profileImage: 'https://example.com/user3.jpg' },
  ];

  const handleLeaderSelect = (value) => {
    const selected = leaderOptions.find((leader) => leader.value === value);
    setSelectedLeader(selected);
  };

  return (
    <CustomSelect
      options={leaderOptions}
      placeholder={selectedLeader ? selectedLeader.name : '팀 리더 선택'}
      onSelect={handleLeaderSelect}
      selectedValue={selectedLeader?.value}
      searchPlaceholder="리더 검색"
      labelKey="name"
      showProfileInfo={true}
      profileImageKey="profileImage"
      nameKey="name"
      departmentKey="department"
      {...args}
    />
  );
};

const LeaderSelectTemplate = () => {
  const [selectedLeader, setSelectedLeader] = useState(null);

  const leaderOptions = [
    { value: '1', name: '홍길동', department: '개발팀', profileImage: 'https://example.com/user1.jpg' },
    { value: '2', name: '김철수', department: '디자인팀', profileImage: 'https://example.com/user2.jpg' },
    { value: '3', name: '이영희', department: '마케팅팀', profileImage: 'https://example.com/user3.jpg' },
  ];

  const handleLeaderSelect = (value) => {
    const selected = leaderOptions.find((leader) => leader.value === value);
    setSelectedLeader(selected);
  };

  return (
    <CustomSelect
      options={leaderOptions}
      placeholder={selectedLeader ? selectedLeader.name : '팀 리더 선택'}
      onSelect={handleLeaderSelect}
      selectedValue={selectedLeader?.value}
      searchPlaceholder="리더 검색"
      notFoundContent={{
        empty: '리더가 없습니다. 리더를 추가해주세요.',
        noResults: '검색 결과가 없습니다.',
      }}
      labelKey="name"
      showProfileInfo={true}
      profileImageKey="profileImage"
      nameKey="name"
      departmentKey="department"
    />
  );
};

export const LeaderSelect = LeaderSelectTemplate.bind({});

const TeamSelectTemplate = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const teamOptions = [
    { value: '1', label: '개발팀' },
    { value: '2', label: '디자인팀' },
    { value: '3', label: '마케팅팀' },
  ];

  const handleTeamSelect = (value) => {
    const selected = teamOptions.find((team) => team.value === value);
    setSelectedTeam(selected);
  };

  return (
    <CustomSelect
      options={teamOptions}
      placeholder={selectedTeam ? selectedTeam.label : '상위 팀 선택'}
      onSelect={handleTeamSelect}
      selectedValue={selectedTeam?.value}
      searchPlaceholder="팀 검색"
      notFoundContent={{
        empty: '팀이 없습니다. 팀을 추가해주세요.',
        noResults: '검색 결과가 없습니다.',
      }}
      labelKey="label"
      showProfileInfo={false}
    />
  );
};

export const TeamSelect = TeamSelectTemplate.bind({});

const MemberSelectTemplate = () => {
  const [selectedMembers, setSelectedMembers] = useState([]);

  const memberOptions = [
    { value: '1', name: '홍길동', department: '개발팀', profileImage: 'https://example.com/user1.jpg' },
    { value: '2', name: '김철수', department: '디자인팀', profileImage: 'https://example.com/user2.jpg' },
    { value: '3', name: '이영희', department: '마케팅팀', profileImage: 'https://example.com/user3.jpg' },
  ];

  const handleMemberSelect = (value) => {
    setSelectedMembers(value);
  };

  return (
    <CustomSelect
      options={memberOptions}
      placeholder="멤버 선택"
      onSelect={handleMemberSelect}
      selectedValue={selectedMembers}
      searchPlaceholder="멤버 검색"
      notFoundContent={{
        empty: '멤버가 없습니다. 멤버를 추가해주세요.',
        noResults: '검색 결과가 없습니다.',
      }}
      labelKey="name"
      showProfileInfo={true}
      nameKey="name"
      departmentKey="department"
      mode="multiple"
      numberNum={selectedMembers.length}
    />
  );
};

export const MemberSelect = MemberSelectTemplate.bind({});
