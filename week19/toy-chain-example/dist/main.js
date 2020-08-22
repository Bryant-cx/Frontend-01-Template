/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/createElement.js":
/*!******************************!*\
  !*** ./lib/createElement.js ***!
  \******************************/
/*! exports provided: create, Text, Wrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return create; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wrapper\", function() { return Wrapper; });\n/* harmony import */ var _gesture_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gesture.js */ \"./lib/gesture.js\");\n/* harmony import */ var _gesture_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_gesture_js__WEBPACK_IMPORTED_MODULE_0__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\nfunction create(Cls, attributes) {\n  var o; // 遇到以小写字母作为标签的组件\n\n  if (typeof Cls === 'string') {\n    o = new Wrapper(Cls);\n  } else {\n    o = new Cls({\n      timer: {}\n    });\n  }\n\n  for (var name in attributes) {\n    o.setAttribute(name, attributes[name]);\n  }\n\n  var visit = function visit(children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n\n        // 如果children是数组，需要递归遍历\n        if (_typeof(child) === 'object' && child instanceof Array) {\n          visit(child);\n          continue;\n        }\n\n        if (typeof child === 'string') {\n          child = new Text(child);\n        }\n\n        o.children.push(child);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  visit(children);\n  return o;\n}\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(Text, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      return;\n    }\n  }]);\n\n  return Text;\n}();\nvar Wrapper = /*#__PURE__*/function () {\n  function Wrapper(type) {\n    _classCallCheck(this, Wrapper);\n\n    this.root = document.createElement(type);\n    this.children = [];\n  } // 设置attr\n\n\n  _createClass(Wrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      this.root.setAttribute(name, value); // 由于enableGesture只对真实dom节点有效，所以我们让它作用于根节点\n\n      if (name === 'enableGesture') {\n        Object(_gesture_js__WEBPACK_IMPORTED_MODULE_0__[\"enableGesture\"])(this.root);\n      } // 处理on事件\n\n\n      if (name.match(/^on([\\s\\S]+)$/)) {\n        var eventName = RegExp.$1.replace(/^[\\s\\S]/, function (c) {\n          return c.toLowerCase();\n        });\n        this.addEventListener(eventName, value);\n      }\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      return this.root.getAttribute(name);\n    }\n  }, {\n    key: \"appendChild\",\n    // 处理子节点\n    value: function appendChild(child) {\n      this.children.push(child);\n    } // 绑定事件\n\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, handler, config) {\n      var _this$root;\n\n      (_this$root = this.root).addEventListener.apply(_this$root, arguments);\n    } // 获取属性\n\n  }, {\n    key: \"mountTo\",\n    // 挂载到父节点\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }, {\n    key: \"classList\",\n    get: function get() {\n      return this.root.classList;\n    }\n  }, {\n    key: \"style\",\n    get: function get() {\n      return this.root.style;\n    }\n  }, {\n    key: \"innerText\",\n    set: function set(text) {\n      return this.root.innerText = text;\n    }\n  }]);\n\n  return Wrapper;\n}();\n\n//# sourceURL=webpack:///./lib/createElement.js?");

/***/ }),

