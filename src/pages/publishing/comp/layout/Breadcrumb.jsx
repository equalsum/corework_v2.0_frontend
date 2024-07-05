import React from 'react';

const Breadcrumb = ({ breadcrumbItems }) => {
  return (
    <div className="breadCrumb">
      {/* <h1>{breadcrumbItems.subTitle}</h1> */}
      <h2 data-aos="fade-up" data-aos-delay="0">
        {breadcrumbItems.mainTitle}
      </h2>
      <p data-aos="fade-up" data-aos-delay="200">
        {breadcrumbItems.describeTitle}
      </p>
    </div>
  );
};

export default Breadcrumb;
