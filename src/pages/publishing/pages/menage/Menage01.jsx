import { React } from 'react';
import { Tabs, Button, Input } from 'antd';
import { Table } from 'antd';
import { useMediaQuery } from 'react-responsive';
import AdminLayout from '@layout/Layout';
import EmptyContent from 'pages/publishing/comp/EmptyContent';

const { Search } = Input;

const Menage01 = () => {
  // 페이지 정보 설정
  const breadcrumbItems = {
    mainTitle: '구성원 관리',
    describeTitle: '구성원을 일괄 또는 개별로 추가하고, 필요한 설정을 완료한 후에 워크스페이스로 초대하세요. ',
  };
  const pageName = 'organ-page';

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const columns = [];

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
                  {columns.length === 0 ? (
                    <>
                      <div className="task-content">
                        <div className="task-input-container">
                          <Button size="large" type="text" className="task-btn">
                            <i className="icon-plus-circle"></i> 구성원 추가
                          </Button>
                        </div>
                        <EmptyContent message="아직 구성원이 없습니다." />
                      </div>
                    </>
                  ) : (
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

export default Menage01;
