import React, {useState} from 'react';
import {Button, Form, Input, message} from 'antd';
import login_img1 from '../../css/images/login_img1.png';
import {requestAxios} from "../../api/Axios";
import CODE from 'constants/code';
import { setSessionItem } from 'utils/storage';

const LoginPage = ({onLogin}) => {
    const [loading, setLoading] = useState(false);

    const handleFinish = async (values) => {
        setLoading(true);
        requestAxios('/login-check'
            , {method: 'POST', data: values}
            , (response) => {
                if (Number(response.data.resultCode) === Number(CODE.RCV_SUCCESS)) {

                    let resultVO = response.data.resultVO;
                    let jToken = response.data?.jToken || null;

                    setSessionItem('jToken', jToken);
                    setSessionItem('loginUser', resultVO);
                    onLogin();
                } else {
                    alert(response.data.resultMessage)
                }
                setLoading(false);
            }
            , (error) => {
                message.error('Login failed');
                setLoading(false);
            }
        );
    };

    return (
        <div className="login-root">
            <div className="login-container">
                <div className="login-image">
                    <img src={login_img1} alt="Login"/>
                </div>
                <div className="login-form">
                    <h2>로그인</h2>
                    <Form
                        name="login"
                        onFinish={handleFinish}
                        style={{maxWidth: 300, margin: '0 auto', padding: '50px 0'}}
                    >
                        <Form.Item
                            name="cu_email"
                            rules={[{required: true, message: '이메일을 입력해주세요.'}]}
                        >
                            <Input placeholder="이메일" autoComplete="email"/>
                        </Form.Item>
                        <Form.Item
                            name="cu_pw"
                            rules={[{required: true, message: '비밀번호를 입력해주세요.'}]}
                        >
                            <Input.Password placeholder="비밀번호" autoComplete="current-password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} block>
                                로그인
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;