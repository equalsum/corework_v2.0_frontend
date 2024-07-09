import React, { useState } from 'react';
import { Tabs, Button, Select } from 'antd';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import AdminLayout from '@layout/Layout';
import CustomDropdown from 'pages/publishing/comp/CustomDropdown';
import ActionButtons from 'pages/publishing/comp/ActionBtns';

const { Option } = Select;

const Orgchart01 = () => {
  // 페이지 정보 설정
  const breadcrumbItems = {
    mainTitle: '조직도 관리',
    describeTitle: '팀을 일괄 또는 개별로 추가한 후 순서를 편집하여 조직도를 구성하세요.',
  };
  const pageName = 'organ-page';

  // 초기 팀 데이터
  const initialTeams = [
    {
      id: '1',
      name: '최고경영진',
      children: [
        {
          id: '1-1',
          name: '전략기획부',
          children: [
            {
              id: '1-1-1',
              name: '전략기획팀',
              children: [
                {
                  id: '1-1-1-1',
                  name: '장기전략팀',
                  children: [
                    { id: '1-1-1-1-1', name: '비전수립팀', children: [] },
                    { id: '1-1-1-1-2', name: '목표설정팀', children: [] },
                  ],
                },
                { id: '1-1-1-2', name: '단기전략팀', children: [] },
              ],
            },
            { id: '1-1-2', name: '경영분석팀', children: [] },
          ],
        },
        {
          id: '1-2',
          name: '인사부',
          children: [
            { id: '1-2-1', name: '인사팀', children: [] },
            { id: '1-2-2', name: '교육팀', children: [] },
            { id: '1-2-3', name: '복지팀', children: [] },
          ],
        },
      ],
    },
  ];

  // 상태 관리
  const [teams, setTeams] = useState(initialTeams);
  const [searchValue, setSearchValue] = useState('');
  const [showLeaderSelect, setShowLeaderSelect] = useState({});
  const [selectedLeader, setSelectedLeader] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [expandedTeams, setExpandedTeams] = useState({});

  const leaderOptions = [
    { value: 'kang', label: '강민식', department: '전략기획팀 / DX리드' },
    { value: 'kang2', label: '이찬용', department: '전략기획팀22/ DX리드' },
    { value: 'kang3', label: '강민식', department: '전략기획팀 / DX리드' },
    { value: 'kang4', label: '강민식33', department: '전략기획팀 / DX리드' },
  ];

  // 검색어에 따른 필터링된 리더 옵션
  const filteredOptions = leaderOptions.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  // 리더 선택 토글 함수
  const handleLeaderClick = (teamId) => {
    setShowLeaderSelect((prev) => ({
      ...prev,
      [teamId]: !prev[teamId],
    }));
  };

  // 리더 선택 함수
  const handleLeaderSelect = (value, teamId) => {
    const leader = leaderOptions.find((leader) => leader.value === value);
    setSelectedLeader((prev) => ({
      ...prev,
      [teamId]: leader,
    }));
    setShowLeaderSelect((prev) => ({
      ...prev,
      [teamId]: false,
    }));
  };

  // 팀 메뉴 아이템
  const teamMenuItems = [
    {
      key: '1',
      label: '팀 정보 설정',
      onClick: () => console.log('1'),
    },
    {
      key: '2',
      label: '팀 종료 전환',
      onClick: () => console.log('2'),
    },
  ];

  // 팀 구성원 데이터
  const teamMembers = [
    { value: 'kang', label: '강민식', department: '진단개발 / DX리드' },
    { value: 'kang', label: '강민식', department: '진단개발 / DX리드' },
    { value: 'kang', label: '강민식', department: '진단개발 / DX리드' },
    { value: 'kang', label: '강민식', department: '진단개발 / DX리드' },
    { value: 'kang', label: '강민식', department: '진단개발 / DX리드' },
    { value: 'kang', label: '강민식', department: '진단개발 / DX리드' },
    { value: 'kang', label: '강민식', department: '진단개발 / DX리드' },
  ];

  // 리더 옵션 렌더링 함수
  const renderOption = (leader) => (
    <div className="profile-wrap">
      <div className="left">
        <span className="profile-image"></span>
        <span>{leader.label}</span>
      </div>
      <span className="department">{leader.department}</span>
    </div>
  );

  // 팀 구성원 메뉴 아이템 생성
  const memberMenuItems = teamMembers.map((member) => ({
    key: member.value,
    label: renderOption(member),
  }));

  // 전체 팀 수를 계산하는 함수
  const countAllTeams = (teams) => {
    let count = 0;
    for (const team of teams) {
      count += 1;
      if (team.children) {
        count += countAllTeams(team.children);
      }
    }
    return count;
  };

  // 팀 확장/축소 토글 함수
  const toggleTeam = (teamId) => {
    setExpandedTeams((prev) => ({
      ...prev,
      [teamId]: !prev[teamId],
    }));
  };

  //팀 아이템을 렌더링하는 함수
  const renderTeamItem = (team, level = 0) => (
    <li key={team.id} className={`level-${level}`}>
      <div className="team-content flex aic gap16">
        <div className="team-indent" style={{ width: `${level * 20}px` }}></div>
        <div className="team-toggle">
          {team.children && team.children.length > 0 ? (
            <Button
              type="text"
              icon={expandedTeams[team.id] ? <i class="icon-outlined"></i> : <RightOutlined />}
              onClick={() => toggleTeam(team.id)}
            />
          ) : (
            <Button type="default" ghost>
              <span className="team-dot"></span>
            </Button>
          )}
        </div>
        <div className="team-info flex aic gap32 flex-grow">
          <h3 className="team-name">{team.name}</h3>

          {/* 팀 리더 선택 UI */}
          {!showLeaderSelect[team.id] ? (
            <div className="team-leader">
              <div onClick={() => handleLeaderClick(team.id)}>
                {selectedLeader[team.id] ? (
                  <div className="profile-wrap">
                    <div className="left">
                      <span className="profile-image"></span>
                      <span className="profile-name">{selectedLeader[team.id].label}</span>
                    </div>
                    <span className="department">{selectedLeader[team.id].department}</span>
                  </div>
                ) : (
                  <div className="team-leader-assignment">
                    <span className="icon">
                      <i className="icon-user"></i>
                    </span>
                    팀 리더
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="leader-select-container" style={{ position: 'relative' }}>
              <Select
                className="custom-select"
                placeholder={selectedLeader[team.id] ? selectedLeader[team.id].label : '리더 선택'}
                onChange={(value) => handleLeaderSelect(value, team.id)}
                value={selectedLeader[team.id]?.value}
                dropdownStyle={{ minWidth: '200px', maxHeight: '300px' }}
                getPopupContainer={(trigger) => trigger.parentNode}
              >
                {filteredOptions.map((leader) => (
                  <Option key={leader.value} value={leader.value} label={leader.label}>
                    {renderOption(leader)}
                  </Option>
                ))}
              </Select>
            </div>
          )}

          {/* 팀원 드롭다운 */}
          <CustomDropdown
            items={memberMenuItems}
            buttonText="팀원"
            size="large"
            className="custom-dropdown"
            buttonClassName="custom-button"
          />

          {/* 팀 메뉴 드롭다운 */}
          <CustomDropdown
            items={teamMenuItems}
            placement="bottomRight"
            triggerType={(['click'], ['hover'])}
            size="small"
            onOpenChange={(visible) => {
              console.log('Dropdown visibility changed:', visible);
            }}
          >
            <Button type="default" size="large" ghost>
              <i className="icon-dots-vertical"></i>
            </Button>
          </CustomDropdown>
        </div>
      </div>
      {team.children && team.children.length > 0 && expandedTeams[team.id] && (
        <ul className="team-list">{team.children.map((childTeam) => renderTeamItem(childTeam, level + 1))}</ul>
      )}
    </li>
  );

  return (
    <AdminLayout breadcrumbItems={breadcrumbItems} pageClass={pageName}>
      <div className="tab-panel">
        <Tabs
          defaultActiveKey="1"
          onChange={() => {}}
          size="default"
          tabPosition="top"
          type="line"
          items={[
            {
              label: (
                <>
                  운영 중인 팀 <span className="team-count">{countAllTeams(teams)}</span>
                </>
              ),
              key: '1',
              children: (
                <div className="task-manager">
                  {/* 헤더 섹션 */}
                  <header className="task-header flex aic gap16">
                    <div className="left-actions">순서편집</div>
                    <ActionButtons
                      cancelText="취소"
                      confirmText="저장"
                      onCancel={() => setIsEditMode(false)}
                      onConfirm={() => {
                        setIsEditMode(false);
                      }}
                    />
                  </header>
                  {/* 메인 컨텐츠 */}
                  <main className="task-content">
                    <div className="task-list">
                      <div className="all-num">
                        전체 <span>{countAllTeams(teams)}</span>
                      </div>
                      <ul className="team-list">{teams.map((team) => renderTeamItem(team))}</ul>
                    </div>
                  </main>
                </div>
              ),
            },
            {
              label: (
                <>
                  종료된 팀 <span className="team-count">0</span>
                </>
              ),
              key: '2',
              children: (
                <div>
                  종료된 팀 <span>0</span>
                </div>
              ),
            },
          ]}
        />
      </div>
    </AdminLayout>
  );
};

export default Orgchart01;
