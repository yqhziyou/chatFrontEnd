import React from 'react';

const Message = ({ sender, text }) => {
    return (
        <div style={{
            alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: sender === 'user' ? '#DCF8C6' : '#E8E8E8',
            padding: '10px',
            borderRadius: '8px',
            margin: '5px 0',
            maxWidth: '60%',
            wordBreak: 'break-word'
        }}>
            <p style={{ margin: 0 }}><strong>{sender === 'user' ? 'You' : 'AI'}:</strong> {text}</p>
        </div>
    );
};

export default Message;