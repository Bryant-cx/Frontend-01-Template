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
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction create(Cls, attributes) {\n  var o; // 遇到以小写字母作为标签的组件\n\n  if (typeof Cls === 'string') {\n    o = new Wrapper(Cls);\n  } else {\n    o = new Cls({\n      timer: {}\n    });\n  }\n\n  for (var name in attributes) {\n    o.setAttribute(name, attributes[name]);\n  }\n\n  var visit = function visit(children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n\n        // 如果children是数组，需要递归遍历\n        if (_typeof(child) === 'object' && child instanceof Array) {\n          visit(child);\n          continue;\n        }\n\n        if (typeof child === 'string') {\n          child = new Text(child);\n        }\n\n        o.children.push(child);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  visit(children);\n  return o;\n}\n\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(Text, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return Text;\n}();\n\nvar Wrapper = /*#__PURE__*/function () {\n  function Wrapper(type) {\n    _classCallCheck(this, Wrapper);\n\n    this.root = document.createElement(type);\n    this.children = [];\n  } // 设置attr\n\n\n  _createClass(Wrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      this.root.setAttribute(name, value);\n    } // 处理子节点\n\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n    } // 绑定事件\n\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, handler, config) {\n      var _this$root;\n\n      (_this$root = this.root).addEventListener.apply(_this$root, arguments);\n    } // 获取属性\n\n  }, {\n    key: \"mountTo\",\n    // 挂载到父节点\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }, {\n    key: \"style\",\n    get: function get() {\n      return this.root.style;\n    }\n  }]);\n\n  return Wrapper;\n}();\n\nvar Carousel = /*#__PURE__*/function () {\n  function Carousel(config) {\n    _classCallCheck(this, Carousel);\n\n    this.children = [];\n    this.root = document.createElement('div');\n  } // 设置attr\n\n\n  _createClass(Carousel, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      this[name] = value;\n    } // 处理子节点\n\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this = this;\n\n      var children = this.data.map(function (url) {\n        var element = create(\"img\", {\n          src: url\n        });\n        element.addEventListener('dragstart', function (event) {\n          return event.preventDefault();\n        });\n        return element;\n      });\n      var root = create(\"div\", {\n        \"class\": \"carousel\"\n      }, children); // 指针，当前展示的图片的索引\n\n      var position = 0; // 下一张要展示的图片\n\n      var nextPic = function nextPic() {\n        // 指针，下一张要展示的图片的索引\n        var nextPosition = (position + 1) % _this.data.length; // 当前展示的图片\n\n        var current = children[position]; // 下一张要展示的图片\n\n        var next = children[nextPosition]; // 首先关闭动画，防止页面闪动\n\n        next.style.transition = 'ease 0s'; // 将下一张图片放到视框左侧，不用处理当前图片，因为当前图片已经处于视框中\n\n        next.style.transform = \"translateX(\".concat(100 - 100 * nextPosition, \"%)\"); // 一帧之后，将当前图片移出视框，堆放到视框左侧，将下一张图放入视框\n\n        setTimeout(function () {\n          // 首先把动画打开，增加流畅度\n          next.style.transition = ''; // 将当前图片移出视框，堆放在视框左侧\n\n          current.style.transform = \"translateX(\".concat(-100 - 100 * position, \"%)\"); // 将下一张图片移入视框，完成切换\n\n          next.style.transform = \"translateX(\".concat(-100 * nextPosition, \"%)\"); // 指针指向下一张图片\n\n          position = nextPosition;\n        }, 16);\n        setTimeout(function () {\n          nextPic();\n        }, 1000);\n      }; // setTimeout(() => {\n      //   nextPic()\n      // }, 1000);\n      // 监听根节点的拖拽事件\n\n\n      root.addEventListener('mousedown', function (event) {\n        // 记录鼠标按下的位置\n        var startX = event.clientX; // 指针，下一张将要展示的图片的索引\n\n        var nextPosition = (position + 1) % _this.data.length; // 指针，上一张展示的图片的索引\n\n        var prePosition = (position - 1 + _this.data.length) % _this.data.length; // 当前视框中展示的图片\n\n        var current = children[position]; // 下一张要展示的图片\n\n        var next = children[nextPosition]; // 上一张展示的图片\n\n        var pre = children[prePosition]; // 关闭动画，然后将图片放到初始位置\n\n        current.style.transition = 'ease 0s';\n        next.style.transition = 'ease 0s';\n        pre.style.transition = 'ease 0s'; // 将当前图片放到视框中\n\n        current.style.transform = \"translateX(\".concat(-100 * position, \"%)\"); // 将下一张要展示的图片放到视框右侧\n\n        next.style.transform = \"translateX(\".concat(100 - 100 * nextPosition, \"%)\"); // 将上一张展示的图片放到视框左侧\n\n        pre.style.transform = \"translateX(\".concat(-100 - 100 * prePosition, \"%)\"); // 监听鼠标移动事件，将图片切换到拖动后的位置\n\n        var move = function move(event) {\n          // 拖动的距离\n          var distance = event.clientX - startX; // 限定一下distance，防止出现白屏\n\n          if (distance > 500) {\n            distance = 500;\n          }\n\n          if (distance < -500) {\n            distance = -500;\n          } // 打开动画\n\n\n          current.style.transition = '';\n          next.style.transition = '';\n          pre.style.transition = ''; // 将当前图片放到拖动后的位置\n\n          current.style.transform = \"translateX(\".concat(distance - 500 * position, \"px)\"); // 将下一张图片放到拖放后的位置\n\n          next.style.transform = \"translateX(\".concat(distance + 500 - 500 * nextPosition, \"px)\"); // 将上一张图片放到拖放后的位置\n\n          pre.style.transform = \"translateX(\".concat(distance - 500 - 500 * prePosition, \"px)\");\n        }; // 监听鼠标的up事件\n\n\n        var up = function up(event) {\n          // 拖动方向：1，向右；-1，向左；0， 不动\n          var offset = 0; // 拖动的距离\n\n          var distance = event.clientX - startX; // 向右\n\n          if (distance >= 250) {\n            offset = 1;\n          } else if (distance <= -250) {\n            // 向左\n            offset = -1;\n          } // 将三张图片一次放到拖动后的位置完成切换\n          // 将当前图片放到拖动后的位置\n\n\n          current.style.transform = \"translateX(\".concat(offset * 100 - 100 * position, \"%)\"); // 将下一张要展示的图片放到拖放后的位置\n\n          next.style.transform = \"translateX(\".concat(offset * 100 + 100 - 100 * nextPosition, \"%)\"); // 将前一张展示过的图片放到拖放后的位置\n\n          pre.style.transform = \"translateX(\".concat(offset * 100 - 100 - 100 * prePosition, \"%)\"); // 对指针进行更新\n          // 轮播图左向滚动时position递增，右向拖放的时候offset为正，所以两者应该相减\n\n          position = (position - offset + _this.data.length) % _this.data.length;\n          document.removeEventListener('mousemove', move);\n          document.removeEventListener('mouseup', up);\n        }; // 监听系统的拖拽事件和up事件\n\n\n        document.addEventListener('mousemove', move);\n        document.addEventListener('mouseup', up);\n      });\n      return root;\n    } // 挂载到父节点\n\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      this.render().mountTo(parent);\n    }\n  }]);\n\n  return Carousel;\n}(); // class Child {\n//   constructor (config) {\n//     this.children = []\n//     this.root = document.createElement('div')\n//   }\n//   setAttribute (name, value) {\n//     this.root.setAttribute(name, value)\n//   }\n//   appendChild (child) {\n//     this.children.push(child)\n//   }\n//   mountTo (parent) {\n//     parent.appendChild(this.root)\n//     for (let child of this.children) {\n//       child.mountTo(this.root)\n//     }\n//   }\n// }\n\n\nvar data = ['https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg', 'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg', 'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg', 'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg'];\nvar component = create(Carousel, {\n  data: data\n}); // 挂载到父节点\n\ncomponent.mountTo(document.body); // component.setAttribute('id', 'b')\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ });