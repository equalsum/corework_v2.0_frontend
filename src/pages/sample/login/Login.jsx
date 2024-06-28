import React from 'react';
import { Link } from 'react-router-dom';

import LoginContent from 'pages/sample/login/LoginContent';

import URL from 'constants/url';

function Login(props) {
    console.group("Login");
    console.log("[Start] Login ------------------------------");
    console.log("Login [props] : ", props);

    const onChangeLogin = (user) => {
        props.onChangeLogin(user);
    }

    console.log("------------------------------Login [End]");
    console.groupEnd("Login");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                   {/* <ul>
                        <li><Link to={URL.MAIN} className="home" >Home</Link></li>
                        <li>로그인</li>
                    </ul>*/}
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    <LoginContent
                        onChangeLogin={onChangeLogin}
                    ></LoginContent>
                </div>
            </div>
        </div>
    );
}

export default Login;