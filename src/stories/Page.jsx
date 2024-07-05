import React from 'react';
import { Button } from 'antd';
import 'antd/dist/reset.css'; // antd v5 이상
import './page.css';

export const Page = () => {
  return (
    <div className="storybook-page">
      <h1>Button Examples</h1>
      <div className="button-container">
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </div>
    </div>
  );
};