'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TwigTemplate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _template = require('./template.abstract');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class represents TwigTemplate
 */
var TwigTemplate = function (_TemplateAbstract) {
    _inherits(TwigTemplate, _TemplateAbstract);

    /**
     * creates a new TwigTemplate
     * @param {function} engine
     */
    function TwigTemplate(engine) {
        _classCallCheck(this, TwigTemplate);

        return _possibleConstructorReturn(this, (TwigTemplate.__proto__ || Object.getPrototypeOf(TwigTemplate)).call(this, engine));
    }

    /**
     * creates a new twig view
     * @param {string} template
     * @return {function}
     */


    _createClass(TwigTemplate, [{
        key: 'createView',
        value: function createView(template) {
            return this.engine.twig({
                data: template
            });
        }

        /**
         * render view
         * @param {function} view
         * @param {object} data
         * @return {string}
         */

    }, {
        key: 'render',
        value: function render(view, data) {
            return view.render(data);
        }
    }]);

    return TwigTemplate;
}(_template.TemplateAbstract);

exports.TwigTemplate = TwigTemplate;