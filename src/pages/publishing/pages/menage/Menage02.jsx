import { React, useState } from 'react';
import { Tabs, Button, Input } from 'antd';
import { Table, Tag, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import AdminLayout from '@layout/Layout';
import CustomDropdown from 'pages/publishing/comp/CustomDropdown';

const { Text } = Typography;
const { Search } = Input;

const Menage01 = () => {
  // 페이지 정보 설정
  const breadcrumbItems = {
    mainTitle: '구성원 관리',
    describeTitle: '구성원을 일괄 또는 개별로 추가하고, 필요한 설정을 완료한 후에 워크스페이스로 초대하세요. ',
  };
  const pageName = 'organ-page';

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [sortedInfo, setSortedInfo] = useState([]);

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(Array.isArray(sorter) ? sorter : [sorter]);
  };

  // 팀 메뉴 아이템
  const teamMenuItems2 = [
    {
      key: '1',
      label: '구성원 정보 설정',
      onClick: () => console.log('1'),
    },
    {
      key: '2',
      label: <span style={{ color: 'red' }}>구성원 삭제</span>,
      onClick: () => console.log('2'),
    },
  ];

  const columns = [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      width: 60,
    },
    {
      title: '이름', // 열 제목 설정
      dataIndex: 'name', // 데이터 소스에서 사용할 키
      key: 'name', // 열의 고유 키
      width: 150, // 열의 너비 설정
      render: (
        text,
        record // 셀 내용을 커스텀 렌더링
      ) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {' '}
          <Avatar
            src={record.profileImage} // 등록된 프로필 이미지 사용
            icon={<UserOutlined />} // 프로필 이미지가 없을 경우 기본 아바타 사용
            style={{
              marginRight: 8,
              backgroundColor: '#2698BD', // 기본 배경색 설정
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            {' '}
            <Text ellipsis={{ tooltip: text }}>{text}</Text>
            {record.nickname && ( // 별명이 있을 경우에만 표시
              <Text ellipsis={{ tooltip: record.nickname }} style={{ fontSize: '12px', color: '#888' }}>
                {record.nickname}
              </Text> // 별명 표시, 길 경우 말줄임표 및 툴팁
            )}
          </div>
        </div>
      ),
      sorter: {
        // 정렬 기능 설정
        compare: (a, b) => a.name.localeCompare(b.name), // 이름을 기준으로 정렬
        multiple: 1, // 정렬 우선순위
      },
      sortOrder: sortedInfo.find((s) => s.columnKey === 'name')?.order, // 현재 정렬 상태 설정
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
      width: 240,
    },
    {
      title: '휴대폰 번호',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 160,
    },
    {
      title: '관리자 ',
      dataIndex: 'management',
      key: 'management',
      width: 120,
      sorter: {
        compare: (a, b) => a.management.localeCompare(b.management),
        multiple: 2,
      },
      sortOrder: sortedInfo.find((s) => s.columnKey === 'management')?.order,
    },
    {
      title: '소속팀',
      dataIndex: 'teams',
      key: 'teams',
      width: 130,
      render: (teams) => {
        if (teams.length === 0) {
          return <Text>소속팀 없음</Text>;
        } else if (teams.length === 1) {
          return <Text>{teams[0]}</Text>;
        } else {
          const dropdownItems = teams.map((team, index) => ({
            label: team,
            value: index.toString(),
            onClick: () => {}, // 필요한 경우 클릭 핸들러 추가
          }));

          return (
            <CustomDropdown
              items={dropdownItems}
              buttonText="팀원"
              size="medium"
              className="custom-dropdown none-event"
              buttonClassName="custom-button"
            />
          );
        }
      },
      sorter: {
        compare: (a, b) => {
          if (a.teams.length !== b.teams.length) {
            return a.teams.length - b.teams.length;
          }
          return a.teams[0].localeCompare(b.teams[0]);
        },
        multiple: 3,
      },
      sortOrder: sortedInfo.find((s) => s.columnKey === 'teams')?.order,
    },
    {
      title: '직책',
      dataIndex: 'position',
      key: 'position',
      width: 100,
      sorter: {
        compare: (a, b) => a.position.localeCompare(b.position),
        multiple: 4,
      },
      sortOrder: sortedInfo.find((s) => s.columnKey === 'position')?.order,
    },
    {
      title: '직무',
      dataIndex: 'jobFunction',
      key: 'jobFunction',
      width: 120,
      sorter: {
        compare: (a, b) => a.jobFunction.localeCompare(b.jobFunction),
        multiple: 5,
      },
      sortOrder: sortedInfo.find((s) => s.columnKey === 'jobFunction')?.order,
    },
    {
      title: '추가 역할',
      dataIndex: 'additionalRole',
      key: 'additionalRole',
      width: 120,
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => <Tag color={status === '초대전' ? 'green' : 'pink'}>{status}</Tag>,
    },
    {
      title: '',
      render: (record) =>
        record.teams ? (
          <CustomDropdown
            items={teamMenuItems2}
            placement="bottomRight"
            triggerType={(['click'], ['hover'])}
            size="small"
            onOpenChange={(visible) => {
              console.log('Dropdown visibility changed:', visible);
            }}
          >
            <Button type="default" size="large" ghost>
              <i className="icon-dots-vertical"></i>
            </Button>
          </CustomDropdown>
        ) : null,
      key: 'team',
      width: 100,
    },
  ];

  const names = [
    '김철수',
    '이영희',
    '박지성',
    '최우식',
    '정소민',
    '강태풍',
    '윤석철',
    '한지민',
    '송혜교',
    '황정민',
    '권상우',
    '배수지',
    '조인성',
    '임수정',
    '류준열',
  ];

  const nicknames = [
    '철이',
    '영이',
    '지성이',
    '우식이',
    '소민이',
    '태풍이',
    '석철이',
    '지민이',
    '혜교',
    '정민이',
    null,
    '수지',
    null,
    '수정이',
    null,
  ];

  const longNames = ['김철수장군님', '이영희박사님', '박지성선수님', '최우식배우님', '정소민아나운서님'];

  const longNicknames = ['우리회사의얼굴', '천재개발자', '축구의신', '연기의神', '아나운서계의보석'];

  const teams = ['개발팀', '디자인팀', '마케팅팀', '영업팀', '인사팀'];
  const positions = ['사원', '대리', '과장', '차장', '부장'];
  const jobFunctions = ['프론트엔드', '백엔드', 'UI/UX', '데이터분석', '영업관리'];
  const additionalRoles = ['프로젝트리더', '멘토', '신입교육담당', null];

  const data = Array(30)
    .fill()
    .map((_, index) => {
      const useSpecialCase = index < 5;
      const teamCount = Math.floor(Math.random() * 3) + 1; // 1~3개의 팀 랜덤 할당
      const assignedTeams = Array(teamCount)
        .fill()
        .map(() => teams[Math.floor(Math.random() * teams.length)]);
      const name = useSpecialCase ? longNames[index] : names[index % names.length];
      const nickname = useSpecialCase ? longNicknames[index] : nicknames[index % nicknames.length];

      return {
        key: String(index + 1),
        no: index + 1,
        name: name,
        nickname: nickname,
        email: `${name.replace(/[^ㄱ-ㅎ가-힣a-z]/gi, '')}${index + 1}@example.com`,
        phoneNumber: `010-${1000 + index}-${2000 + index}`,
        management: index % 10 === 0 ? '최고관리자' : index % 5 === 0 ? '중간관리자' : '일반사용자',
        teams: assignedTeams,
        position: positions[index % positions.length],
        jobFunction: jobFunctions[index % jobFunctions.length],
        additionalRole: additionalRoles[index % additionalRoles.length],
        status: index % 3 === 0 ? '초대전' : index % 3 === 1 ? '초대완료' : '활성',
      };
    });
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
                  <header className="task-header flex jcb aic">
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

                  <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: isMobile ? 'max-content' : 'min-content' }}
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
