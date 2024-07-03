import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AdminLayout from '@layout/Layout';
import { Tabs, Button, Input, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { Search } = Input;

const Page1 = () => {
  const breadcrumbItems = {
    mainTitle: '조직도 관리',
    describeTitle: '팀을 일괄 또는 개별로 추가한 후 순서를 편집하여 조직도를 구성하세요.',
  };
  const pageName = 'organ-page';

  // 입력필드 상태관리
  const [teamInputs, setTeamInputs] = useState([]);
  // 팀명 저장
  const [teamNames, setTeamNames] = useState([]);
  // 에러메시지 상태관리
  const [inputErrors, setInputErrors] = useState([]);
  // 순서편집 모드 상태관리
  const [isEditMode, setIsEditMode] = useState(false);

  // 팀명 유효성 검사 함수
  const isValidTeamName = (name) => {
    const regex = /^[가-힣a-zA-Z0-9\s._-]{1,50}$/;
    return regex.test(name);
  };

  // 팀 추가 함수
  const addTeam = (index) => {
    const teamName = teamInputs[index].trim();

    // 팀 이름이 유효한지 검사
    if (!isValidTeamName(teamName)) {
      // 유효하지 않은 경우, 해당 인덱스의 에러 메시지를 설정
      setInputErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = '팀명은 문자/숫자/여백/특수문자(. - _)만 사용 가능하며, 50자 이내여야 합니다.';
        return newErrors;
      });
      return; // 함수 실행 중단
    }

    // 이미 존재하는 팀 이름인지 검사
    if (teamNames.includes(teamName)) {
      // 중복된 경우, 해당 인덱스의 에러 메시지를 설정
      setInputErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = '이미 같은 팀명이 있습니다. 확인 후 다시 입력해 주세요.';
        return newErrors;
      });

      return; // 함수 실행 중단
    }

    // 새로운 팀 이름을 기존 팀 목록에 추가
    setTeamNames((prev) => [teamName, ...prev]);

    // 입력 필드와 에러 메시지를 제거
    setTeamInputs((prev) => prev.filter((_, i) => i !== index));
    setInputErrors((prev) => prev.filter((_, i) => i !== index));

    // 성공 메시지 표시
    message.success(`'${teamName}' 팀이 추가되었습니다.`);
  };

  // 팀 추가 버튼 클릭 시 함수
  const addTeamInput = () => {
    setTeamInputs([...teamInputs, '']);
    setInputErrors([...inputErrors, '']);
  };

  // 팀명 입력 시 함수
  const handleInputChange = (index, event) => {
    const newTeamInputs = [...teamInputs];
    newTeamInputs[index] = event.target.value;
    setTeamInputs(newTeamInputs);

    // 입력 시 해당 입력 필드의 에러 메시지 초기화
    setInputErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = '';
      return newErrors;
    });
  };

  // 팀 삭제 버튼 클릭 시 함수
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

  // 팀아이템 Drag and Drop
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(teamNames);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTeamNames(items);
  };

  return (
    <AdminLayout breadcrumbItems={breadcrumbItems} pageClass={pageName}>
      <div className="tab-panel">
        {/* {teamNames} */}
        <Tabs defaultActiveKey="1" onChange={() => {}} size="default" tabPosition="top" type="line">
          <Tabs.TabPane
            tab={
              <>
                운영 중인 팀 <span className="team-count">{teamNames.length}</span>
              </>
            }
            key="1"
          >
            <div className="task-manager">
              <header className="task-header flex jcb aic">
                <div className="left-actions flex aic gap8">
                  <Button size="large" type="primary">
                    <i className="icon-download"></i> 일괄 추가
                  </Button>
                  <Button size="large" type="primary" onClick={addTeamInput}>
                    <i className="icon-plus"></i> 팀 추가
                  </Button>
                  <Button size="large" type="default" onClick={() => setIsEditMode(!isEditMode)}>
                    <i className="icon-sorter"></i> {isEditMode ? '편집 완료' : '순서 편집'}
                  </Button>
                </div>

                <div className="right-actions flex aic gap16">
                  <div className="view-toggles flex aic gap5">
                    <button className="btn btn-view active">리스트 뷰</button>
                    <button className="btn btn-view">조직도 뷰</button>
                  </div>
                  <Search
                    placeholder="팀명"
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

              {/* task content */}
              <main className="task-content">
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
                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="teamName">
                          {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="teamlist">
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
                                      className="team-item"
                                    >
                                      <div className="team-info flex aic gap32">
                                        <h3 className="team-name">{teamName}</h3>
                                        <p className="team-leader">팀 리더</p>
                                        <p className="team-members">
                                          멤버: <span>0</span>명
                                        </p>
                                      </div>
                                      <div className="team-actions"></div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                      {teamInputs.map((input, index) => (
                        <div key={index} className="team-input-wrap">
                          <div key={index} className="team-input flex aic jcb gap8">
                            <div className="left-item flex  aic gap8">
                              <Input
                                allowClear
                                value={input}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="팀명을 입력하세요"
                                maxLength={50}
                                size="large"
                                status={inputErrors[index] ? 'error' : ''}
                              />
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
                              <Button size="large" onClick={() => removeTeamInput(index)} icon={<CloseOutlined />} />
                            </div>
                            {inputErrors[index] && <div className="error-message">{inputErrors[index]}</div>}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </main>
              {/* task content EEE */}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <>
                종료된 팀 <span className="team-count">0</span>
              </>
            }
            key="2"
          >
            종료된 팀 <span>0</span>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Page1;
