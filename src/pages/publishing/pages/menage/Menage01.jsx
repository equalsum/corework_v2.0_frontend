import { React, useState } from 'react';
import { Tabs, Button, Modal, Checkbox, DatePicker, Space } from 'antd';
import { InfoCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import AdminLayout from '@layout/Layout';
import CustomModal from '@comp/CustomModal';

const { RangePicker } = DatePicker;

const Menage01 = () => {
  // 페이지 정보 설정
  const breadcrumbItems = {
    mainTitle: '구성원 관리',
    describeTitle: '구성원을 일괄 또는 개별로 추가하고, 필요한 설정을 완료한 후에 워크스페이스로 초대하세요. ',
  };

  const pageName = 'organ-page';

  // 팝업
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  // 팝업 EEE

  // Alert
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
  // Alert EEE

  return (
    <AdminLayout breadcrumbItems={breadcrumbItems} pageClass={pageName}>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            children: 'Content of Tab Pane 1',
            key: '1',
            label: 'Tab 1',
          },
          {
            children: 'Content of Tab Pane 2',
            key: '2',
            label: 'Tab 2',
          },
          {
            children: 'Content of Tab Pane 3',
            key: '3',
            label: 'Tab 3',
          },
        ]}
        onChange={() => {}}
        size="default"
        tabBarExtraContent=""
        tabBarGutter={16}
        tabBarStyle={{}}
        tabPosition="top"
        type="line"
      />
      {/* modal */}
      <>
        <Button onClick={showDrawer}>Open Drawer</Button>
        <CustomModal placement="right" size="small" onClose={onClose} title="Drawer Title" visible={visible}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </CustomModal>
      </>
      {/* modal EEE */}
      {/* alert */}
      <div>
        <Button
          type="primary"
          onClick={showInfoModal}
          style={{
            marginRight: '10px',
          }}
        >
          Show Info Alert
        </Button>
        21
        <Button type="danger" onClick={showErrorModal}>
          Show Error Alert
        </Button>
        <Modal
          title={
            alertType === 'info' ? (
              <span>
                <InfoCircleOutlined
                  style={{
                    color: 'blue',
                    marginRight: '8px',
                  }}
                />
                운영자에게 부여된 운영 권한을 이메일로 안내합니다.
              </span>
            ) : (
              <span>
                <CloseCircleOutlined
                  style={{
                    color: 'red',
                    marginRight: '8px',
                  }}
                />
                기존 권한 그룹 1개가 삭제됩니다.
              </span>
            )
          }
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="확인"
          cancelText="취소"
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
      {/* alert EEE */}
      {/* DatePicker */}
      <Space direction="vertical" size={12}>
        <DatePicker picker="date" size="middle" variant="outlined" />
        <DatePicker picker="date" showTime size="middle" variant="outlined" />
        <RangePicker picker="date" size="middle" variant="outlined" />
        <RangePicker picker="date" showTime size="middle" variant="outlined" />
        <DatePicker multiple picker="date" size="middle" variant="outlined" />
        <div>선택된 날짜: </div>
      </Space>
      {/* DatePicker EEE */}
    </AdminLayout>
  );
};

export default Menage01;
