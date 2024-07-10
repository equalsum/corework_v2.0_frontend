import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';

const ComponentName = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleConfirm = () => {
    setIsModalOpen(false);
    // 종료 버튼 클릭 시 메시지 표시
    message.success('운영 중인 팀으로 이동되었습니다..');
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        모달 열기
      </Button>
      <Modal
        title="팀 운영 전환"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            취소
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirm}>
            확인
          </Button>,
        ]}
      >
        <div className="modal-cnt">
          <p className="txt">
            <span className="team-name">경영지원팀</span> 을 운영 상태로 전환하시겠습니까?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ComponentName;
