/**
 * Class represents Message
 */
class Message {

    /**
     * create new action
     * @param {string} action
     * @param {object|null} data
     */
    constructor(action, data = null) {
        this.action = action;
        this.data = data;
    }

    /**
     * get action message key
     * @return {string}
     */
    getAction() {
        return this.action;
    }

    /**
     * get message data
     * @return {Object|null}
     */
    getData() {
        return this.data;
    }

    /**
     * checks if message contains data
     * @return {boolean}
     */
    hasData() {
        return !!this.data;
    }
}

export {
    Message,
};