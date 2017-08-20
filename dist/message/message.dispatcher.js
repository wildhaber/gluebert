'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class represents MessageDispatcher
 */
var MessageDispatcher = function () {

    /**
     * creates new MessageDispatcher instance
     * @param {object} actionAllocator
     */
    function MessageDispatcher(actionAllocator) {
        _classCallCheck(this, MessageDispatcher);

        this._actionAllocator = actionAllocator;
        this._filter = null;
    }

    /**
     * handles and maps incoming messages
     * @param {Message} message
     */


    _createClass(MessageDispatcher, [{
        key: 'onMessage',
        value: function onMessage(message) {
            var action = message.getAction();
            var allocatorType = _typeof(this._actionAllocator[action]);

            if (!allocatorType || typeof this._filter === 'function' && !this._filter(message.getData())) {
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

    }, {
        key: '_runObjectAllocator',
        value: function _runObjectAllocator(allocator, data) {
            var hasFn = typeof allocator.fn === 'function';
            var hasFilter = typeof allocator.filter === 'function';

            if (!hasFn || hasFilter && !allocator.filter(data)) {
                return;
            } else {
                return allocator.fn(data);
            }
        }

        /**
         * define general filter for this dispatcher
         * @param {function} filterMethod
         * @return {MessageDispatcher}
         */

    }, {
        key: 'filter',
        value: function filter(filterMethod) {
            this._filter = typeof filterMethod === 'function' ? filterMethod : null;
            return this;
        }
    }]);

    return MessageDispatcher;
}();

exports.MessageDispatcher = MessageDispatcher;