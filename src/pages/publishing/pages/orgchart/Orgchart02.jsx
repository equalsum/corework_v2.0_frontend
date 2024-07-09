import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Tabs, Button, Input, message, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import TeamItem from './comp/TeamItem';
import CustomModal from '../../comp/CustomModal';
import AdminLayout from '@layout/Layout';

const { Search } = Input;

const Orgchart02 = () => {
  // 페이지 정보 설정
  const breadcrumbItems = {
    mainTitle: '조직도 관리',
    describeTitle: '팀을 일괄 또는 개별로 추가한 후 순서를 편집하여 조직도를 구성하세요.',
  };
  const pageName = 'organ-page';

  // 상태 관리
  const [teamInputs, setTeamInputs] = useState([]); // 팀 입력 필드 상태
  const [teamNames, setTeamNames] = useState([]); // 추가된 팀 이름 목록
  const [inputErrors, setInputErrors] = useState([]); // 입력 오류 메시지
  const [isEditMode, setIsEditMode] = useState(false); // 순서 편집 모드 상태
  const [visible, setVisible] = useState(true); // 일괄 추가 모달 상태

  // 팀 이름 유효성 검사 함수
  const isValidTeamName = (name) => {
    const regex = /^[가-힣a-zA-Z0-9\s._-]{1,50}$/;
    return regex.test(name);
  };

  // 팀 추가 함수
  const addTeam = (index) => {
    const teamName = teamInputs[index].trim();

    // 유효성 검사
    if (!isValidTeamName(teamName)) {
      setInputErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = '팀명은 문자/숫자/여백/특수문자(. - _)만 사용 가능하며, 50자 이내여야 합니다.';
        return newErrors;
      });
      return;
    }

    // 중복 검사
    if (teamNames.includes(teamName)) {
      setInputErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = '이미 같은 팀명이 있습니다. 확인 후 다시 입력해 주세요.';
        return newErrors;
      });
      return;
    }

    // 팀 추가 및 상태 업데이트
    setTeamNames((prev) => [teamName, ...prev]);
    setTeamInputs((prev) => prev.filter((_, i) => i !== index));
    setInputErrors((prev) => prev.filter((_, i) => i !== index));
    message.success(`'${teamName}' 팀이 추가되었습니다.`);
  };

  // 팀 입력 필드 추가 함수
  const addTeamInput = () => {
    setTeamInputs([...teamInputs, '']);
    setInputErrors([...inputErrors, '']);
  };

  // 입력 변경 핸들러
  const handleInputChange = (index, event) => {
    const newTeamInputs = [...teamInputs];
    newTeamInputs[index] = event.target.value;
    setTeamInputs(newTeamInputs);

    // 오류 메시지 초기화
    setInputErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = '';
      return newErrors;
    });
  };

  // 팀 입력 필드 제거 함수
  const removeTeamInput = (idx) => {
    const newTeamInputs = [...teamInputs];
    newTeamInputs.splice(idx, 1);
    setTeamInputs(newTeamInputs);

    setInputErrors((prev) => {
      const newErrors = [...prev];
      newErrors.splice(idx, 1);
      return newErrors;
    });
  };

  // 드래그 앤 드롭 종료 핸들러
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(teamNames);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTeamNames(items);
  };

  // 모달 표시 함수
  const showDrawer = () => {
    setVisible(true);
  };

  // 모달 닫기 함수
  const onClose = () => {
    setVisible(false);
  };

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
              label: (
                <>
                  운영 중인 팀 <span className="team-count">{teamNames.length}</span>
                </>
              ),
              key: '1',
              children: (
                <div className="task-manager">
                  {/* 헤더 */}
                  <header className="task-header flex jcb aic">
                    {/* 왼쪽 액션 버튼들 */}
                    <div className="left-actions flex aic gap8">
                      <Button size="large" type="primary" onClick={showDrawer}>
                        <i className="icon-download"></i> 일괄 추가
                      </Button>
                      <Button size="large" type="primary" onClick={addTeamInput}>
                        <i className="icon-plus"></i> 팀 추가
                      </Button>
                      <Button size="large" type="default" onClick={() => setIsEditMode(!isEditMode)}>
                        <i className="icon-sorter"></i> {isEditMode ? '편집 완료' : '순서 편집'}
                      </Button>
                    </div>
                    {/* 오른쪽 검색 바 */}
                    <div className="right-actions flex aic gap16">
                      <Search
                        placeholder="팀명을 입력하세요."
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
                    {/* 팀이 없을 때 표시할 내용 */}
                    {teamInputs.length === 0 && teamNames.length === 0 && (
                      <div className="task-input-container">
                        <Button size="large" type="text" className="task-btn" onClick={addTeamInput}>
                          <i className="icon-plus-circle"></i> 팀 추가
                        </Button>
                      </div>
                    )}
                    <div className="task-list empty">
                      {teamInputs.length === 0 && teamNames.length === 0 ? (
                        <div className="empty-state">
                          <i className="icon-empty"></i>
                          <p className="empty-message">아직 팀이 없습니다.</p>
                        </div>
                      ) : (
                        <>
                          <div className="all-num">
                            전체 <span>{teamNames.length}</span>
                          </div>
                          {/* 드래그 앤 드롭 컨텍스트 */}
                          <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="teamName">
                              {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="teamlist">
                                  {/* 팀 목록 렌더링 */}
                                  {teamNames.map((teamName, index) => (
                                    <Draggable
                                      key={teamName}
                                      draggableId={teamName}
                                      index={index}
                                      isDragDisabled={!isEditMode}
                                    >
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <TeamItem teamName={teamName} index={index} isEditMode={isEditMode} />
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </DragDropContext>
                          {/* 팀 입력 필드 렌더링 */}
                          {teamInputs.map((input, index) => (
                            <div key={index} className="team-input-wrap">
                              <div key={index} className="team-input flex aic jcb gap8">
                                <div className="left-item flex  aic gap8">
                                  {/* 에러 메시지 툴팁 */}
                                  {inputErrors[index] && (
                                    <Tooltip
                                      title={inputErrors[index]}
                                      visible={inputErrors[index] ? true : false}
                                      placement="topLeft"
                                      color="red"
                                      overlayClassName="custom-tooltip-position"
                                    >
                                      <i className="icon-alert-circle" style={{ color: 'red' }}></i>
                                    </Tooltip>
                                  )}
                                  {/* 팀 이름 입력 필드 */}
                                  <Input
                                    allowClear
                                    value={input}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder="팀명을 입력하세요."
                                    maxLength={50}
                                    size="large"
                                    status={inputErrors[index] ? 'error' : ''}
                                  />
                                  {/* 팀 추가 버튼 */}
                                  <Button
                                    type="primary"
                                    size="large"
                                    onClick={() => {
                                      addTeam(index);
                                    }}
                                  >
                                    추가
                                  </Button>
                                </div>
                                <div className="right-item">
                                  {/* 입력 필드 제거 버튼 */}
                                  <Button
                                    size="large"
                                    onClick={() => removeTeamInput(index)}
                                    icon={<CloseOutlined />}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </main>
                  {/* 팀 일괄 추가 모달 */}
                  <CustomModal title="팀 일괄 추가" placement="right" size="large" onClose={onClose} visible={visible}>
                    {/* 모달 내용 */}
                    <div className="member-upload">
                      <h2>
                        양식에 맞게 작성한 엑셀 파일을 업로드해 주세요. 데이터가 올바른지 확인한 후, 문제가 없다면 여러
                        팀을 한 번에 추가할 수 있어요.
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

export default Orgchart02;
