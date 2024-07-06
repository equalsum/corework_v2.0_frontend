import React from 'react';

// 3depth: 개별 항목 컴포넌트
const GuideItem = ({ href, title, description }) => (
  <li className="guide__item">
    {href && title ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="guide__link">
        {title}
      </a>
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
          title: '1.1 리스트 뷰',
          items: [
            {
              href: '/Orgchart01',
              title: '조직도 리스트 전체',
            },
            {
              href: '/Orgchart02',
              title: '조직도 팀일괄추가팝업',
            },
            {
              href: '/Orgchart03',
              title: '조직도 팀일괄추가팝업_업로드결과- 비정상건',
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
