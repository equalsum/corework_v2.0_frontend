import { React, useState, useEffect } from 'react';
import { Checkbox, Tabs, Button, Input, Avatar, Space, Modal, DatePicker } from 'antd';
import {
  UserOutlined,
  BellOutlined,
  SearchOutlined,
  LockOutlined,
  InfoCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Table, Tooltip } from 'antd';
import { useMediaQuery } from 'react-responsive';
import AdminLayout from '@layout/Layout';
import ResponsiveHeader from '@comp/layout/ResponsiveHeader';
import EmptyContent from '@comp/EmptyContent';
import CustomModal from '@comp/CustomModal';
import CustomSelect from '@comp/CustomSelect';
import CustomDropdown from '@comp/CustomDropdown';

const { Search, TextArea, Password } = Input;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const Menage01 = () => {
  // 페이지 정보 설정
  const breadcrumbItems = {
    mainTitle: '구성원 관리',
    describeTitle: '구성원을 일괄 또는 개별로 추가하고, 필요한 설정을 완료한 후에 워크스페이스로 초대하세요. ',
  };
  const pageName = 'organ-page';
  const headerProps = {
    title: '메뉴',
    menuItems: [
      { label: '일괄 추가', icon: 'icon-excel-download', onClick: () => {} },
      { label: '엑셀 다운로드', icon: 'icon-excel-download', onClick: () => {} },
    ],
    primaryAction: {
      label: '구성원 추가',
      icon: <PlusOutlined />,
      onClick: () => {},
    },
    secondaryActions: [
      { label: '일괄 추가', icon: 'icon-download', type: 'primary', onClick: () => {} },
      { label: '구성원 추가', icon: 'icon-plus', type: 'primary', onClick: () => {} },
      { label: '엑셀 다운로드', icon: 'icon-excel-download', type: 'default', onClick: () => {} },
    ],
    searchPlaceholder: '구성원을 검색하세요.',
    onSearch: (value) => console.log(value),
    mobileBreakpoint: 992,
  };
  const columnData = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      ellipsis: true,
      width: 70,
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      sorter: (a, b) =>
        a.name.localeCompare(b.name, 'ko', {
          sensitivity: 'base',
        }),
      render: (text, record) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            icon={<UserOutlined />}
            src={record.profilePic}
            style={{
              marginRight: 8,
              flexShrink: 0,
            }}
          />
          <div
            style={{
              minWidth: 0,
              flex: 1,
            }}
          >
            <div className="ellipsis">{text}</div>
            {record.nickname && (
              <div
                className="ellipsis"
                style={{
                  fontSize: '12px',
                  color: '#888',
                }}
              >
                {record.nickname}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
      width: 250,
      ellipsis: true,
      render: (text) => {
        const isLongText = text.length > 30;
        return (
          <Tooltip title={isLongText ? text : null}>
            <span className="no-copy">{text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '휴대폰번호',
      dataIndex: 'phone',
      key: 'phone',
      width: 160,
    },
    {
      title: '관리자',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      width: 100,
    },
    {
      title: '소속팀',
      dataIndex: 'team',
      key: 'team',
      width: 150,
    },
    {
      title: '직책',
      dataIndex: 'position',
      key: 'position',
      width: 120,
    },
    {
      title: '직무',
      dataIndex: 'job',
      key: 'job',
      width: 150,
    },
    {
      title: '추가 역할',
      dataIndex: 'additionalRole',
      key: 'additionalRole',
      width: 150,
      render: (text) =>
        text !== undefined ? (
          <div
            style={{
              whiteSpace: 'normal',
              wordBreak: 'keep-all',
            }}
          >
            {text}
          </div>
        ) : (
          '-'
        ),
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 100,
    },
  ];
  const data = [
    {
      key: '1',
      no: '1',
      name: '이찬용',
      nickname: '용가리',
      email: 'jin.migyeong@example.com',
      phone: '010-1234-5678',
      isAdmin: '일반',
      team: '마케팅팀',
      position: '팀장',
      job: '디지털 마케팅',
      additionalRole: '신입사원 멘토',
      status: '재직중',
    },
    {
      key: '2',
      no: '2',
      name: '김철수',
      nickname: '별명이 매우 깁니다.별명이 매우 깁니다.',
      email: 'kim.chulsoo1234567890@verylongdomainname.co.kr',
      phone: '010-9876-5432',
      isAdmin: '관리자',
      team: 'IT개발팀',
      position: '수석 개발자',
      job: '백엔드 개발',
      additionalRole: '기술 고문, 보안 담당',
      status: '재직중',
    },
    {
      key: '3',
      no: '3',
      name: '이영희',
      email: 'lee.younghee@example.com',
      phone: '010-1111-2222',
      isAdmin: '일반',
      team: '인사팀',
      position: '사원',
      job: '채용 담당',
      status: '휴직',
    },
    {
      key: '4',
      no: '4',
      name: '박지성',
      email: 'park_jisung@example.net',
      phone: '010-3333-4444',
      isAdmin: '일반',
      team: '영업팀',
      position: '과장',
      job: '해외 영업',
      additionalRole: '외국어 통역',
      status: '출장중',
    },
    {
      key: '5',
      no: '5',
      name: '최다온',
      email: 'choi.daon@shortmail.com',
      phone: '010-5555-6666',
      isAdmin: '슈퍼관리자',
      team: '경영지원팀',
      position: '이사',
      job: '재무 관리',
      additionalRole: '이사회 간사, 법무 자문',
      status: '재직중',
    },
  ];
  const [selectedLeader, setSelectedLeader] = useState(null);
  const leaderOptions = [
    { value: '1', name: '홍길동', department: '개발팀', profileImage: 'https://example.com/user1.jpg' },
    { value: '2', name: '김철수', department: '디자인팀', profileImage: 'https://example.com/user2.jpg' },
    { value: '3', name: '이영희', department: '마케팅팀', profileImage: 'https://example.com/user3.jpg' },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const showInfoModal = () => {
    setAlertType('info');
    setIsModalVisible(true);
  };
  const showErrorModal = () => {
    setAlertType('error');
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSearch = (value) => {
    console.log('Searched:', value);
  };
  const handleLeaderSelect = (value) => {
    const selected = leaderOptions.find((leader) => leader.value === value);
    setSelectedLeader(selected);
  };
  const [selectedMembers, setSelectedMembers] = useState([]);
  const memberOptions = [
    {
      value: '1',
      name: '홍길동',
      department: '개발팀',
      profileImage: 'https://example.com/user1.jpg',
    },
    {
      value: '2',
      name: '김철수',
      department: '디자인팀',
      profileImage: 'https://example.com/user2.jpg',
    },
    {
      value: '3',
      name: '이영희',
      department: '마케팅팀',
      profileImage: 'https://example.com/user3.jpg',
    },
  ];
  const handleMemberSelect = (value) => {
    setSelectedMembers(value);
  };
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  // eslint-disable-next-line no-unused-vars
  const [members, setMembers] = useState(columnData);
  // eslint-disable-next-line no-unused-vars
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const items = [
    { key: '1', label: '멤버 1' },
    { key: '2', label: '멤버 2' },
    { key: '3', label: '멤버 3' },
  ];
  const [value2, setValue2] = useState(['Apple']);
  // eslint-disable-next-line no-unused-vars
  const [options, setOptions] = useState(['Apple', 'Pear', 'Orange']);
  // eslint-disable-next-line no-unused-vars
  const [Disabled, setDisabled] = useState(false);
  const onChange = (checkedValues) => {
    setValue2(checkedValues);
  };
  // eslint-disable-next-line no-unused-vars
  const [options3, setOptions3] = useState(['Apple', 'Pear', 'Orange']);
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    setIndeterminate(!!checkedList.length && checkedList.length < options3.length);
    setCheckAll(checkedList.length === options3.length);
  }, [checkedList, options3]);

  const onCheckAllChange = (e) => {
    const newCheckedList = e.target.checked ? options3 : [];
    setCheckedList(newCheckedList);
  };

  const onCheckedListChange = (list) => {
    setCheckedList(list);
  };

  function addMember() {}

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
              label: '전체',
              key: '1',
              children: (
                <div className="task-manager">
                  {/* 헤더 섹션 */}
                  <ResponsiveHeader {...headerProps} />

                  {/* 바디 섹션 */}
                  {members.length === 0 ? (
                    <>
                      <div className="task-content">
                        <div className="task-input-container">
                          <Button size="large" type="text" className="task-btn" onClick={addMember}>
                            <i className="icon-plus-circle"></i> 구성원 추가
                          </Button>
                        </div>
                        <EmptyContent message="아직 구성원이 없습니다." />
                      </div>
                    </>
                  ) : (
                    <Table
                      columns={columnData}
                      dataSource={data}
                      scroll={{
                        x: 1428,
                      }}
                      pagination={{
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '30', '50'],
                        defaultPageSize: 10,
                        total: data.length,
                        showTotal: false,
                        showQuickJumper: false,
                        showLessItems: true,
                        locale: {
                          items_per_page: '개씩 보기',
                        },
                      }}
                      showSorterTooltip={{
                        title: '클릭하여 정렬해주세요.',
                      }}
                      className="centered-pagination-table"
                    />
                  )}
                </div>
              ),
            },
            {
              label: '초대전',
              key: '2',
              children: <div>초대전 내용</div>,
            },
            {
              label: '초대완료',
              key: '3',
              children: <div>초대완료 내용</div>,
            },
          ]}
        />
      </div>
      <Button icon="" onClick={() => {}} size="middle" type="primary">
        Button
      </Button>
      <div>
        <CustomDropdown placement="bottomLeft" size="medium" items={items}></CustomDropdown>
        <CustomDropdown
          placement="bottomLeft"
          size="medium"
          items={items}
          labelText="소속"
          SecLabelText="팀"
        ></CustomDropdown>
      </div>
      <Input onChange={() => {}} onPressEnter={() => {}} placeholder="Please input" size="middle" />
      <div>
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
      </div>
      <div>
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
      </div>
      <>
        <Button onClick={showDrawer}>Open Large Drawer</Button>
        <CustomModal placement="right" size="large" title="Large Drawer" open={visible} onClose={onClose}>
          <p>1</p>
          <p>2</p>
          <p>3</p>
        </CustomModal>
      </>
      <CustomSelect
        placeholder="팀 리더를 선택하세요"
        searchPlaceholder="이름 또는 부서로 검색"
        width="20rem"
        size="large"
        showProfileInfo={true}
        mode="single"
        notFoundContent="검색 결과가 없습니다"
        numberNum={10}
      />
      <CustomDropdown
        items={items}
        icon={<BellOutlined />}
        disabled={false}
        overlayStyle={{ backgroundColor: '#f0f0f0', borderRadius: '8px' }}
        buttonStyle={{
          backgroundColor: '#1890ff',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
        }}
      />
      <Space direction="vertical">
        <Space>
          <Button type="primary">Primary Button</Button>
          <Button>Default Button</Button>
          <Button type="dashed">Dashed Button</Button>
          <Button type="text">Text Button</Button>
          <Button type="link">Link Button</Button>
        </Space>

        <Space>
          <Button size="large">Large</Button>
          <Button>Default</Button>
          <Button size="small">Small</Button>
        </Space>

        <Space>
          <Button type="primary" disabled>
            Disabled
          </Button>
          <Button type="primary" loading>
            Loading
          </Button>
        </Space>

        <Space>
          <Button type="primary" icon={<SearchOutlined />}>
            Search
          </Button>
          <Button type="primary" shape="circle" icon={<SearchOutlined />} />
          <Button type="primary" shape="round" icon={<SearchOutlined />} />
        </Space>

        <Button type="primary" block>
          Block Button
        </Button>

        <Button type="primary" style={{ backgroundColor: '#f50', borderColor: '#f50' }} className="custom-button">
          Custom Style Button
        </Button>
      </Space>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Input placeholder="Basic usage" />
        <Input placeholder="Enter your username" prefix={<UserOutlined />} allowClear />
        <Password placeholder="Enter your password" prefix={<LockOutlined />} />
        <Search placeholder="input search text" allowClear enterButton="Search" size="large" onSearch={handleSearch} />
        <Search
          placeholder="input search text"
          allowClear
          enterButton={<Button icon={<SearchOutlined />}>Search</Button>}
        />
        <Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
        <Input value={value} onChange={handleChange} placeholder="Controlled Input" />
        <TextArea rows={4} placeholder="input text area" maxLength={100} />
        <Space.Compact className="flex gap10">
          <Input style={{ width: '20%' }} defaultValue="0571" />
          <Input style={{ width: '60%' }} defaultValue="26888888" />
          <Input style={{ width: '20%' }} defaultValue="26888888" />
        </Space.Compact>
        <Input disabled placeholder="Disabled input" />

        <Search
          placeholder="구성원을 검색하세요."
          allowClear
          prefix={<i className="icon-search" style={{ marginRight: 8 }} />}
          enterButton={
            <Button type="primary" size="large">
              검색
            </Button>
          }
          size="large"
        />
      </Space>
      <Tabs defaultActiveKey="1" size="small" animated tabBarGutter={50}>
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      <Table
        columns={columnData}
        dataSource={data}
        scroll={{ x: 1428 }}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ['10', '30', '50'],
          defaultPageSize: 10,
          total: data.length,
          showTotal: false,
          showQuickJumper: false,
          showLessItems: true,
          locale: {
            items_per_page: '개씩 보기',
          },
        }}
        showSorterTooltip={{
          title: '클릭하여 정렬해주세요.',
        }}
        className="centered-pagination-table"
      />
      <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
        <Button type="primary" onClick={showInfoModal} style={{ marginRight: '10px' }}>
          Show Info Alert
        </Button>
        <Button type="danger" onClick={showErrorModal}>
          Show Error Alert
        </Button>

        <Modal
          title={
            alertType === 'info' ? (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <InfoCircleOutlined style={{ color: 'blue', marginRight: '8px', fontSize: '24px' }} />
                운영자에게 부여된 운영 권한을 이메일로 안내합니다.
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <CloseCircleOutlined style={{ color: 'red', marginRight: '8px', fontSize: '24px' }} />
                기존 권한 그룹 1개가 삭제됩니다.
              </span>
            )
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="확인"
          cancelText="취소"
          style={{ borderRadius: '8px', padding: '16px' }}
        >
          {alertType === 'info' ? (
            <p>운영자에게 부여된 운영 권한을 이메일로 안내합니다.</p>
          ) : (
            <>
              <p>이 변경 사항을 포함하여 운영자의 권한 정보를 수정하시겠습니까?</p>
              <Checkbox>삭제 시, 운영자의 권한은 취소 되어 더 이상 운영 활동을 할 수 없습니다.</Checkbox>
              <Checkbox>삭제 시, 해당 구성원에게 권한 취소 메일이 발송됩니다.</Checkbox>
              <Checkbox>운영자 삭제 이력은 [운영자 활동 로그] 메뉴에서 확인할 수 있습니다.</Checkbox>
            </>
          )}
        </Modal>
      </div>
      <p>
        <Space direction="vertical" size={12}>
          <DatePicker picker="date" size="middle" />
          <DatePicker picker="date" showTime size="middle" />
          <RangePicker picker="date" size="middle" />
          <RangePicker picker="date" showTime size="middle" />
        </Space>
      </p>
      <Space direction="vertical">
        <Checkbox disabled={true}>Disabled Checkbox</Checkbox>
        <Checkbox disabled={true} checked={true}>
          Disabled Checked Checkbox
        </Checkbox>
      </Space>
      <Checkbox.Group options={options} value={value2} onChange={onChange} disabled={Disabled} />
      <Space direction="vertical">
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} disabled={false}>
          Check all
        </Checkbox>
        <Checkbox.Group options={options} value={checkedList} onChange={onCheckedListChange} disabled={false} />
      </Space>
    </AdminLayout>
  );
};

export default Menage01;
