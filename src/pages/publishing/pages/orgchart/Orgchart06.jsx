import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { Checkbox } from 'antd';

const ComponentName = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleConfirm = () => {
    setIsModalOpen(false);
    // 종료 버튼 클릭 시 메시지 표시
    message.success('종료된 팀으로 이동되었습니다.');
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
        title="팀 종료 전환"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            취소
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirm}>
            종료
          </Button>,
        ]}
      >
        <div className="modal-cnt">
          <p className="txt">
            <span className="team-name">이퀄썸</span> 팀을 종료 상태로 전환하시겠습니까?
          </p>
          <ul className="list">
            <li>
              <Checkbox>
                팀 종료 전환 시, 해당 팀은 사용자 모드의 조직도, 각종 화면의 팀 목록에서 노출되지 않습니다.
              </Checkbox>
            </li>
            <li>
              <Checkbox>
                종료 시, [종료된 팀] 목록으로 이동되며, 추후 운영 필요 시 다시 [운영중인 팀] 목록으로 이동할 수
                있습니다.
              </Checkbox>
            </li>
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default ComponentName;
