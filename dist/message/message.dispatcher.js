/**
 * Class represents MessageDispatcher
 */
class MessageDispatcher {

    /**
     * creates new MessageDispatcher instance
     * @param {object} actionAllocator
     */
    constructor(actionAllocator = null) {
        this._actionAllocator = actionAllocator;
        this._filter = null;
    }

    /**
     * get message allocator type
     * @param {string} action
     * @return {string|null}
     */
    getMessageActionAllocatorType(action) {
        return this._actionAllocator && typeof this._actionAllocator === 'object' ? typeof this._actionAllocator[action] : null;
    }

    /**
     * check validate message on custom filter
     * @param messageData
     * @return {boolean}
     */
    validateMessageOnCustomFilter(messageData) {
        return typeof this._filter === 'function' && !this._filter(messageData);
    }

    /**
     * execute action
     * @param {string} type
     * @param {string} action
     * @param {object|string} messageData
     * @return {*}
     */
    executeAction(type, action, messageData) {
        switch (type) {
            case 'function':
                return this._actionAllocator[action](messageData);
            case 'object':
                return this._runObjectAllocator(this._actionAllocator[action], messageData);
            default:
                // ignore
                break;
        }
    }

    /**
     * handles and maps incoming messages
     * @param {Message} message
     */
    onMessage(message) {
        if (!message) {
            return false;
        }

        const action = message.getAction();
        const allocatorType = this.getMessageActionAllocatorType(action);
        const messageData = message.getData();

        if (!allocatorType || this.validateMessageOnCustomFilter(messageData)) {
            return false;
        }

        return this.executeAction(allocatorType, action, message.getData());
    }

    /**
     * run against object allocator
     * @param {object} allocator
     * @param {Message.data} data
     * @private
     */
    _runObjectAllocator(allocator, data) {
        const hasFn = typeof allocator.fn === 'function';
        const hasFilter = typeof allocator.filter === 'function';

        if (!hasFn || hasFilter && !allocator.filter(data)) {
            return null;
        } else {
            return allocator.fn(data);
        }
    }

    /**
     * define general filter for this dispatcher
     * @param {function} filterMethod
     * @return {MessageDispatcher}
     */
    filter(filterMethod) {
        this._filter = typeof filterMethod === 'function' ? filterMethod : null;
        return this;
    }

}

export { MessageDispatcher };