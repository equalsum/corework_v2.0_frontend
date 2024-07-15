import React, { useState } from 'react';
import { Tabs, Button, Select, Input, message } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import AdminLayout from '@layout/Layout';
import CustomDropdown from 'pages/publishing/comp/CustomDropdown';
import EmptyContent from 'pages/publishing/comp/EmptyContent';

const { Option } = Select;
const { Search } = Input;

const Orgchart01 = () => {
  // 페이지 정보 설정
  const breadcrumbItems = {
    mainTitle: '조직도 관리',
    describeTitle: '팀을 일괄 또는 개별로 추가한 후 순서를 편집하여 조직도를 구성하세요.',
  };
  const pageName = 'organ-page';

  // 초기 팀 데이터
  const initialTeams = [];

  // 상태 관리
  const [teams, setTeams] = useState(initialTeams);
  const [teamItemShow, setTeamItemShow] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [searchValue, setSearchValue] = useState('');
  const [showLeaderSelect, setShowLeaderSelect] = useState({});
  const [selectedLeader, setSelectedLeader] = useState({});
  const [expandedTeams, setExpandedTeams] = useState({});
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [editingTeamName, setEditingTeamName] = useState('');

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

  // 팀 이름 유효성 검사 함수
  const isValidTeamName = (name) => {
    const regex = /^[가-힣a-zA-Z0-9\s._-]{1,50}$/;
    return regex.test(name);
  };

  // 팀 추가 함수
  const addTeam = () => {
    const newTeam = {
      id: `team-${Date.now()}`,
      name: '',
      children: [],
    };
    setTeams((prevTeams) => [...prevTeams, newTeam]);
    setEditingTeamId(newTeam.id);
    setTeamItemShow(false);
  };

  // 팀 이름 편집 저장
  const saveTeamName = () => {
    if (isValidTeamName(editingTeamName)) {
      setTeams((prevTeams) =>
        prevTeams.map((team) => (team.id === editingTeamId ? { ...team, name: editingTeamName } : team))
      );
      setEditingTeamId(null);
      setEditingTeamName('');
      setTeamItemShow(true);
    } else {
      message.error('팀명은 문자/숫자/여백/특수문자(. - _)만 사용 가능하며, 50자 이내여야 합니다.');
    }
  };

  // 팀 삭제 함수
  const deleteTeam = (teamId) => {
    setTeams((prevTeams) => prevTeams.filter((team) => team.id !== teamId));
  };

  // 팀 이름 편집 시작
  const startEditing = (team) => {
    setEditingTeamId(team.id);
    setEditingTeamName(team.name);
  };

  // 팀 확장/축소 토글 함수
  const toggleTeam = (teamId) => {
    setExpandedTeams((prev) => ({
      ...prev,
      [teamId]: !prev[teamId],
    }));
  };

  // 전체 팀 수를 계산하는 함수
  const countAllTeams = (teams) => {
    return teams.length;
  };

  // 팀 이름 편집 취소
  const cancelEditing = () => {
    setEditingTeamId(null);
    setEditingTeamName('');
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
              icon={expandedTeams[team.id] ? <i className="icon-outlined"></i> : <RightOutlined />}
              onClick={() => toggleTeam(team.id)}
            />
          ) : (
            <Button type="default" ghost className="none-event">
              <span className="team-dot"></span>
            </Button>
          )}
        </div>
        <div className="team-info flex aic gap32 flex-grow">
          {editingTeamId === team.id ? (
            <div className="flex aic gap8">
              <Input
                value={editingTeamName}
                onChange={(e) => setEditingTeamName(e.target.value)}
                onPressEnter={saveTeamName}
              />
              <Button type="primary" size="large" onClick={saveTeamName}>
                추가
              </Button>

              {teamItemShow && (
                <>
                  <Button type="default" size="large" onClick={cancelEditing}>
                    취소
                  </Button>
                </>
              )}

              {!teamItemShow && (
                <Button type="default" size="large" onClick={() => deleteTeam(team.id)}>
                  <i className="icon-closeOutlined"></i>
                </Button>
              )}
            </div>
          ) : (
            <h3 className="team-name" onClick={() => startEditing(team)}>
              {team.name}
            </h3>
          )}

          {teamItemShow && (
            <>
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
                className="custom-dropdown none-event"
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
            </>
          )}
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
                  <header className="task-header flex jcb aic">
                    {/* 왼쪽 액션 버튼들 */}
                    <div className="left-actions flex aic gap8">
                      <Button size="large" type="primary">
                        <i className="icon-download"></i> 일괄 추가
                      </Button>
                      <Button size="large" type="primary" onClick={addTeam}>
                        <i className="icon-plus"></i> 팀 추가
                      </Button>
                      <Button size="large" type="default">
                        <i className="icon-sorter"></i>순서 편집
                      </Button>
                    </div>
                    {/* 오른쪽 검색 바 */}
                    <div className="right-actions flex aic gap16">
                      <Search
                        placeholder="팀명을 입력하세요."
                        allowClear
                        prefix={<i className="icon-search" style={{ marginRight: 8 }} />}
                        enterButton={
                          <Button type="primary" size="large">
                            검색
                          </Button>
                        }
                        size="large"
                      />
                    </div>
                  </header>
                  {/* 메인 컨텐츠 */}
                  <main className="task-content">
                    {teams.length === 0 && (
                      <div className="task-input-container">
                        <Button size="large" type="text" className="task-btn" onClick={addTeam}>
                          <i className="icon-plus-circle"></i> 팀 추가
                        </Button>
                      </div>
                    )}
                    <div className="task-list">
                      {teams.length === 0 ? (
                        <EmptyContent message="아직 팀이 없습니다." />
                      ) : (
                        <>
                          <div className="all-num">
                            전체 <span>{countAllTeams(teams)}</span>
                          </div>
                          <ul className="team-list">{teams.map((team) => renderTeamItem(team))}</ul>
                        </>
                      )}
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
