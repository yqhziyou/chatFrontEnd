import React, { useState } from 'react';
import { sendMessage, deleteChatHistory } from '../services/apiService';
import Message from './Message';

const ChatWindow = ({ sessionID }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSend = async () => {
        if (inputMessage.trim()) {
            try {
                const response = await sendMessage(
                    '6733b3dee8afaaffce1e0f73', // userID
                    'test1', // sessionID
                    inputMessage, // message
                    "gpt-4o-mini" // selectedModel
                );
                console.log("handleSend in chat window", response);
                
                // 从响应中提取实际的消息文本
                const botMessage = response.data.data || response.data;
                
                setInputMessage('');
                setMessages([
                    ...messages, 
                    { sender: 'user', text: inputMessage }, 
                    { sender: 'bot', text: botMessage }
                ]);
            } catch (error) {
                console.error('Error sending message:', error);
                // 可以添加错误处理，比如显示错误消息
            }
        }
    };




    const handleDeleteHistory = async () => {
        await deleteChatHistory(sessionID);
        setMessages([]);
    };

    return (
        <div style={{ 
            width: '80%', 
            maxWidth: '600px', 
            display: 'flex', 
            flexDirection: 'column',
            height: '80vh',
            margin: '0 auto',
            padding: '20px'
        }}>
            <div style={{ 
                flex: 1, 
                overflowY: 'auto', 
                marginBottom: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '10px'
            }}>
                {messages.map((msg, index) => (
                    <Message key={index} sender={msg.sender} text={msg.text} />
                ))}
            </div>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', marginBottom: '10px' }}
            />
            <button onClick={handleSend} style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>Send</button>
            <button onClick={handleDeleteHistory} style={{ padding: '10px', fontSize: '16px', cursor: 'pointer', marginTop: '5px' }}>Delete Chat History</button>
        </div>
    );
};

export default ChatWindow;