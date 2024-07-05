import React, { useState } from 'react';

import CustomModal from 'pages/publishing/comp/CustomModal';
import CustomDropdown from 'pages/publishing/comp/CustomDropdown';

import { Button, Select, Input } from 'antd';
const { Option } = Select;

const TeamItem = ({ teamName, index, isEditMode }) => {
  const [showLeaderSelect, setShowLeaderSelect] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedTeamName, setEditedTeamName] = useState(teamName);
  const [tempTeamName, setTempTeamName] = useState(teamName);
  const [searchValue, setSearchValue] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [_showMembers, setShowMembers] = useState(false);
  const [visible, setVisible] = useState(false);

  const leaderOptions = [
    { value: 'kang', label: '강민식', department: '전략기획팀 / DX리드' },
    { value: 'go', label: '고나경', department: '디자이너팀 / 팀원' },
    { value: 'kim', label: '김용현', department: '개발팀 / 리드' },
    { value: 'park', label: '박진옥', department: '개발팀 / 팀원' },
    { value: 'lee', label: '이길상', department: '경영지원&Mgmt / CEO' },
    { value: 'lee2', label: '이석우', department: '영업/마케팅 / CGO' },
    { value: 'choi', label: '최지훈', department: '디자인팀 / 리드' },
    { value: 'jung', label: '정수민', department: '마케팅팀 / 팀원' },
    { value: 'yoo', label: '유재석', department: '인사팀 / 리드' },
    { value: 'han', label: '한소희', department: '고객지원팀 / 팀원' },
    { value: 'lim', label: '임창정', department: '재무팀 / 리드' },
    { value: 'song', label: '송혜교', department: 'PR팀 / 팀원' },
    { value: 'kwon', label: '권상우', department: '법무팀 / 리드' },
    { value: 'bae', label: '배수지', department: '상품개발팀 / 팀원' },
    { value: 'oh', label: '오연서', department: '해외사업팀 / 리드' },
  ];

  const teamMembers = [
    { value: 'kang', label: '강민식', department: '진단개발 / DX리드' },
    { value: 'go', label: '고나경', department: '디자이너 / 팀원' },
    { value: 'kim', label: '김용현', department: 'IT개발 / IT리드' },
    { value: 'park', label: '박진록', department: 'IT개발 / 팀원' },
    { value: 'lee', label: '이찬용', department: '퍼블리셔 / 팀원' },
    { value: 'lee2', label: '전보현', department: '솔루션총괄 / CPO' },
    { value: 'choi', label: '진미경', department: '서비스기획 / UX리드' },
  ];

  const filteredOptions = leaderOptions.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleLeaderClick = () => {
    setShowLeaderSelect((prev) => !prev);
  };

  const handleLeaderSelect = (value) => {
    const leader = leaderOptions.find((leader) => leader.value === value);
    setSelectedLeader(leader);
    setShowLeaderSelect(false);
  };

  const handleNameClick = () => {
    setIsEditingName(true);
  };

  const handleTempNameChange = (e) => {
    setTempTeamName(e.target.value);
  };

  const handleNameSave = () => {
    setEditedTeamName(tempTeamName);
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setIsEditingName(false);
  };

  const handleInnerClick = (event) => {
    event.stopPropagation(); // 이벤트 버블링을 막습니다.
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const teamMenuItems = [
    {
      key: '1',
      label: '팀 정보 설정',
      onClick: showDrawer,
    },
    {
      key: '2',
      label: '팀 종료 전환',
      onClick: () => console.log('2'),
    },
  ];

  const renderOption = (leader) => (
    <div className="profile-wrap">
      <div className="left">
        <span className="profile-image"></span>
        <span>{leader.label}</span>
      </div>
      <span className="department">{leader.department}</span>
    </div>
  );

  const memberMenuItems = teamMembers.map((member) => ({
    key: member.value,
    label: renderOption(member),
  }));

  return (
    <>
      <div className="team-item flex aic gap32">
        <div className="team-info flex aic gap32" onClick={handleInnerClick}>
          {!isEditingName ? (
            <h3 className="team-name" onClick={handleNameClick}>
              {editedTeamName}
            </h3>
          ) : (
            <div className="flex aic gap8 w-full">
              <Input
                type="text"
                maxLength={50}
                value={tempTeamName}
                onChange={handleTempNameChange}
                onPressEnter={handleNameSave}
              />
              <Button type="primary" size="large" onClick={handleNameSave}>
                저장
              </Button>
              <Button type="default" size="large" onClick={handleNameCancel}>
                취소
              </Button>
            </div>
          )}

          {!showLeaderSelect ? (
            <div className="team-leader">
              <div onClick={handleLeaderClick}>
                {selectedLeader ? (
                  <div className="profile-wrap">
                    <div className="left">
                      <span className="profile-image"></span>
                      <span className="profile-name">{selectedLeader.label}</span>
                    </div>
                    <span className="department">{selectedLeader.department}</span>
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
                placeholder={selectedLeader ? selectedLeader.label : '리더 선택'}
                onChange={handleLeaderSelect}
                value={selectedLeader?.value}
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
                  leaderOptions.length === 0 ? '구성원이 없습니다. 구성원을 추가해주세요.' : '검색 결과가 없습니다.'
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
          <CustomDropdown
            items={memberMenuItems}
            buttonText="팀원"
            size="large"
            className="custom-dropdown"
            buttonClassName="custom-button"
          />
        </div>
        <div className="team-actions" onClick={handleInnerClick}>
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
              <img src={`${process.env.PUBLIC_URL}/assets/images/icon/DotsThreeVertical.svg`} alt="Dots Icon" />
            </Button>
          </CustomDropdown>
        </div>
      </div>
      <CustomModal title={teamName} placement="right" size="large" onClose={onClose} visible={visible}>
        <p>This is my custom drawer content.</p>
      </CustomModal>
    </>
  );
};

export default TeamItem;
