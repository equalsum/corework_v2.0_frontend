import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import CustomDropdown from 'pages/publishing/comp/CustomDropdown';

const { Option } = Select;

const EditableTeamItem = ({ team, depth, expandedTeams, toggleTeam, updateTeamName, updateTeamLeader }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempTeamName, setTempTeamName] = useState(team.name);
  const [showLeaderSelect, setShowLeaderSelect] = useState(false);
  const [searchValue, setSearchValue] = useState('');

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

  const handleNameClick = () => setIsEditingName(true);

  const handleTempNameChange = (e) => setTempTeamName(e.target.value);

  const handleNameSave = () => {
    updateTeamName(team.id, tempTeamName);
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setIsEditingName(false);
    setTempTeamName(team.name);
  };

  const handleLeaderClick = () => setShowLeaderSelect((prev) => !prev);

  const handleLeaderSelect = (value) => {
    const leader = leaderOptions.find((leader) => leader.value === value);
    updateTeamLeader(team.id, leader);
    setShowLeaderSelect(false);
  };

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
    <div>
      <div className="flex aib gap16">
        {team.children && team.children.length > 0 && (
          <Button
            className="toggle-button"
            type="text"
            onClick={() => toggleTeam(team.id)}
            icon={
              <CaretDownOutlined
                style={{
                  transform: expandedTeams[team.id] ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 0.3s',
                }}
              />
            }
          />
        )}
        <div className="team-item flex aic gap32 editable-team-item flex aic gap32">
          <div className="team-info flex aic gap32">
            {!isEditingName ? (
              <h3 className="team-name" onClick={handleNameClick}>
                {team.name}
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
                  {team.leader ? (
                    <div className="profile-wrap">
                      <div className="left">
                        <span className="profile-image"></span>
                        <span className="profile-name">{team.leader.label}</span>
                      </div>
                      <span className="department">{team.leader.department}</span>
                    </div>
                  ) : (
                    <div className="team-leader-assignment">
                      <span className="icon">
                        <i className="icon-user"></i>
                      </span>
                      팀 리더 지정
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="leader-select-container" style={{ position: 'relative' }}>
                <Select
                  className="custom-select"
                  placeholder={team.leader ? team.leader.label : '리더 선택'}
                  onChange={handleLeaderSelect}
                  value={team.leader?.value}
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
        </div>
      </div>
      {expandedTeams[team.id] && team.children && team.children.length > 0 && (
        <div style={{ marginLeft: '20px' }}>
          {team.children.map((childTeam) => (
            <EditableTeamItem
              key={childTeam.id}
              team={childTeam}
              depth={depth + 1}
              expandedTeams={expandedTeams}
              toggleTeam={toggleTeam}
              updateTeamName={updateTeamName}
              updateTeamLeader={updateTeamLeader}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EditableTeamItem;
