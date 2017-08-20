"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing DataSignature
 * @class DataSignature
 */
var DataSignature =

/**
 * creates new DataSignature object
 * @param {string} key
 * @param {function} importModule
 */
function DataSignature(key, importModule) {
    _classCallCheck(this, DataSignature);

    this.key = key;
    this.importModule = importModule;
};

exports.DataSignature = DataSignature;