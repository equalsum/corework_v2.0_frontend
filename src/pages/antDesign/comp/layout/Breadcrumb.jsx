import React from 'react';

const Breadcrumb = ({ breadcrumbItems }) => {
  return (
    <div className='breadCrumb'>
      {/* <h1>{breadcrumbItems.subTitle}</h1> */}
      <h2>{breadcrumbItems.mainTitle}</h2>
      <p>{breadcrumbItems.describeTitle}</p>
    </div>
  );
};

export default Breadcrumb;
