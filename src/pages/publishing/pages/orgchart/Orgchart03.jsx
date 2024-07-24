import React, { useState } from 'react';
import { Button, Checkbox, Table, Tag } from 'antd';
import CustomModal from '../../comp/CustomModal';
import ActionButtons from '../../comp/ActionBtns';
import { useMediaQuery } from 'react-responsive';

const Orgchart03 = () => {
  const [visible, setVisible] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const baseColumns = [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      width: isMobile ? 30 : 50,
    },
    {
      title: '팀명',
      dataIndex: 'teamName',
      key: 'teamName',
      width: isMobile ? 100 : 420,
      ellipsis: true,
    },
    {
      title: '상위팀',
      dataIndex: 'parentTeamColumn',
      key: 'parentTeamColumn',
      width: 100,
    },
    {
      title: '상태',
      dataIndex: 'state',
      key: 'state',
      render: (state) => <Tag color={state === '완료' ? 'green' : 'pink'}>{state}</Tag>,
      width: isMobile ? 80 : 100,
    },
    {
      title: '사유',
      dataIndex: 'reason',
      key: 'reason',
      width: 100,
    },
  ];

  const columns = isMobile ? baseColumns : baseColumns;

  const data = Array(30)
    .fill()
    .map((_, index) => ({
      key: String(index + 1),
      no: 30 - index,
      teamName:
        index % 2 === 0
          ? '글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트'
          : '프로젝트 사용',
      parentTeamColumn: index % 2 === 0 ? '피플' : '-',
      state: index % 2 === 0 ? '비정상' : '완료',
      reason: '-',
    }));

  return (
    <div>
      <Button size="large" type="primary" onClick={showDrawer}>
        <i className="icon-download"></i> 일괄 추가
      </Button>

      <CustomModal title="팀 일괄 추가" placement="right" size="large" onClose={onClose} visible={visible}>
        <div className="member-upload">
          <h2>
            양식에 맞게 작성한 엑셀 파일을 업로드해 주세요. 데이터가 올바른지 확인한 후, 문제가 없다면 여러 팀을 한 번에
            추가할 수 있어요.
          </h2>

          <div className="data-status-message warning-message flex aic jcb">
            <div className="flex aic jcb">
              <div className="title">
                <i className="icon-warning-outlined"></i>총 <span className="total-count">30</span>건 중 비정상{' '}
                <span className="count">5건</span>이 있습니다.
              </div>
              <span className="message">
                데이터 검사 결과가 포함된 엑셀을 다운받아 비정상 건을 수정하여 다시 업로드 해주세요.
              </span>
            </div>
            <Button type="default" danger size="large">
              검사 결과 엑셀 다운로드
            </Button>
          </div>

          <div className="filter-container">
            <div className="total-count">
              전체
              <span className="num">30</span>
            </div>
            <div className="unpaid-filter no-copy">
              <Checkbox id="unpaidCheck">비정상 건 보기</Checkbox>
            </div>
          </div>

          <div className="data-status-message success-message flex aic jcb">
            <div className="flex aic jcb">
              <div className="title">
                <i className="icon-warning-outlined"></i>총 <span className="total-count">30</span>건의 데이터가
                정상임을 확인했습니다.
              </div>
              <span className="message">[추가] 버튼을 누르면 아래의 팀을 한 번에 추가할 수 있습니다.</span>
            </div>
            <ActionButtons
              cancelText="취소"
              confirmText="추가"
              onCancel={() => console.log('취소')}
              onConfirm={() => console.log('확인')}
            />
          </div>

          <div className="filter-container">
            <div className="total-count">
              전체
              <span className="num">30</span>
            </div>
            <div className="unpaid-filter">
              <Checkbox id="unpaidCheck" disabled>
                비정상 건 보기
              </Checkbox>
            </div>
          </div>

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
            className="centered-pagination-table"
          />
        </div>
      </CustomModal>
    </div>
  );
};

export default Orgchart03;
