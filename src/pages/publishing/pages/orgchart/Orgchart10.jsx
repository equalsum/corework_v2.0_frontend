import React, { useState } from 'react';
import { Button, Modal, message, Checkbox } from 'antd';

const ComponentName = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleConfirm = () => {
    setIsModalOpen(false);
    message.success('팀이 삭제되었습니다.');
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
        title="팀 삭제"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            취소
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirm}>
            삭제
          </Button>,
        ]}
      >
        <div className="modal-cnt">
          <p className="txt">
            <span className="team-name">경영지원팀</span> 을 삭제하시겠습니까
          </p>
          <ul className="list">
            <li>
              <Checkbox>해당 팀이 등록한 게시물과 파일들은 자동으로 삭제되지 않습니다.</Checkbox>
            </li>
            <li>
              <Checkbox>팀 삭제 시, 해당 팀은 즉시 삭제 처리 되며, 복원이 불가함을 확인 했습니다.</Checkbox>
            </li>
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default ComponentName;
