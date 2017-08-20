"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class represents Message
 */
var Message = function () {

    /**
     * create new action
     * @param {string} action
     * @param {object|null} data
     */
    function Message(action) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, Message);

        this.action = action;
        this.data = data;
    }

    /**
     * get action message key
     * @return {string}
     */


    _createClass(Message, [{
        key: "getAction",
        value: function getAction() {
            return this.action;
        }

        /**
         * get message data
         * @return {Object|null}
         */

    }, {
        key: "getData",
        value: function getData() {
            return this.data;
        }

        /**
         * checks if message contains data
         * @return {boolean}
         */

    }, {
        key: "hasData",
        value: function hasData() {
            return !!this.data;
        }
    }]);

    return Message;
}();

exports.Message = Message;