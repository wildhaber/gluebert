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
     * handles and maps incoming messages
     * @param {Message} message
     */
    onMessage(message) {
        if(!message) {
            return false;
        }

        const action = message.getAction();
        const allocatorType = (
            this._actionAllocator &&
            typeof this._actionAllocator === 'object'
        )
            ? typeof this._actionAllocator[action]
            : null;

        if(
            !allocatorType ||
            (
                typeof this._filter === 'function' &&
                !this._filter(message.getData())
            )
        ) {
            return;
        }

        switch (allocatorType) {
            case 'function':
                return this._actionAllocator[action](message.getData());
            case 'object':
                return this._runObjectAllocator(this._actionAllocator[action], message.getData());
            default:
            // ignore
                break;
        }

    }

    /**
     * run against object allocator
     * @param {object} allocator
     * @param {Message.data} data
     * @private
     */
    _runObjectAllocator(allocator, data) {
        const hasFn = (typeof allocator.fn === 'function');
        const hasFilter = (typeof allocator.filter === 'function');

        if(
            !hasFn ||
            (
                hasFilter &&
                !allocator.filter(data)
            )
        ) {
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
        this._filter = (typeof filterMethod === 'function') ? filterMethod : null;
        return this;
    }

}

export {
    MessageDispatcher,
};