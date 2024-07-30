import React, { useState } from 'react';
import { Select, Input } from 'antd';

const { Option } = Select;

const CustomSelect = ({
  placeholder, // Select 컴포넌트의 기본 플레이스홀더 텍스트
  searchPlaceholder, // 검색 입력란의 플레이스홀더 텍스트
  width = '15rem', // Select 컴포넌트의 너비. 기본값은 '15rem'
  size = 'middle', // Select 컴포넌트의 크기. 'small', 'middle', 'large' 중 하나. 기본값은 'middle'
  showProfileInfo = false, // 프로필 정보(이미지, 이름, 부서) 표시 여부. 기본값은 false
  numberNum, // 선택된 멤버의 수 또는 총 멤버 수. 정의되지 않은 경우 표시되지 않음
  mode = 'single', // Select 컴포넌트의 모드. 'single' 또는 'multiple'. 기본값은 'single'
  onChange, // 선택된 값이 변경될 때 호출되는 콜백 함수
  notFoundContent, // 옵션 없음을 나타내는 커스텀 텍스트
}) => {
  const [searchValue, setSearchValue] = useState('');

  const leaders = [
    { value: 'option1', label: 'Option 1', name: '김민준', department: '정보기술팀', profileImage: 'url-to-image1' },
    { value: 'option2', label: 'Option 2', name: '이서연', department: '인사팀', profileImage: 'url-to-image2' },
    { value: 'option3', label: 'Option 3', name: '박지훈', department: '마케팅팀', profileImage: 'url-to-image3' },
    { value: 'option4', label: 'Option 4', name: '최수진', department: '영업팀', profileImage: 'url-to-image4' },
    { value: 'option5', label: 'Option 5', name: '정도윤', department: '재무팀', profileImage: 'url-to-image5' },
    { value: 'option6', label: 'Option 6', name: '강지영', department: '고객서비스팀', profileImage: 'url-to-image6' },
    { value: 'option7', label: 'Option 7', name: '임현우', department: '연구개발팀', profileImage: 'url-to-image7' },
    { value: 'option8', label: 'Option 8', name: '송아라', department: '법무팀', profileImage: 'url-to-image8' },
    { value: 'option9', label: 'Option 9', name: '황민석', department: '생산관리팀', profileImage: 'url-to-image9' },
    { value: 'option10', label: 'Option 10', name: '유은지', department: '품질관리팀', profileImage: 'url-to-image10' },
  ];

  const renderOption = (option) => {
    if (showProfileInfo) {
      return (
        <div className="profile-wrap">
          <div className="left">
            <span className="profile-image" style={{ backgroundImage: `url(${option.profileImage})` }}></span>
            <span className="profile-name">{option.name}</span>
          </div>
          <div className="department">{option.department}</div>
        </div>
      );
    }
    return option.label;
  };

  const filteredLeaders = leaders.filter(
    (leader) =>
      leader.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      leader.department.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <Select
        mode={mode} // mode prop 사용
        className="custom-select"
        placeholder={placeholder}
        dropdownStyle={{ minWidth: '200px', maxHeight: '300px' }}
        style={{ width: width }}
        size={size}
        notFoundContent={notFoundContent}
        onChange={onChange} // onChange prop 사용
        dropdownRender={(menu) => (
          <div>
            <Input
              placeholder={searchPlaceholder || '리더 검색'}
              style={{ marginBottom: '5px' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {menu}
          </div>
        )}
      >
        {filteredLeaders.map((leader) => (
          <Option key={leader.value} value={leader.value}>
            {renderOption(leader)}
          </Option>
        ))}
      </Select>
      {numberNum !== undefined && (
        <div className="member-num">
          총 <span>{numberNum}</span>명의 멤버
        </div>
      )}
    </>
  );
};

export default CustomSelect;
