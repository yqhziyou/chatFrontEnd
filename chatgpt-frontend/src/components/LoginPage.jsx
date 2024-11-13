import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 用于导航
import { registerUser, loginUser } from '../services/apiService';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // 初始化导航

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                // 注册逻辑
                const result = await registerUser(username, password);
                if (result.success) {
                    setMessage('注册成功，请登录');
                    setIsRegistering(false); // 注册成功后切换到登录模式
                } else {
                    setMessage(result.error || '注册失败');
                }
            } else {
                // 登录逻辑
                const result = await loginUser(username, password);
                console.log(result.data.success);
                if (result.data.success) {
                    setMessage('登录成功');
                    // 存储用户信息或令牌（可选）
                    // localStorage.setItem('userToken', result.token);
                    // 跳转到主页
                    navigate('/home'); // 假设主页路径是 /home
                } else {
                    setMessage(result.error || '登录失败');
                }
            }
        } catch (error) {
            console.error(error);
            setMessage('操作失败，请检查输入的信息');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
                <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? 'Switch to Login' : 'Switch to Register'}
                </button>
            </form>
            {message && <p>{message}</p>} {/* 显示提示信息 */}
        </div>
    );
};

export default LoginPage;