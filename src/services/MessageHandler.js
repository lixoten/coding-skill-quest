// MessageHandler.js
/**
Placed in services folder. Utils folder would also make sense
**/
export class MessageHandler {
    constructor() {
        this.messages = [];
    }

    addMessage(message, type = 'norm') {
        this.messages.push({ message, type });
    }

    getMessage() {
        if (this.messages.length > 0) {
            return this.messages.shift();
        } else {
            return null;
        }
    }

    clearMessages() {
        this.messages = [];
    }
}

export default new MessageHandler();
// 27