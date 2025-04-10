import React from 'react';
import ReactDOM from 'react-dom'; // ✅ React 17 방식
import './index.css';
import './styles/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// 측정용 함수 - 필요시 활성화
reportWebVitals();
