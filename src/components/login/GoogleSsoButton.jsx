import React, { useEffect } from 'react';
import { requestAxios } from "../../api/Axios";
import CODE from "../../constants/code";
import { setSessionItem } from "../../utils/storage";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const GoogleSsoButton = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const initializeGoogleSignIn = () => {
            window.google.accounts.id.initialize({
                client_id: '87194862912-jb30g2annqm2r78bct7su813bh83oj66.apps.googleusercontent.com',
                callback: handleCredentialResponse
            });

            window.google.accounts.id.renderButton(
                document.getElementById('googleSsoDiv'),
                { theme: 'outline', size: 'medium', type: 'standard', shape: 'pill', context: 'signin', width: '300px', logo_alignment: 'center' }
            );
        };

        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = initializeGoogleSignIn;
        document.body.appendChild(script);

    }, []);

    const handleCredentialResponse = (response) => {
        const idToken = response.credential;

        requestAxios('/google-sso1',
            { method: 'POST', data: { idToken: idToken } },
            (response) => {
                if (Number(response.data.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    let resultVO = response.data.resultVO;
                    let jToken = response.data?.jToken || null;

                    setSessionItem('jToken', jToken);
                    setSessionItem('loginUser', resultVO);
                    navigate('/mycheckin');
                } else {
                    alert(response.data.resultMessage);
                }
            },
            (error) => {
                message.error('Login failed');
            }
        );
    };

    return <div id="googleSsoDiv"></div>;
};

export default GoogleSsoButton;
