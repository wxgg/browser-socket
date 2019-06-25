import BrowserSocket, {postMsg} from 'browser-socket';

let browserSocket = new BrowserSocket();

browserSocket.waiting('click', (messages, index) => {
    console.log(messages)
});


postMsg('click', {aaa: 1})