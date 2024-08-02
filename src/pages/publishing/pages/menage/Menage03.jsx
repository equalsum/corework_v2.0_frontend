import { React, useState } from 'react';
import { Tabs, Button, Input, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Table, Tooltip } from 'antd';
import { useMediaQuery } from 'react-responsive';
import AdminLayout from '@layout/Layout';
import EmptyContent from 'pages/publishing/comp/EmptyContent';

const { Search } = Input;

const Menage03 = () => {
  // 페이지 정보 설정
  const breadcrumbItems = {
    mainTitle: '구성원 관리',
    describeTitle: '구성원을 일괄 또는 개별로 추가하고, 필요한 설정을 완료한 후에 워크스페이스로 초대하세요. ',
  };
  const pageName = 'organ-page';

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
      sorter: (a, b) => a.name.localeCompare(b.name, 'ko', { sensitivity: 'base' }),
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar icon={<UserOutlined />} src={record.profilePic} style={{ marginRight: 8, flexShrink: 0 }} />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div className="ellipsis">{text}</div>
            {record.nickname && (
              <div className="ellipsis" style={{ fontSize: '12px', color: '#888' }}>
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
        const isLongText = text.length > 30; // 텍스트 길이가 될수도 있고
        // const isLongTextWidth = text.length > 30; // 텍스트 넓이가 될수도 있고
        return (
          <Tooltip title={isLongText ? text : null}>
            {/* copy 금지 */}
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
      render: (text) => (text !== undefined ? <div style={{ whiteSpace: 'normal', wordBreak: 'keep-all' }}>{text}</div> : '-'),
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

  const [members, setMembers] = useState(columnData);
  const isMobile = useMediaQuery({ maxWidth: 767 });

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
                  <header className="task-header flex jcb aic">
                    {/* 왼쪽 액션 버튼들 */}
                    <div className="left-actions flex aic gap8">
                      <Button size="large" type="primary">
                        <i className="icon-download"></i> 일괄 추가
                      </Button>
                      <Button size="large" type="primary">
                        <i className="icon-plus"></i> 구성원 추가
                      </Button>
                      <Button size="large" type="default">
                        <i className="icon-excel-download"></i> 엑셀 다운로드
                      </Button>
                    </div>
                    {/* 오른쪽 검색 바 */}
                    <div className="right-actions flex aic gap16">
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
                    </div>
                  </header>

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
                      columns={members}
                      dataSource={data}
                      scroll={{ x: isMobile ? 'max-content' : 1428 }}
                      pagination={{
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '30', '50'],
                        defaultPageSize: 10,
                        total: data.length,
                        showTotal: false,
                        showQuickJumper: false,
                        showLessItems: true,
                        locale: { items_per_page: '개씩 보기' },
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
    </AdminLayout>
  );
};

export default Menage03;
