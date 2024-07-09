import React, { useState } from 'react';
import { Tabs, Button, Input, message, Tooltip, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import AdminLayout from '@layout/Layout';
import CustomDropdown from 'pages/publishing/comp/CustomDropdown';

const { Option } = Select;
const { Search } = Input;

const Orgchart01 = () => {
  // 페이지 정보 설정
  const breadcrumbItems = {
    mainTitle: '조직도 관리',
    describeTitle: '팀을 일괄 또는 개별로 추가한 후 순서를 편집하여 조직도를 구성하세요.',
  };
  const pageName = 'organ-page';

  // 상태 관리
  const [searchValue, setSearchValue] = useState('');
  const [showLeaderSelect, setShowLeaderSelect] = useState({});
  const [selectedLeader, setSelectedLeader] = useState({});

  const leaderOptions = [
    { value: 'kang', label: '강민식', department: '전략기획팀 / DX리드' },
    { value: 'kang2', label: '이찬용', department: '전략기획팀22/ DX리드' },
    { value: 'kang3', label: '강민식', department: '전략기획팀 / DX리드' },
    { value: 'kang4', label: '강민식33', department: '전략기획팀 / DX리드' },
    // ... 기타 리더 옵션
  ];

  // 검색어에 따른 필터링된 리더 옵션
  const filteredOptions = leaderOptions.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  // 리더 선택 토글 함수
  const handleLeaderClick = (index) => {
    setShowLeaderSelect((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // 리더 선택 함수
  const handleLeaderSelect = (value, index) => {
    const leader = leaderOptions.find((leader) => leader.value === value);
    setSelectedLeader((prev) => ({
      ...prev,
      [index]: leader,
    }));
    setShowLeaderSelect((prev) => ({
      ...prev,
      [index]: false,
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
    // ... 기타 팀 구성원
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

  // 상태 관리
  const [teamInputs, setTeamInputs] = useState([]); // 팀 입력 필드 상태
  const [teamNames, setTeamNames] = useState([]); // 추가된 팀 이름 목록
  const [inputErrors, setInputErrors] = useState([]); // 입력 오류 메시지

  // 팀 이름 유효성 검사 함수
  const isValidTeamName = (name) => {
    const regex = /^[가-힣a-zA-Z0-9\s._-]{1,50}$/;
    return regex.test(name);
  };

  // 팀 추가 함수
  const addTeam = (index) => {
    const teamName = teamInputs[index].trim();

    // 유효성 검사
    if (!isValidTeamName(teamName)) {
      setInputErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = '팀명은 문자/숫자/여백/특수문자(. - _)만 사용 가능하며, 50자 이내여야 합니다.';
        return newErrors;
      });
      return;
    }

    // 중복 검사
    if (teamNames.includes(teamName)) {
      setInputErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = '이미 같은 팀명이 있습니다. 확인 후 다시 입력해 주세요.';
        return newErrors;
      });
      return;
    }

    // 팀 추가 및 상태 업데이트
    setTeamNames((prev) => [teamName, ...prev]);
    setTeamInputs((prev) => prev.filter((_, i) => i !== index));
    setInputErrors((prev) => prev.filter((_, i) => i !== index));
    message.success(`'${teamName}' 팀이 추가되었습니다.`);
  };

  // 팀 입력 필드 추가 함수
  const addTeamInput = () => {
    setTeamInputs([...teamInputs, '']);
    setInputErrors([...inputErrors, '']);
  };

  // 입력 변경 핸들러
  const handleInputChange = (index, event) => {
    const newTeamInputs = [...teamInputs];
    newTeamInputs[index] = event.target.value;
    setTeamInputs(newTeamInputs);

    // 오류 메시지 초기화
    setInputErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = '';
      return newErrors;
    });
  };

  // 팀 입력 필드 제거 함수
  const removeTeamInput = (idx) => {
    const newTeamInputs = [...teamInputs];
    newTeamInputs.splice(idx, 1);
    setTeamInputs(newTeamInputs);

    setInputErrors((prev) => {
      const newErrors = [...prev];
      newErrors.splice(idx, 1);
      return newErrors;
    });
  };

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
                  운영 중인 팀 <span className="team-count">{teamNames.length}</span>
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
                      <Button size="large" type="primary" onClick={addTeamInput}>
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
                    {/* 팀이 없을 때 표시할 내용 */}
                    {teamInputs.length === 0 && teamNames.length === 0 && (
                      <div className="task-input-container">
                        <Button size="large" type="text" className="task-btn" onClick={addTeamInput}>
                          <i className="icon-plus-circle"></i> 팀 추가
                        </Button>
                      </div>
                    )}
                    <div className="task-list empty">
                      {teamInputs.length > 0 || teamNames.length > 0 ? (
                        <>
                          <div className="all-num">
                            전체 <span>{teamNames.length}</span>
                          </div>

                          {/* 팀 목록 */}
                          <ul className="team-list">
                            {teamNames.map((teamName, index) => (
                              <li key={index} index={index} className="team-item flex aic gap32">
                                <div className="team-info flex aic gap32">
                                  <h3 className="team-name">{teamName}</h3>

                                  {/* 팀 리더 선택 UI */}
                                  {!showLeaderSelect[index] ? (
                                    <div className="team-leader">
                                      <div onClick={() => handleLeaderClick(index)}>
                                        {selectedLeader[index] ? (
                                          <div className="profile-wrap">
                                            <div className="left">
                                              <span className="profile-image"></span>
                                              <span className="profile-name">{selectedLeader[index].label}</span>
                                            </div>
                                            <span className="department">{selectedLeader[index].department}</span>
                                          </div>
                                        ) : (
                                          <>
                                            <div className="team-leader-assignment">
                                              <span className="icon">
                                                <i className="icon-user"></i>
                                              </span>
                                              팀 리더 지정
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="leader-select-container" style={{ position: 'relative' }}>
                                      <Select
                                        className="custom-select"
                                        placeholder={selectedLeader[index] ? selectedLeader[index].label : '리더 선택'}
                                        onChange={(value) => handleLeaderSelect(value, index)}
                                        value={selectedLeader[index]?.value}
                                        dropdownStyle={{ minWidth: '200px', maxHeight: '300px' }}
                                        dropdownRender={(menu) => (
                                          <div>
                                            <Input
                                              placeholder="리더 검색"
                                              style={{ marginBottom: '5px' }}
                                              value={searchValue}
                                              onChange={(e) => setSearchValue(e.target.value)}
                                            />
                                            {menu}
                                          </div>
                                        )}
                                        notFoundContent={
                                          leaderOptions.length === 0
                                            ? '구성원이 없습니다. 구성원을 추가해주세요.'
                                            : '검색 결과가 없습니다.'
                                        }
                                        filterOption={false}
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
                              </li>
                            ))}
                          </ul>

                          {/* 팀 입력 필드 */}
                          {teamInputs.map((input, index) => (
                            <div key={index} className="team-input-wrap">
                              <div className="team-input flex aic jcb gap8">
                                <div className="left-item flex aic gap8">
                                  {inputErrors[index] && (
                                    <Tooltip
                                      title={inputErrors[index]}
                                      visible={true}
                                      placement="topLeft"
                                      color="red"
                                      overlayClassName="custom-tooltip-position"
                                    >
                                      <i className="icon-alert-circle" style={{ color: 'red' }}></i>
                                    </Tooltip>
                                  )}
                                  <Input
                                    allowClear
                                    value={input}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder="팀명을 입력하세요."
                                    maxLength={50}
                                    size="large"
                                    status={inputErrors[index] ? 'error' : ''}
                                  />
                                  <Button type="primary" size="large" onClick={() => addTeam(index)}>
                                    추가
                                  </Button>
                                </div>
                                <div className="right-item">
                                  <Button
                                    size="large"
                                    onClick={() => removeTeamInput(index)}
                                    icon={<CloseOutlined />}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="empty-state">
                          <i className="icon-empty"></i>
                          <p className="empty-message">아직 팀이 없습니다.</p>
                        </div>
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
