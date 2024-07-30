import React from 'react';
import { Table, Avatar, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default {
  title: 'Ant Design/Table',
  component: Table,
  argTypes: {
    bordered: { control: 'boolean' },
    loading: { control: 'boolean' },
    size: {
      options: ['small', 'middle', 'large'],
      control: { type: 'radio' },
    },
  },
};

export const Default = (args) => {
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
      ellipsis: true,
      sorter: (a, b) =>
        a.name.localeCompare(b.name, 'ko', {
          sensitivity: 'base',
        }),
      render: (text, record) => (
        <Tooltip title={`${text}${record.nickname ? ` (${record.nickname})` : ''}`}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
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
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {text}
              {record.nickname && (
                <div
                  style={{
                    fontSize: '12px',
                    color: '#888',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {record.nickname}
                </div>
              )}
            </div>
          </div>
        </Tooltip>
      ),
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
      width: 250,
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: '휴대폰번호',
      dataIndex: 'phone',
      key: 'phone',
      width: 160,
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: '관리자',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      width: 100,
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: '소속팀',
      dataIndex: 'team',
      key: 'team',
      width: 150,
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: '직책',
      dataIndex: 'position',
      key: 'position',
      width: 120,
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: '직무',
      dataIndex: 'job',
      key: 'job',
      width: 150,
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: '추가 역할',
      dataIndex: 'additionalRole',
      key: 'additionalRole',
      width: 150,
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text || '-'}>
          <div style={{ whiteSpace: 'normal', wordBreak: 'keep-all', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {text || '-'}
          </div>
        </Tooltip>
      ),
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
            {text}
          </span>
        </Tooltip>
      ),
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

  return (
    <Table
      {...args}
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
  );
};

Default.args = {
  bordered: false,
  loading: false,
  size: 'middle',
};
