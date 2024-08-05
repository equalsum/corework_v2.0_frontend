import { useEffect } from 'react';
import { requestAxios } from '../../api/Axios';
import CODE from "../../constants/code";
import { setSessionItem } from "../../utils/storage";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const GoogleSsoRedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let code = new URL(window.location.href).searchParams.get('code');

        if (code) {
            requestAxios('/permission-google-sso',
                { method: 'POST', data: { code: code } },
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
                    navigate('/login');
                }
            );
        } else {
            navigate('/login');
        }
    }, [navigate]);

    return null;
}

export default GoogleSsoRedirectHandler;
