import React, { useState } from 'react';
import { Alert, Button, Checkbox, Modal } from 'antd';
import { InfoCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export default {
  title: 'Ant Design/Alerts',
  component: Alert,
};

const App = () => {
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

  return (
    <div>
      <Button type="primary" onClick={showInfoModal} style={{ marginRight: '10px' }}>
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
              <InfoCircleOutlined style={{ color: 'blue', marginRight: '8px' }} />
              운영자에게 부여된 운영 권한을 이메일로 안내합니다.
            </span>
          ) : (
            <span>
              <CloseCircleOutlined style={{ color: 'red', marginRight: '8px' }} />
              기존 권한 그룹 1개가 삭제됩니다.
            </span>
          )
        }
        visible={isModalVisible}
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
  );
};

// Stories
export const Alerts = () => <App />;
Alerts.storyName = 'Alerts';
