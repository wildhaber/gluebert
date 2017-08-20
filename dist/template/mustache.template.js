'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MustacheTemplate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _template = require('./template.abstract');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class represents MustacheTemplate
 */
var MustacheTemplate = function (_TemplateAbstract) {
    _inherits(MustacheTemplate, _TemplateAbstract);

    /**
     * creates a new MustacheTemplate
     * @param {function} engine - template engine
     */
    function MustacheTemplate(engine) {
        _classCallCheck(this, MustacheTemplate);

        return _possibleConstructorReturn(this, (MustacheTemplate.__proto__ || Object.getPrototypeOf(MustacheTemplate)).call(this, engine));
    }

    /**
     * creates a new mustache view
     * @param {string} template
     * @return {string}
     */


    _createClass(MustacheTemplate, [{
        key: 'createView',
        value: function createView(template) {
            return template;
        }

        /**
         * render view
         * @param {string} view
         * @param {object} data
         * @return {string}
         */

    }, {
        key: 'render',
        value: function render(view, data) {
            return this.engine.render(view, data);
        }
    }]);

    return MustacheTemplate;
}(_template.TemplateAbstract);

exports.MustacheTemplate = MustacheTemplate;