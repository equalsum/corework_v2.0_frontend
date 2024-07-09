import React, { useState } from 'react';
import { Button } from 'antd';
import CustomModal from '../../comp/CustomModal';

const Orgchart02 = () => {
  const [visible, setVisible] = useState(true); // 일괄 추가 모달 상태

  // 모달 표시 함수
  const showDrawer = () => {
    setVisible(true);
  };

  // 모달 닫기 함수
  const onClose = () => {
    setVisible(false);
  };

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
          <div className="header-wrp">
            <h1 className="title flex aic jcb">
              <div className="left flex aic gap8">
                <i className="icon-circle-outlined"></i>
                팀명(필수 정보)과 상위 팀(선택 정보) 정보를 양식에 맞추어 입력해 주세요.
                <span className="desc">양식을 다운로드 해주세요.</span>
              </div>
              <div className="right">
                <Button type="default" size="large">
                  양식 다운로드
                </Button>
              </div>
            </h1>
          </div>
          <div className="content">
            <p>양식에 맞춰 작성한 엑셀 파일을 업로드 해주세요.</p>
            <div className="wrap">
              <div className="upload-area">
                <i className="icon-upload"></i>
                <p>여기 드래그 하기</p>
                <span>또는</span>
                <Button type="primary" size="large" className="mw120">
                  엑셀 업로드
                </Button>
              </div>
              <div className="instructions">
                <p>양식에 기존 팀에 대한 변경 정보가 있을 경우, 기존 정보를 덮어씁니다.</p>
                <p>양식에 기존 팀에 대한 변경 정보가 있을 경우, 기존 정보를 덮어씁니다.</p>
              </div>
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default Orgchart02;
