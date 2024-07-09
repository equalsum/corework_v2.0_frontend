import React, { useState } from 'react';
import CustomModal from 'pages/publishing/comp/CustomModal';
import CustomDropdown from 'pages/publishing/comp/CustomDropdown';
import { Button, Select, Input } from 'antd';
const { Option } = Select;

const TeamItem = ({ teamName, index }) => {
  const [showLeaderSelect, setShowLeaderSelect] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedTeamName, setEditedTeamName] = useState(teamName);
  const [tempTeamName, setTempTeamName] = useState(teamName);
  const [searchValue, setSearchValue] = useState('');
  const [visible, setVisible] = useState(false);

  const leaderOptions = [
    { value: 'kang', label: '강민식', department: '전략기획팀 / DX리드' },
    // ... 기타 리더 옵션
  ];

  const teamMembers = [
    { value: 'kang', label: '강민식', department: '진단개발 / DX리드' },
    // ... 기타 팀 구성원
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
    event.stopPropagation();
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
        <span className="team-num">
          {' '}
          <div className="dot-item"></div>{' '}
        </span>
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