/***/ "./lib/gesture.js":
/*!************************!*\
  !*** ./lib/gesture.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e6) { throw _e6; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e7) { didErr = true; err = _e7; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction enableGesture(element) {\n  // 用一个对象保存事件的对应关系\n  var contexts = Object.create(null); // 用symbol保存事件对象，与touch事件区分开\n\n  var MOUSE_SYMBOL = Symbol('mouse'); // 将鼠标事件与touch事件区分开，移动端的时候屏蔽鼠标事件\n  // 移动端时，document.ontouchstart值为null；pc端时，document.ontouchstart值为undefined\n\n  if (document.ontouchstart !== null) {\n    // 监听鼠标按下事件，在这个状态中鼠标移动事件和鼠标松开事件\n    element.addEventListener('mousedown', function (event) {\n      contexts[MOUSE_SYMBOL] = Object.create(null);\n      start(event, contexts[MOUSE_SYMBOL]); // 监听鼠标移动事件\n\n      var mousemove = function mousemove(event) {\n        move(event, contexts[MOUSE_SYMBOL]);\n      }; // 监听鼠标松开事件\n      // 此时，清除事件监听\n\n\n      var mouseup = function mouseup(event) {\n        end(event, contexts[MOUSE_SYMBOL]); // 清除事件监听\n\n        document.removeEventListener('mousemove', mousemove);\n        document.removeEventListener('mouseup', mouseup);\n      };\n\n      document.addEventListener('mousemove', mousemove);\n      document.addEventListener('mouseup', mouseup);\n    });\n  } // 监听touch事件\n\n\n  element.addEventListener('touchstart', function (event) {\n    var _iterator = _createForOfIteratorHelper(event.changedTouches),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var touch = _step.value;\n        contexts[touch.identifier] = Object.create(null);\n        start(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  }); // 监听touchmove事件\n\n  element.addEventListener('touchmove', function (event) {\n    var _iterator2 = _createForOfIteratorHelper(event.changedTouches),\n        _step2;\n\n    try {\n      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n        var touch = _step2.value;\n        move(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator2.e(err);\n    } finally {\n      _iterator2.f();\n    }\n  }); // 监听touchend事件\n\n  element.addEventListener('touchend', function (event) {\n    var _iterator3 = _createForOfIteratorHelper(event.changedTouches),\n        _step3;\n\n    try {\n      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n        var touch = _step3.value;\n        end(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator3.e(err);\n    } finally {\n      _iterator3.f();\n    }\n  }); // 监听touchcancel事件\n\n  element.addEventListener('touchcancel', function (event) {\n    var _iterator4 = _createForOfIteratorHelper(event.changedTouches),\n        _step4;\n\n    try {\n      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {\n        var touch = _step4.value;\n        cancel(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator4.e(err);\n    } finally {\n      _iterator4.f();\n    }\n  });\n  /**\n   * 事件抽象\n   * tap，轻触屏幕\n   * pan，在屏幕上移动距离超过10px，包括panstart和pan两个状态，也可以包含panend，可以由tap或者press转变过来\n   * press，与屏幕接触事件超过0.5s，包含pressstart，pressend两个状态\n   * flick，快速地从屏幕扫过，可以从tap，pan，或者press转变过来\n   * \n   *                                 end\n   *                       start -------------> tap\n   *                     /      \\\n   *                   /         \\                             panend\n   *                 />0.5s       \\move > 10px                  /\n   *               /               \\                          /end\n   *             /                  \\            move       /\n   *           press               panstart  ---------->  pan\n   *          /      \\                /                 /\n   *        /         \\               /               /\n   *      /end         \\move>10px     /move>10px    /move>10px\n   *    /               \\             /           /\n   *  pressend           \\            /         /\n   *                                flick\n   */\n  // 抽象start事件\n\n  var start = function start(point, context) {\n    console.log('tap'); // 记录touch的起始位置\n\n    context.startX = point.clientX;\n    context.startY = point.clientY; // 初始化事件状态，默认为tap事件\n\n    context.isTap = true; // 是否为press事件\n\n    context.isPress = false; // 是否是pan事件\n\n    context.isPan = false; // 记录拖动轨迹\n\n    context.moves = []; // 设置一个定时器，0.5s后切换事件状态\n\n    context.timer = setTimeout(function () {\n      // 如果已经是pan事件了，不能切换\n      if (context.isPan) {\n        return;\n      } // 切换为press事件\n\n\n      context.isTap = false;\n      context.isPan = false;\n      context.isPress = true;\n      console.log('press start'); // 派发press事件\n\n      var e = new CustomEvent('press');\n      element.dispatchEvent(Object.assign(e, {\n        clientX: point.clientX,\n        clientY: point.clientY\n      }));\n    }, 500);\n  }; // 抽象move事件\n\n\n  var move = function move(point, context) {\n    // 获取当前移动距离\n    var dx = point.clientX - context.startX;\n    var dy = point.clientY - context.startY; // 如果移动距离超过10px，将事件状态切换为pan\n\n    if (Math.pow(dx, 2) + Math.pow(dy, 2) > 100 && !context.isPan) {\n      if (context.isPress) {\n        console.log('press cancel'); // 派发press cancel事件\n\n        var _e = new CustomEvent('pressCancel');\n\n        element.dispatchEvent(Object.assign(_e, {\n          clientX: point.clientX,\n          clientY: point.clientY\n        }));\n      }\n\n      context.isPress = false;\n      context.isTap = false;\n      context.isPan = true;\n      console.log('pan start'); // 派发pan start事件\n\n      var e = new CustomEvent('panStart');\n      element.dispatchEvent(Object.assign(e, {\n        clientX: point.clientX,\n        clientY: point.clientY,\n        startX: context.startX,\n        startY: context.startY\n      }));\n    }\n\n    if (context.isPan) {\n      // 派发pan事件\n      var _e2 = new CustomEvent('pan');\n\n      element.dispatchEvent(Object.assign(_e2, {\n        startX: context.startX,\n        startY: context.startY,\n        clientX: point.clientX,\n        clientY: point.clientY\n      }));\n    } // 记录移动过程\n\n\n    context.moves.push({\n      clientX: point.clientX,\n      clientY: point.clientY,\n      time: Date.now()\n    }); // 只记录最近300ms内的移动轨迹\n\n    context.moves = context.moves.filter(function (record) {\n      return Date.now() - record.time < 300;\n    });\n  }; // 抽象end事件\n\n\n  var end = function end(point, context) {\n    // 清除定时器\n    clearTimeout(context.timer);\n\n    if (context.isTap) {\n      console.log('tap end'); // 派发tap事件\n\n      var e = new CustomEvent('tap');\n      element.dispatchEvent(e);\n    }\n\n    if (context.isPress) {\n      console.log('press end'); // 派发pressend事件\n\n      var _e3 = new CustomEvent('pressEnd');\n\n      element.dispatchEvent(Object.assign(_e3, {\n        clientX: point.clientX,\n        clientY: point.clientY\n      }));\n    }\n\n    if (context.isPan) {\n      console.log('pan end'); // 计算移动速度\n\n      var record = context.moves[0];\n      var speed = Math.sqrt(Math.pow(point.clientX - record.clientX, 2) + Math.pow(point.clientY - record.clientY, 2)) / (Date.now() - record.time); // 是否是flick事件\n\n      var isFlick = speed > 1; // 切换事件状态\n\n      if (isFlick) {\n        console.log('flick'); // 派发flick事件\n\n        var _e5 = new CustomEvent('flick');\n\n        element.dispatchEvent(Object.assign(_e5, {\n          startX: context.startX,\n          startY: context.startY,\n          clientX: point.clientX,\n          clientY: point.clientY,\n          speed: speed\n        }));\n      } // 派发pan end事件\n\n\n      var _e4 = new CustomEvent('panEnd');\n\n      element.dispatchEvent(Object.assign(_e4, {\n        startX: context.startX,\n        startY: context.startY,\n        clientX: point.clientX,\n        clientY: point.clientY,\n        speed: speed,\n        isFlick: isFlick\n      }));\n    }\n  }; // 抽象cancel事件\n\n\n  var cancel = function cancel(point, context) {\n    // 清除定时器\n    clearTimeout(context.timer); // 派发cancel事件\n\n    var e = new CustomEvent('canceled');\n    element.dispatchEvent(e);\n  };\n}\n\n//# sourceURL=webpack:///./lib/gesture.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_createElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/createElement.js */ \"./lib/createElement.js\");\n\nvar data = [{\n  title: '蓝猫',\n  url: 'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg'\n}, {\n  title: '橘猫加白',\n  url: 'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg'\n}, {\n  title: '狸花',\n  url: 'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg'\n}, {\n  title: '橘猫',\n  url: 'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg'\n}];\nvar component = Object(_lib_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"create\"])(\"div\", null, \"hello world!\"); // 挂载到父节点\n\ncomponent.mountTo(document.body);\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });