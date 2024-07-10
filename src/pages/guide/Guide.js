import React from 'react';
import { Link } from 'react-router-dom';

// 3depth: 개별 항목 컴포넌트
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

// 2depth: 서브섹션 컴포넌트
const GuideSubSection = ({ title, items }) => (
  <div className="guide__subsection">
    {title && <h3 className="guide__subsection-title">{title}</h3>}
    <ul className="guide__list">
      {items.map((item, index) => (
        <GuideItem key={index} {...item} />
      ))}
    </ul>
  </div>
);

// 1depth: 섹션 컴포넌트
const GuideSection = ({ title, subsections, type }) => (
  <section className={`guide__section ${type === 'request' ? 'guide__section--request' : ''}`}>
    <h2 className="guide__section-title">{title}</h2>
    {subsections.map((subsection, index) => (
      <GuideSubSection key={index} {...subsection} />
    ))}
  </section>
);

// 메인 Guide 컴포넌트
function Guide() {
  const guideData = [
    {
      title: '1. 조직도',
      subsections: [
        {
          items: [
            {
              to: '/orgchart01',
              title: 'Orgchart01 - 조직도 리스트 전체',
            },
            {
              to: '/orgchart02',
              title: 'Orgchart02 - 조직도 팀일괄추가팝업',
            },
            {
              to: '/orgchart03',
              title: 'Orgchart03 - 조직도 팀일괄추가팝업_업로드결과- 비정상건, 정상건',
            },
            {
              to: '/orgchart04',
              title: 'Orgchart04 - 조직도 순서 편집',
            },
            {
              to: '/orgchart05',
              title: 'Orgchart05 - 팀 설정 모달',
            },
            {
              to: '/orgchart06',
              title: 'Orgchart06 - 팀 종료 모달 팝업',
            },
            {
              to: '/orgchart07',
              title: 'Orgchart07 - 조직도 종료된 팀',
            },
            {
              to: '/orgchart08',
              title: 'Orgchart08 - 조직도 검색된 팀이 없습니다., 종료된팀이 없습니다 등 empty 페이지 - 공통',
            },
            {
              to: '/orgchart09',
              title: 'Orgchart09 - 팀 운영 전환 모달',
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
          items: [{ description: '각 페이지의 반응형 디자인 적용' }, { description: '다크모드 지원 확인' }],
        },
      ],
    },
  ];

  return (
    <div className="guide">
      <h1 className="guide__title">가이드</h1>
      <div className="guide__content">
        {guideData.map((section, index) => (
          <GuideSection key={index} {...section} />
        ))}
      </div>
    </div>
  );
}

export default Guide;
