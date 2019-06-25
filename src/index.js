import { strip } from "_ansi-colors@3.2.4@ansi-colors";

const ts = +new Date()

function BrowserSocket() {
    this.pie = {};
    this.id = ts;
    this.init();
    
    this.lisenter();
    return this;
}
function getStorage() {
    return JSON.parse(localStorage.getItem('BrowserSocket') || '{}')
}
function setStorage(value) {
    localStorage.setItem('BrowserSocket', JSON.stringify(value))
}
function getBrowserSocketStorage (name){
    let storage = getStorage() || {};
    return storage[name] || '';
}
function setBrowserSocketStorage(name, value, change = true){
    let storage = getStorage();
    let item = storage[name];
    if(!item) {
        item = {
            change
        };
        storage[name] = item;
    }
    item.change = change;
    item.context = value;
    setStorage(storage)
}

BrowserSocket.prototype.init = function(){
    let storage = getStorage();
    if(!storage){
        storage = {
            events: {},
            didEvents: {}
        }
    }else {
        if(!storage.events){
            storage.events = {};
        }
        if(!storage.didEvents){
            storage.didEvents = {};
        }
    }
    setStorage(storage)
}




BrowserSocket.prototype.waiting = function (name, callback) {
    const _this = this;
    
    if(!_this.pie[name]){
        _this.pie[name] = [];
    }
    _this.pie[name].push(callback);

    //注册事件
    let storage = getStorage();
    if(!storage.events[name]){
        storage.events[name] = [];
        storage.didEvents[name] = [];
    }
    storage.events[name].push(`${name}-${this.id}`);
    setStorage(storage);
}

BrowserSocket.prototype.emitMsg = function (name, messages) {
    const _this = this;
    if(!_this.pie[name]) return;

    _this.pie[name].forEach((callback, index) => {
        callback(messages, index);
    });
}

BrowserSocket.prototype.lisenter = function(){
    let storage = getStorage();
    let emited = false;
    for(let key in storage){
        if(storage[key] && key !== 'events' && key !== 'didEvents' ){
            let item = storage[key];
            let events = storage.events[key],
                didEvents = storage.didEvents[key];
            //当属于当前页面事件且出发了变化则执行事件
            if(~events.indexOf(`${key}-${this.id}`) && item.change){
                //当时当前页面事件未被执行过则执行改事件
                if(!~didEvents.indexOf(`${key}-${this.id}`)){
                    this.emitMsg(key, item.context);
                    didEvents.push(`${key}-${this.id}`)
                }else{
                    if(didEvents.length === events.length){
                        didEvents = [];
                        item.change = false;
                    }
                }

                emited = true;
            }

        }
    }
    if(emited){
        setStorage(storage)
    }
    setTimeout(() => {
        this.lisenter();
    }, 1000)
}
window.addEventListener('close', () => {
    let storage = getStorage();
    let { events, didEvents } = storage;

    let newEvents = {}, newDidEvents = {};
    for(let key in events){
        let cellEvent = events[key];
        newEvents[key] = [];

        cellEvent.forEach(item => {
            if(item.replace(`${key}-`) === ts){
                newEvents.push()
            }
        })
    }
   

    
})
window.addEventListener('beforeunload', () => {
    debugger
})
export function postMsg(name, messages) {
    let storage = getStorage();
    setBrowserSocketStorage(name, messages);
}
export default BrowserSocket;