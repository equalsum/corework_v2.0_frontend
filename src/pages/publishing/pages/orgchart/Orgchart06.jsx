import React, { useState } from 'react';
import { Button } from 'antd';
import CustomModal from '../../comp/CustomModal';
import ActionButtons from '../../comp/ActionBtns';
import CustomSelect from '../../comp/CustomSelect';

const Orgchart05 = () => {
  const [visible, setVisible] = useState(true);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const memberOptions = [
    { value: 'member1', name: '김철수', department: '전략기획팀', profileImage: '' },
    { value: 'member2', name: '이영희', department: '마케팅팀', profileImage: '' },
    { value: 'member3', name: '박민수', department: '개발팀', profileImage: '' },
    { value: 'member4', name: '정미영', department: '디자인팀', profileImage: '' },
    { value: 'member5', name: '김철수2', department: '전략기획팀', profileImage: '' },
    { value: 'member6', name: '이영희2', department: '마케팅팀', profileImage: '' },
    { value: 'member7', name: '박민수2', department: '개발팀', profileImage: '' },
    { value: 'member8', name: '정미영2', department: '디자인팀', profileImage: '' },
  ];

  const teamOptions = [
    { value: 'team1', label: '전략기획팀' },
    { value: 'team2', label: '마케팅팀' },
    { value: 'team3', label: '개발팀' },
    { value: 'team4', label: '디자인팀' },
    { value: 'team5', label: '전략기획팀' },
    { value: 'team6', label: '마케팅팀' },
    { value: 'team7', label: '개발팀' },
    { value: 'team8', label: '디자인팀' },
    { value: 'team9', label: '전략기획팀' },
    { value: 'team10', label: '마케팅팀' },
    { value: 'team11', label: '개발팀' },
    { value: 'team12', label: '디자인팀' },
  ];

  const handleTeamSelect = (value) => {
    const team = teamOptions.find((team) => team.value === value);
    setSelectedTeam(team);
  };

  const leaderOptions = [
    { value: 'leader1', name: '김철수', department: '전략기획팀', profileImage: '' },
    { value: 'leader2', name: '이영희', department: '마케팅팀', profileImage: '' },
    { value: 'leader3', name: '박민수', department: '개발팀', profileImage: '' },
    { value: 'leader4', name: '정미영', department: '디자인팀', profileImage: '' },
    { value: 'leader5', name: '김철수', department: '전략기획팀', profileImage: '' },
    { value: 'leader6', name: '이영희', department: '마케팅팀', profileImage: '' },
    { value: 'leader7', name: '박민수', department: '개발팀', profileImage: '' },
    { value: 'leader8', name: '정미영', department: '디자인팀', profileImage: '' },
    { value: 'leader9', name: '김철수', department: '전략기획팀', profileImage: '' },
    { value: 'leader10', name: '이영희', department: '마케팅팀', profileImage: '0' },
    { value: 'leader11', name: '박민수', department: '개발팀', profileImage: '1' },
    { value: 'leader12', name: '정미영', department: '디자인팀', profileImage: '2' },
  ];

  const handleLeaderSelect = (value) => {
    const leader = leaderOptions.find((leader) => leader.value === value);
    setSelectedLeader(leader);
  };

  const handleMemberSelect = (values) => {
    const members = memberOptions.filter((member) => values.includes(member.value));
    setSelectedMembers(members);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button onClick={() => setVisible(true)}>모달 열기</Button>

      <CustomModal title="프로덕트 서클" placement="right" size="small" onClose={onClose} visible={visible}>
        <ul className="input-container">
          <li className="row">
            <dl>
              <dt>상위 팀</dt>
              <dd>
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
              </dd>
            </dl>
          </li>
          <li className="row">
            <dl>
              <dt>팀 리더</dt>
              <dd>
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
              </dd>
            </dl>
          </li>
          <li className="row">
            <dl>
              <dt>멤버</dt>
              <dd>
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
              </dd>
            </dl>
          </li>
        </ul>
        <ActionButtons
          customClass="fixed-bottom"
          cancelText="취소"
          confirmText="저장"
          onCancel={onClose}
          onConfirm={() => {
            // 저장 로직
            onClose();
          }}
        />
      </CustomModal>
    </div>
  );
};

export default Orgchart05;
