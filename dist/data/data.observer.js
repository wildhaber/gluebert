'use strict';var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a},_createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_message=require('../message/message.dispatcher');Object.defineProperty(exports,'__esModule',{value:!0}),exports.DataObserver=void 0;function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var DataObserver=function(){function a(){_classCallCheck(this,a),this._observables={},this._signatures={},this._subscriptions=new Map}return _createClass(a,[{key:'addSignature',value:function addSignature(a){return this._signatures[a.key]=Object.assign({},a,{busy:!1}),this}},{key:'removeSignature',value:function removeSignature(a){return delete this._signatures[a.key],this}},{key:'getSignature',value:function getSignature(a){return'object'===_typeof(this._signatures[a])?this._signatures[a]:null}},{key:'setSignatureBusy',value:function setSignatureBusy(a){return'object'===_typeof(this._signatures[a])&&(this._signatures[a].busy=!0),this}},{key:'isSignatureBusy',value:function isSignatureBusy(a){return'object'===_typeof(this._signatures[a])&&this._signatures[a].busy}},{key:'addObservable',value:function addObservable(a,b){return a&&'string'==typeof a&&b&&~['function','object'].indexOf('undefined'==typeof b?'undefined':_typeof(b))?(this._observables[a]={observable:b.getObservable(),push:'function'==typeof b.push?b.push.bind(b):null},this):this}},{key:'removeObservable',value:function removeObservable(a){return delete this._observables[a],this}},{key:'_observableExists',value:function _observableExists(a){return!!a&&'string'==typeof a&&!!this._observables[a]&&'object'===_typeof(this._observables[a])&&!!this._observables[a].observable&&'object'===_typeof(this._observables[a].observable)&&'function'==typeof this._observables[a].observable.subscribe}},{key:'_signatureExists',value:function _signatureExists(a){return'object'===_typeof(this._signatures[a])}},{key:'_addSubscription',value:function _addSubscription(a,b,c){this._subscriptions.has(a)||this._subscriptions.set(a,new Set);var d=this._subscriptions.get(a);return d.add({key:b,subscription:c}),this._subscriptions.set(a,d),this}},{key:'getSubscriptions',value:function getSubscriptions(a){return this._subscriptions.get(a)}},{key:'getSubscription',value:function getSubscription(a,b){var c=a?this.getSubscriptions(a):null,d=c&&c instanceof Set?Array.from(c).filter(function(a){return a.key===b}):[];return d.length?d[0].subscription:null}},{key:'subscriptionExists',value:function subscriptionExists(a,b){var c=this.getSubscription(a,b);return!!c}},{key:'handleSubscription',value:function handleSubscription(a,b,c,d,e){var f=5<arguments.length&&void 0!==arguments[5]?arguments[5]:null,g='function'==typeof c?c:c&&'object'===('undefined'==typeof c?'undefined':_typeof(c))?new _message.MessageDispatcher(c).filter(f):null;if(!g)throw new Error('No next method declared calling .subscribe()');else g instanceof _message.MessageDispatcher&&(g=g.onMessage.bind(g));var h=this._observables[b].observable.subscribe(g,d,e);return this._addSubscription(a,b,h)}},{key:'initializeSignature',value:function initializeSignature(a,b,c,d,e){var f=this,g=5<arguments.length&&void 0!==arguments[5]?arguments[5]:null;this.setSignatureBusy(b);var h=this.getSignature(b);return h&&'function'==typeof h.importModule&&h.importModule().then(function(h){try{if(f.addObservable(b,new h(f)),f.removeSignature(b),f._observableExists(b))f.subscribe(a,b,c,d,e,g);else throw new Error('Observable could not be instanciated. ('+b+')')}catch(a){throw f.removeSignature(b),new Error(a)}}).catch(function(){return f}),this}},{key:'subscribe',value:function subscribe(a,b,c,d,e){var f=this,g=5<arguments.length&&void 0!==arguments[5]?arguments[5]:null,h=this._observableExists(b),i=this._signatureExists(b),j=this.isSignatureBusy(b);if(!h&&!i)return this;if(h)return this.handleSubscription(a,b,c,d,e,g);if(j)window.setTimeout(function(){return f.subscribe(a,b,c,d,e,g)},100);else return this.initializeSignature(a,b,c,d,e,g);return this}},{key:'unsubscribeFrom',value:function unsubscribeFrom(a,b){var c=this.getSubscription(a,b);return c&&'function'==typeof c.unsubscribe&&c.unsubscribe(),this}},{key:'unsubscribeAll',value:function unsubscribeAll(a){var b=this.getSubscriptions(a);return b&&b instanceof Set&&b.size&&b.forEach(function(a){a&&'object'===('undefined'==typeof a?'undefined':_typeof(a))&&'object'===_typeof(a.subscription)&&a.subscription&&'function'==typeof a.subscription.unsubscribe&&a.subscription.unsubscribe()}),this}},{key:'unsubscribe',value:function unsubscribe(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;return b&&this.subscriptionExists(a,b)?this.unsubscribeFrom(a,b):!b&&this.unsubscribeAll(a),this}},{key:'pushTo',value:function pushTo(a,b){if(this._observableExists(a))if('function'==typeof this._observables[a].push)this._observables[a].push(b);else throw new Error('Observable ('+a+') does not provide a .push() method.');return this}}]),a}();exports.DataObserver=DataObserver;