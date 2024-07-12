import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GuideItem = ({ to, title, description }) => (
  <li className="guide__item">
    {to && title ? (
      <Link to={to} target="_blank" className="guide__link">
        {title}
      </Link>
    ) : null}
    <p className="guide__description">{description}</p>
  </li>
);

const RequestItem = ({ description, isChecked, onToggle, checkDate }) => (
  <li className={`guide__item guide__item--request ${isChecked ? 'guide__item--completed' : ''}`}>
    <div className="guide__item-content">
      <p className="guide__description">{description}</p>
      {checkDate && <p className="guide__check-date">완료일: {checkDate.toLocaleDateString()}</p>}
    </div>
    <label className="guide__checkbox-label">
      <input type="checkbox" checked={isChecked} onChange={onToggle} className="guide__checkbox" />
      <span className="guide__checkbox-custom"></span>
    </label>
  </li>
);

const GuideSubSection = ({ title, items, type, checkedItems, onToggleCheck, checkDates }) => (
  <div className="guide__subsection">
    {title && <h3 className="guide__subsection-title">{title}</h3>}
    <ul className="guide__list">
      {type === 'request'
        ? items.map((item, index) => (
            <RequestItem
              key={index}
              description={item.description}
              isChecked={checkedItems[index]}
              onToggle={() => onToggleCheck(index)}
              checkDate={checkDates[index]}
            />
          ))
        : items.map((item, index) => <GuideItem key={index} {...item} />)}
    </ul>
  </div>
);

const GuideSection = ({ title, subsections, type, checkedItems, onToggleCheck, checkDates }) => (
  <section className={`guide__section ${type === 'request' ? 'guide__section--request' : ''}`}>
    <h2 className="guide__section-title">{title}</h2>
    {subsections.map((subsection, index) => (
      <GuideSubSection
        key={index}
        {...subsection}
        type={type}
        checkedItems={checkedItems}
        onToggleCheck={onToggleCheck}
        checkDates={checkDates}
      />
    ))}
  </section>
);

function Guide() {
  const guideData = [
    {
      title: '1. 조직도',
      subsections: [
        {
          items: [
            {
              to: '/orgchart01',
              title: 'Orgchart01 - 조직도 운영 중인 팀 - 리스트',
              description:
                '팀 추가 아이템 부분 반응형 디자인 필요,에러 메세지 문구 레이아웃 필요, 리더선택-비선택 구분',
            },
            {
              to: '/orgchart02',
              title: 'Orgchart02 - 조직도 운영 중인 팀 - 팀일괄추가모달',
            },
            {
              to: '/orgchart03',
              title: 'Orgchart03 - 조직도 운영 중인 팀 - 팀일괄추가모달_업로드결과- 비정상건, 정상건',
            },
            {
              to: '/orgchart04',
              title: 'Orgchart04 - 조직도 운영 중인 팀 - 순서 편집',
            },
            {
              to: '/orgchart05',
              title: 'Orgchart05 - 조직도 운영 중인 팀 - 팀 설정 모달',
            },
            {
              to: '/orgchart06',
              title: 'Orgchart06 - 조직도 운영 중인 팀 - 팀 종료 모달',
            },
            {
              to: '/orgchart07',
              title: 'Orgchart07 - 조직도 종료된 팀 - 리스트',
            },
            {
              to: '/orgchart08',
              title: 'Orgchart08 - 조직도 검색된 팀이 없습니다., 종료된팀이 없습니다 등 empty 페이지 - 공통',
              description: '검색 결과가 없거나 종료된 팀이 없을 때 표시되는 빈 페이지',
            },
            {
              to: '/orgchart09',
              title: 'Orgchart09 - 조직도 종료된 팀 - 운영 전환 모달',
            },
            {
              to: '/orgchart10',
              title: 'Orgchart10 - 조직도 종료된 팀 - 팀 삭제 모달 ',
            },
          ],
        },
      ],
    },
    {
      title: '2. 구성원 관리',
      subsections: [
        {
          items: [
            {
              to: '/Menage01',
              title: 'Menage01 - 구성원 관리 - 구성원 없을때',
            },
            {
              to: '/Menage02',
              title: 'Menage02 - 구성원 관리 - 구성원 추가 시',
            },
            {
              to: '/Menage03',
              title: 'Menage03 - 조직도 운영 중인 팀 - 팀일괄추가모달_업로드결과- 비정상건, 정상건',
            },
            {
              to: '/Menage04',
              title: 'Menage04 - 조직도 운영 중인 팀 - 순서 편집',
            },
            {
              to: '/Menage05',
              title: 'Menage05 - 조직도 운영 중인 팀 - 팀 설정 모달',
            },
            {
              to: '/Menage06',
              title: 'Menage06 - 조직도 운영 중인 팀 - 팀 종료 모달',
            },
            {
              to: '/Menage07',
              title: 'Menage07 - 조직도 종료된 팀 - 리스트',
            },
            {
              to: '/Menage08',
              title: 'Menage08 - 조직도 검색된 팀이 없습니다., 종료된팀이 없습니다 등 empty 페이지 - 공통',
            },
            {
              to: '/Menage09',
              title: 'Menage09 - 조직도 종료된 팀 - 운영 전환 모달',
            },
            {
              to: '/Menage10',
              title: 'Menage10 - 조직도 종료된 팀 - 팀 삭제 모달 ',
            },
          ],
        },
      ],
    },
    {
      title: '요청사항',
      type: 'request',
      subsections: [
        {
          items: [
            { description: '각 페이지의 반응형 디자인 적용' },
            { description: '다크모드 지원 확인' },
            { description: '에러 메세지 문구 레이아웃 필요, 리더선택-비선택 구분, 조직도 팀 클릭 영역 설정' },
            { description: '조직도 저장,취소 아이콘변경 확인' },
            { description: '태블릿,모바일 팝업 다자인 , 드래그 방지 공통 클래스 설정' },
            { description: '공통 테이블 ... 처리 or 모두 보여주기 or ...일때 호버나 버튼으로 모든 내용 표시 확인' },
          ],
        },
      ],
    },
  ];

  const [checkedItems, setCheckedItems] = useState(new Array(guideData[1].subsections[0].items.length).fill(false));

  const [checkDates, setCheckDates] = useState(new Array(guideData[1].subsections[0].items.length).fill(null));

  useEffect(() => {
    const storedCheckedItems = JSON.parse(localStorage.getItem('checkedItems'));
    const storedCheckDates = JSON.parse(localStorage.getItem('checkDates'));
    if (storedCheckedItems) setCheckedItems(storedCheckedItems);
    if (storedCheckDates) setCheckDates(storedCheckDates.map((date) => (date ? new Date(date) : null)));
  }, []);

  const handleToggleCheck = (index) => {
    setCheckedItems((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      localStorage.setItem('checkedItems', JSON.stringify(newState));
      return newState;
    });

    setCheckDates((prevDates) => {
      const newDates = [...prevDates];
      newDates[index] = newDates[index] ? null : new Date();
      localStorage.setItem('checkDates', JSON.stringify(newDates));
      return newDates;
    });
  };

  return (
    <div className="guide">
      <h1 className="guide__title">가이드</h1>
      <div className="guide__content">
        {guideData.map((section, index) => (
          <GuideSection
            key={index}
            {...section}
            checkedItems={checkedItems}
            onToggleCheck={handleToggleCheck}
            checkDates={checkDates}
          />
        ))}
      </div>
    </div>
  );
}

export default Guide;
