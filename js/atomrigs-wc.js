/*! For license information please see index.js.LICENSE.txt */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.exampleTypescriptPackage=e():t.exampleTypescriptPackage=e()}(this,(()=>(()=>{var t={628:()=>{!function(){"use strict";!function(){if(void 0===window.Reflect||void 0===window.customElements||window.customElements.polyfillWrapFlushCallback)return;const t=HTMLElement;window.HTMLElement={HTMLElement:function(){return Reflect.construct(t,[],this.constructor)}}.HTMLElement,HTMLElement.prototype=t.prototype,HTMLElement.prototype.constructor=HTMLElement,Object.setPrototypeOf(HTMLElement,t)}()}()},480:function(t,e){"use strict";var n,o=this&&this.__extends||(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});Object.defineProperty(e,"__esModule",{value:!0}),e.SpanElement=void 0;var r=function(t){function e(){var e=t.call(this)||this;return e.json=null,e}return o(e,t),e.prototype.render=function(){var t,e,n=new URLSearchParams(window.location.search),o=n.has("lang")?n.get("lang"):"kr";if(this.json){var r=null!==(t=this.json[o])&&void 0!==t?t:this.json.kr,s=this.getAttribute("textKey");s&&r&&(this.innerHTML="".concat(null!==(e=r[s])&&void 0!==e?e:""))}},e.prototype.connectedCallback=function(){var t=this;fetch("assets/texts.json").then((function(t){return t.json()})).then((function(e){t.json=e,t.render()})),this.render()},e}(HTMLElement);e.SpanElement=r}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var s=e[o]={exports:{}};return t[o].call(s.exports,s,s.exports,n),s.exports}var o={};return(()=>{"use strict";var t=o;Object.defineProperty(t,"__esModule",{value:!0}),n(628);var e=n(480);customElements.define("atomrigs-span",e.SpanElement)})(),o})()));