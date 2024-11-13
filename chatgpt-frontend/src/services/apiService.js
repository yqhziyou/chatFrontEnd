import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (username, password) => {
    return axios.post(`${API_URL}/users/register`, { username, password });
};

export const loginUser = async (username, password) => {
    return axios.post(`${API_URL}/users/login`, { username, password });
};

export const sendMessage = async (userID, sessionID,message,selectedModel) => {
    return axios.post(`${API_URL}/messages/sendMessage`, { userID, sessionID,message,selectedModel });
};

export const deleteChatHistory = async (userID, sessionId) => {
    return axios.delete(`${API_URL}/user/remove-session`, {
        params: { userID, sessionId }
    });
};