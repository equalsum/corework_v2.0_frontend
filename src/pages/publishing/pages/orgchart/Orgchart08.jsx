import React from 'react';
import { Tabs, Input, Button } from 'antd';
import AdminLayout from '@layout/Layout';
import EmptyContent from 'pages/publishing/comp/EmptyContent';

const { Search } = Input;

const Orgchart07 = () => {
  const breadcrumbItems = {
    mainTitle: '조직도 관리',
    describeTitle: '팀을 일괄 또는 개별로 추가한 후 순서를 편집하여 조직도를 구성하세요.',
  };
  const pageName = 'organ-page';

  return (
    <AdminLayout breadcrumbItems={breadcrumbItems} pageClass={pageName}>
      <div className="tab-panel">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: (
                <>
                  운영 중인 팀 <span className="team-count">0</span>
                </>
              ),
              key: '1',
              children: (
                <div className="task-manager">
                  {/* 헤더 섹션 */}
                  <header className="task-header flex jcb aic">
                    {/* 오른쪽 검색 바 */}
                    <div className="right-actions flex aic gap16">
                      <Search
                        placeholder="팀명을 입력하세요."
                        disabled
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
                  {/* 메인 컨텐츠 */}
                  <main className="task-content">
                    <EmptyContent message="종료된 팀이 없습니다." />
                  </main>
                </div>
              ),
            },
            {
              label: (
                <>
                  종료된 팀 <span className="team-count">0</span>
                </>
              ),
              key: '2',
              children: (
                <div>
                  종료된 팀 <span>0</span>
                </div>
              ),
            },
          ]}
        />
      </div>
    </AdminLayout>
  );
};

export default Orgchart07;
