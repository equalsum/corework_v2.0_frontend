import React, { useState } from 'react';
import { Select, Input } from 'antd';

const { Option } = Select;

const CustomSelect = ({
  options,
  placeholder,
  onSelect,
  selectedValue,
  searchPlaceholder,
  notFoundContent,
  labelKey = 'label',
  showProfileInfo = false,
  profileImageKey = 'profileImage',
  nameKey = 'name',
  departmentKey = 'department',
  mode = 'single', // 'single' 또는 'multiple'
  numberNum,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const filteredOptions = options
    ? options.filter(
        (option) =>
          (option[labelKey] || '').toLowerCase().includes(searchValue.toLowerCase()) ||
          (showProfileInfo && option[nameKey].toLowerCase().includes(searchValue.toLowerCase())) ||
          (showProfileInfo && option[departmentKey].toLowerCase().includes(searchValue.toLowerCase()))
      )
    : [];

  const renderOption = (option) => {
    if (showProfileInfo) {
      return (
        <div className="profile-wrap">
          <div className="left">
            <span className="profile-image" style={{ backgroundImage: `url(${option[profileImageKey]})` }}></span>
            <span className="profile-name">{option[nameKey]}</span>
          </div>
          <div className="department">{option[departmentKey]}</div>
        </div>
      );
    }
    return option[labelKey];
  };

  return (
    <>
      <Select
        mode={mode}
        className="custom-select"
        placeholder={placeholder}
        onChange={onSelect}
        value={selectedValue}
        dropdownStyle={{ minWidth: '200px', maxHeight: '300px' }}
        dropdownRender={(menu) => (
          <div>
            <Input
              placeholder={searchPlaceholder || '검색'}
              style={{ marginBottom: '5px' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {menu}
          </div>
        )}
        notFoundContent={!options || options.length === 0 ? notFoundContent.empty : notFoundContent.noResults}
        filterOption={false}
        getPopupContainer={(trigger) => trigger.parentNode}
      >
        {filteredOptions.map((option) => (
          <Option key={option.value} value={option.value}>
            {renderOption(option)}
          </Option>
        ))}
      </Select>
      {numberNum === 0 ? (
        <div class="member-num">
          총 <span>{numberNum}</span>명의 멤버
        </div>
      ) : (
        numberNum && (
          <div class="member-num">
            총 <span>{numberNum}</span>명의 멤버
          </div>
        )
      )}
    </>
  );
};

export default CustomSelect;
