import axios from 'axios';


//getConversationsList
export function getConversationsList() {
    return axios.get('/api/chat/conversations')
}

//getMessageById
export async function getMessage(user) {
    return await axios.get('/api/chat/conversations/query?userId=' + user.u1 + '&userId2=' + user.u2);
}

//sendMessage
export function sendMessage(chatData) {
    axios.post('/api/chat', chatData)
        .then(res => {  })
        .catch(err => { console.log(err) })
}