'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class represents TemplateAbstract
 */
var TemplateAbstract = function () {

    /**
     * create TemplateAbstract instance
     * @param {function} engine - template engine
     * */
    function TemplateAbstract(engine) {
        _classCallCheck(this, TemplateAbstract);

        this.engine = engine;
    }

    /**
     * create view
     */


    _createClass(TemplateAbstract, [{
        key: 'createView',
        value: function createView() {
            throw new Error('Template engine must provide a .createView() method');
        }

        /**
         * actual render function of the template and the data
         */

    }, {
        key: 'render',
        value: function render() {
            throw new Error('Template engine must provide a .render() method');
        }
    }]);

    return TemplateAbstract;
}();

exports.TemplateAbstract = TemplateAbstract;