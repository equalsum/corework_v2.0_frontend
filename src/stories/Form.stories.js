import React from 'react';
import { Form, Input, Select, Upload, Button, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default {
  title: 'Ant Design/ProfileForm',
  component: Form,
  argTypes: {
    layout: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
  },
};

export const ProfileForm = ({ layout }) => (
  <Form layout={layout} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
    <Form.Item name="avatar" label="프로필 사진">
      <Upload>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </Form.Item>

    <Form.Item name="firstName" label="이름" required>
      <Space.Compact>
        <Input placeholder="성" style={{ width: '50%' }} />
        <Input placeholder="이름" style={{ width: '50%' }} />
      </Space.Compact>
    </Form.Item>

    <Form.Item name="nickName" label="구분자 입력 (선택)">
      <Input />
    </Form.Item>

    <Form.Item name="email" label="이메일" required>
      <Input />
    </Form.Item>

    <Form.Item name="password" label="비밀번호">
      <Input.Password />
    </Form.Item>

    <Form.Item name="phone" label="휴대폰 번호" required>
      <Input />
    </Form.Item>

    <Form.Item name="department" label="글머리">
      <Select>
        <Select.Option value="개발팀">개발팀</Select.Option>
        <Select.Option value="디자인팀">디자인팀</Select.Option>
        <Select.Option value="마케팅팀">마케팅팀</Select.Option>
      </Select>
    </Form.Item>

    <Form.Item name="jobTitle" label="직책">
      <Input />
    </Form.Item>

    <Form.Item name="position" label="직무">
      <Input />
    </Form.Item>

    <Form.Item name="additionalRole" label="추가 역할">
      <Input />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
      <Button type="primary" htmlType="submit">
        저장
      </Button>
    </Form.Item>
  </Form>
);

ProfileForm.args = {
  layout: 'horizontal',
};
