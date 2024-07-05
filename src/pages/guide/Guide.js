import React from 'react';

function Guide() {
  return (
    <div className="guide">
      <h1 className="guide__title">가이드</h1>
      <div className="guide__content">
        <section className="guide__section">
          <h2 className="guide__section-title">1. 조직도</h2>
          <div className="guide__subsection">
            <h3 className="guide__subsection-title">1.1 리스트 뷰</h3>
            <ul className="guide__list">
              <li className="guide__item">
                <a href="/Orgchart01" target="_blank" rel="noopener noreferrer" className="guide__link">
                  조직도 리스트 전체
                </a>
                <p className="guide__description">전체 조직도를 리스트 형태로 표시합니다.</p>
              </li>
              <li className="guide__item">
                <a href="/Orgchart02" target="_blank" rel="noopener noreferrer" className="guide__link">
                  조직도 팀일괄추가팝업
                </a>
                <p className="guide__description">팀을 일괄적으로 추가할 수 있는 팝업을 표시합니다.</p>
              </li>
            </ul>
          </div>
        </section>
        <section className="guide__section">
          <h2 className="guide__section-title">요청사항</h2>
          <ul className="guide__list">
            <li className="guide__item">
              <p className="guide__description">각 페이지의 반응형 디자인 적용</p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Guide;
