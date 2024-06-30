import axios from "axios";

const getChatbotToken = async () => {
    try {
        const options = {
            method: 'GET',
            url: 'https://3b53874f0790e18783cb31b6427624.1e.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cre8f_mockBot/directline/token?api-version=2022-03-01-preview',
            timeout: 5000,
            withCredentials: false,
            headers: {
                'Content-type': 'application/json',
            },
            json:true,
        }
        const response = await axios(options);
        return response.data;
    }catch(err){
        console.log(err);
    }
};

const chatbotConversation = async (token) => {
    try {
        const opt = {
            method: 'POST',
            url: 'https://directline.botframework.com/v3/directline/conversations',
            timeout: 5000,
            withCredentials: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            json: true,
        }
        const response = await axios(opt);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const sendMessage = async (conversationId, token, body) => {
    try {
        const options = {
            method: 'POST',
            url: `https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities`,
            timeout: 5000,
            withCredentials: false,
            data: body,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            json: true,
        }
        const response = await axios(options);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getChatbotToken,
    chatbotConversation,
    sendMessage,
};