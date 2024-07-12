import { React, useState } from 'react';
import { Tabs, Button, Input } from 'antd';
import { Table, Tag } from 'antd';
import { useMediaQuery } from 'react-responsive';
import AdminLayout from '@layout/Layout';

const { Search } = Input;

const Menage01 = () => {
  // 페이지 정보 설정
  const breadcrumbItems = {
    mainTitle: '구성원 관리',
    describeTitle: '구성원을 일괄 또는 개별로 추가하고, 필요한 설정을 완료한 후에 워크스페이스로 초대하세요. ',
  };
  const pageName = 'organ-page';

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      width: isMobile ? 30 : 50,
    },
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      width: isMobile ? 80 : 100,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
      width: isMobile ? 120 : 200,
      ellipsis: true,
    },
    {
      title: '휴대폰 번호',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: isMobile ? 100 : 130,
    },
    {
      title: '관리',
      dataIndex: 'management',
      key: 'management',
      width: isMobile ? 60 : 80,
      sorter: (a, b) => a.management.localeCompare(b.management),
      sortOrder: sortedInfo.columnKey === 'management' && sortedInfo.order,
    },
    {
      title: '소스팀',
      dataIndex: 'sourceTeam',
      key: 'sourceTeam',
      width: isMobile ? 80 : 120,
      sorter: (a, b) => a.sourceTeam.localeCompare(b.sourceTeam),
      sortOrder: sortedInfo.columnKey === 'sourceTeam' && sortedInfo.order,
    },
    {
      title: '직책',
      dataIndex: 'position',
      key: 'position',
      width: isMobile ? 80 : 100,
      sorter: (a, b) => a.position.localeCompare(b.position),
      sortOrder: sortedInfo.columnKey === 'position' && sortedInfo.order,
    },
    {
      title: '직무',
      dataIndex: 'jobFunction',
      key: 'jobFunction',
      width: isMobile ? 80 : 120,
      sorter: (a, b) => a.jobFunction.localeCompare(b.jobFunction),
      sortOrder: sortedInfo.columnKey === 'jobFunction' && sortedInfo.order,
    },
    {
      title: '추가 역할',
      dataIndex: 'additionalRole',
      key: 'additionalRole',
      width: isMobile ? 90 : 120,
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={status === '초대전' ? 'green' : 'pink'}>{status}</Tag>,
      width: isMobile ? 60 : 80,
    },
  ];

  const data = Array(30)
    .fill()
    .map((_, index) => ({
      key: String(index + 1),
      no: index + 1,
      name: `이름${index + 1}`,
      email: `email${index + 1}@example.com`,
      phoneNumber: `010-1234-${5678 + index}`,
      management: '관리' + ((index % 3) + 1),
      sourceTeam: '팀' + ((index % 5) + 1),
      position: '직책' + ((index % 4) + 1),
      jobFunction: '직무' + ((index % 6) + 1),
      additionalRole: '역할' + ((index % 3) + 1),
      status: index % 2 === 0 ? '초대전' : '초대완료',
    }));

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
                  <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: isMobile ? 'max-content' : 790 }}
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
                    onChange={handleChange}
                    showSorterTooltip={{
                      title: '클릭하여 정렬해주세요.',
                    }}
                    className="centered-pagination-table"
                  />
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

export default Menage01;
