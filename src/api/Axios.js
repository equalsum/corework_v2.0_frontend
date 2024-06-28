import axios from 'axios';

// axios 인스턴스 생성
const axiosInstance = axios.create({});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export function requestAxios(url, requestOptions, handler, errorHandler) {
    axiosInstance(url, requestOptions)
        .then(response => {
            if (typeof handler === 'function') {
                handler(response);
            } else {
                console.log('Axios handler not assigned!');
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
            if (typeof errorHandler === 'function') {
                errorHandler(error);
            } else {
                console.error('Axios error handler not assigned!');
                alert("ERR : " + error.message);
            }
        });
}
