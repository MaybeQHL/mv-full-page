var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { defineComponent, reactive, ref, computed, watch, nextTick, onMounted, onBeforeUnmount, toRefs, openBlock, createElementBlock, normalizeStyle, createElementVNode, Fragment, renderList, normalizeClass, withDirectives, renderSlot, vShow, withModifiers, createCommentVNode } from "vue";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function isObject$3(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_1 = isObject$3;
var freeGlobal$1 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal$1;
var freeGlobal = _freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root$2 = freeGlobal || freeSelf || Function("return this")();
var _root = root$2;
var root$1 = _root;
var now$1 = function() {
  return root$1.Date.now();
};
var now_1 = now$1;
var reWhitespace = /\s/;
function trimmedEndIndex$1(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var _trimmedEndIndex = trimmedEndIndex$1;
var trimmedEndIndex = _trimmedEndIndex;
var reTrimStart = /^\s+/;
function baseTrim$1(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
var _baseTrim = baseTrim$1;
var root = _root;
var Symbol$3 = root.Symbol;
var _Symbol = Symbol$3;
var Symbol$2 = _Symbol;
var objectProto$1 = Object.prototype;
var hasOwnProperty = objectProto$1.hasOwnProperty;
var nativeObjectToString$1 = objectProto$1.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag$1(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var _getRawTag = getRawTag$1;
var objectProto = Object.prototype;
var nativeObjectToString = objectProto.toString;
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}
var _objectToString = objectToString$1;
var Symbol$1 = _Symbol, getRawTag = _getRawTag, objectToString = _objectToString;
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
function baseGetTag$1(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
var _baseGetTag = baseGetTag$1;
function isObjectLike$1(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_1 = isObjectLike$1;
var baseGetTag = _baseGetTag, isObjectLike = isObjectLike_1;
var symbolTag = "[object Symbol]";
function isSymbol$1(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
}
var isSymbol_1 = isSymbol$1;
var baseTrim = _baseTrim, isObject$2 = isObject_1, isSymbol = isSymbol_1;
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber$1(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$2(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject$2(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var toNumber_1 = toNumber$1;
var isObject$1 = isObject_1, now = now_1, toNumber = toNumber_1;
var FUNC_ERROR_TEXT$1 = "Expected a function";
var nativeMax = Math.max, nativeMin = Math.min;
function debounce$1(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber(wait) || 0;
  if (isObject$1(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now());
  }
  function debounced() {
    var time = now(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
var debounce_1 = debounce$1;
var debounce = debounce_1, isObject = isObject_1;
var FUNC_ERROR_TEXT = "Expected a function";
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    "leading": leading,
    "maxWait": wait,
    "trailing": trailing
  });
}
var throttle_1 = throttle;
const isMoile = () => {
  const userAgentInfo = navigator.userAgent;
  const Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  ];
  let flag = false;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = true;
      break;
    }
  }
  return flag;
};
const isFireFox = () => {
  return window.navigator.userAgent.toLowerCase().indexOf("firefox") != -1;
};
function addEvent(elem, type, fn) {
  if (elem.attachEvent) {
    elem.attachEvent("on" + type, fn);
    return;
  }
  if (elem.addEventListener) {
    elem.addEventListener(type, fn, false);
  }
}
function removeEvent(elem, type, fn) {
  if (elem.detachEvent) {
    debugger;
    elem.detachEvent("on" + type, fn);
    return;
  }
  if (elem.removeEventListener) {
    elem.removeEventListener(type, fn, false);
  }
}
function eventPath(evt) {
  const path = evt.composedPath && evt.composedPath() || evt.path, target = evt.target;
  if (path != null) {
    return path.indexOf(window) < 0 ? path.concat(window) : path;
  }
  if (target === window) {
    return [window];
  }
  function getParents(node, memo) {
    memo = memo || [];
    const parentNode = node.parentNode;
    if (!parentNode) {
      return memo;
    } else {
      return getParents(parentNode, memo.concat(parentNode));
    }
  }
  return [target].concat(getParents(target), window);
}
/*! iNoBounce - v0.2.0
* https://github.com/lazd/iNoBounce/
* Copyright (c) 2013 Larry Davis <lazdnet@gmail.com>; Licensed BSD */
var startY = 0;
var enabled = false;
var supportsPassiveOption = false;
try {
  var opts = Object.defineProperty({}, "passive", {
    get: function() {
      supportsPassiveOption = true;
    }
  });
  window.addEventListener("test", null, opts);
} catch (e) {
}
var handleTouchmove = function(evt) {
  var el = evt.target;
  var zoom = window.innerWidth / window.document.documentElement.clientWidth;
  if (evt.touches.length > 1 || zoom !== 1) {
    return;
  }
  while (el !== document.body && el !== document) {
    var style = window.getComputedStyle(el);
    if (!style) {
      break;
    }
    if (el.nodeName === "INPUT" && el.getAttribute("type") === "range") {
      return;
    }
    var scrolling = style.getPropertyValue("-webkit-overflow-scrolling");
    var overflowY = style.getPropertyValue("overflow-y");
    var height = parseInt(style.getPropertyValue("height"), 10);
    var isScrollable = scrolling === "touch" && (overflowY === "auto" || overflowY === "scroll");
    var canScroll = el.scrollHeight > el.offsetHeight;
    if (isScrollable && canScroll) {
      var curY = evt.touches ? evt.touches[0].screenY : evt.screenY;
      var isAtTop = startY <= curY && el.scrollTop === 0;
      var isAtBottom = startY >= curY && el.scrollHeight - el.scrollTop === height;
      if (isAtTop || isAtBottom) {
        evt.preventDefault();
      }
      return;
    }
    el = el.parentNode;
  }
  evt.preventDefault();
};
var handleTouchstart = function(evt) {
  startY = evt.touches ? evt.touches[0].screenY : evt.screenY;
};
var enable = function() {
  window.addEventListener("touchstart", handleTouchstart, supportsPassiveOption ? { passive: false } : false);
  window.addEventListener("touchmove", handleTouchmove, supportsPassiveOption ? { passive: false } : false);
  enabled = true;
};
var disable = function() {
  window.removeEventListener("touchstart", handleTouchstart, false);
  window.removeEventListener("touchmove", handleTouchmove, false);
  enabled = false;
};
var isEnabled = function() {
  return enabled;
};
var testDiv = document.createElement("div");
document.documentElement.appendChild(testDiv);
testDiv.style.WebkitOverflowScrolling = "touch";
var scrollSupport = "getComputedStyle" in window && window.getComputedStyle(testDiv)["-webkit-overflow-scrolling"] === "touch";
document.documentElement.removeChild(testDiv);
if (scrollSupport) {
  enable();
}
var iNoBounce = {
  enable,
  disable,
  isEnabled
};
var Component_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = defineComponent({
  name: "MvFullPage",
  components: {},
  props: {
    pages: {
      type: Number,
      default: 1
    },
    page: {
      type: Number,
      default: 1
    },
    config: {
      type: Object
    }
  },
  setup(props, { emit }) {
    const state = reactive({
      pagesArr: [],
      isPc: false,
      fullHeight: 0,
      fullWidth: 0,
      maxY: 0,
      maxX: 0,
      startY: 0,
      endY: 0,
      startX: 0,
      endX: 0,
      currentPage: 1,
      isRock: false,
      isUp: false,
      subScrollEl: null,
      wheelEventName: null,
      isInitTranslate: false,
      playInterval: null,
      isForward: true,
      isInitPage: false
    });
    const allPageRef = ref();
    const outContainerRef = ref();
    const config = computed(() => {
      const baseConfig = {
        position: "fixed",
        width: "100%",
        height: "100%",
        direction: "h",
        pointer: true,
        poiPosition: "right",
        cache: true,
        bgArr: [],
        transition: {
          duration: "1000ms",
          timingFun: "ease",
          delay: "0s"
        },
        autoPlay: false,
        loop: false,
        interval: 1e3,
        arrow: {
          last: false,
          next: false
        }
      };
      const reConfig = Object.assign(baseConfig, props.config);
      return reConfig;
    });
    const toPage = (type) => {
      if (type == "last") {
        emit("update:page", props.page - 1);
      }
      if (type == "next") {
        emit("update:page", props.page + 1);
      }
    };
    const pointerMouseover = (event, index) => {
      emit("pointerMouseover", {
        event,
        index
      });
    };
    const initAutoPlay = () => {
      state.playInterval = setInterval(() => {
        if (props.page < props.pages && state.isForward) {
          emit("update:page", props.page + 1);
        } else if (config.value.loop) {
          if (props.page > 1) {
            state.isForward = false;
            emit("update:page", props.page - 1);
          } else {
            state.isForward = true;
            emit("update:page", props.page + 1);
          }
        } else {
          stopAutoPlay();
        }
      }, config.value.interval || 1e3);
    };
    const stopAutoPlay = () => {
      clearInterval(state.playInterval);
      state.playInterval = null;
      state.isForward = true;
    };
    const startRoll = (offset) => {
      let transformBind = `translate${config.value.direction == "v" ? "Y" : "X"}(${offset}px)`;
      allPageRef.value.style.transform = transformBind;
    };
    const resizeWin = throttle_1(() => {
      initPageWH();
    }, 500);
    const pointerClick = (index) => {
      if (state.isRock)
        return;
      emit("update:page", index);
    };
    const initPageWH = () => {
      state.fullHeight = outContainerRef.value.clientHeight;
      state.fullWidth = outContainerRef.value.clientWidth;
      state.maxY = props.pages * state.fullHeight;
      state.maxX = props.pages * state.fullWidth;
      allPageRef.value.style.height = state.fullHeight * props.pages + "px";
      allPageRef.value.style.width = state.fullWidth * props.pages + "px";
    };
    const initPageListener = () => {
      if (!state.isPc) {
        allPageRef.value.addEventListener("touchstart", pageStart, false);
        allPageRef.value.addEventListener("touchmove", pageMove, false);
        allPageRef.value.addEventListener("touchend", pageEnd, false);
      } else {
        state.wheelEventName = isFireFox() ? "DOMMouseScroll" : "mousewheel";
        addEvent(allPageRef.value, state.wheelEventName, pcRoll);
      }
    };
    const removePageListener = () => {
      if (!state.isPc) {
        iNoBounce.disable();
        allPageRef.value.removeEventListener("touchstart", pageStart);
        allPageRef.value.removeEventListener("touchmove", pageMove);
        allPageRef.value.removeEventListener("touchend", pageEnd);
      } else {
        removeEvent(allPageRef.value, state.wheelEventName, pcRoll);
      }
    };
    const pcRoll = (e) => {
      if (state.isRock)
        return;
      let path = eventPath(e);
      let isSubScroll = Array.from(path).some((el) => {
        if (el.dataset && el.dataset.scroll == "true") {
          return true;
        }
        return false;
      });
      if (isSubScroll) {
        return;
      }
      if (e.deltaY > 0 || e.detail > 0 || e.wheelDelta < 0) {
        switchPage(true);
      } else {
        switchPage(false);
      }
    };
    const pageStart = (e) => {
      console.log(e);
      let path = eventPath(e);
      path.forEach((el) => {
        if (el.dataset && el.dataset.scroll == "true") {
          state.subScrollEl = el;
        }
      });
      if (state.subScrollEl) {
        iNoBounce.disable();
      } else {
        iNoBounce.enable();
      }
      state.startY = e.changedTouches[0].pageY;
      state.startX = e.changedTouches[0].pageX;
    };
    const pageMove = (e) => {
      if (state.subScrollEl && state.subScrollEl.scrollTop == 0 && e.changedTouches[0].pageY - state.startY > 0) {
        iNoBounce.enable();
      }
    };
    const pageEnd = (e) => {
      if (state.isRock || config.value.autoPlay)
        return;
      if (state.subScrollEl) {
        state.subScrollEl = null;
        iNoBounce.enable();
        return;
      }
      if (config.value.direction == "v") {
        if (e.changedTouches[0].pageY - state.startY < -50) {
          state.startY = 0;
          switchPage(true);
        } else if (e.changedTouches[0].pageY - state.startY > 50) {
          state.startY = 0;
          switchPage(false);
        }
      } else {
        if (e.changedTouches[0].pageX - state.startX < -50) {
          state.startX = 0;
          switchPage(true);
        } else if (e.changedTouches[0].pageX - state.startX > 50) {
          state.startX = 0;
          switchPage(false);
        }
      }
    };
    const rollPage = (page, isStatic) => {
      if (allPageRef.value && state.fullHeight > 0 && state.fullWidth > 0) {
        let offset = -((page - 1) * (config.value.direction == "v" ? state.fullHeight : state.fullWidth));
        if (isStatic) {
          allPageRef.value.style.transitionProperty = "none";
        }
        let transformBind = `translate${config.value.direction == "v" ? "Y" : "X"}(${offset}px)`;
        allPageRef.value.style.transform = transformBind;
        if (isStatic) {
          setTimeout(() => {
            allPageRef.value.style.transitionProperty = "transform";
          }, 1);
        } else {
          state.isRock = true;
          const eventFn = () => {
            state.isRock = false;
            emit("rollEnd", props.page);
            allPageRef.value.removeEventListener("transitionend", eventFn);
          };
          allPageRef.value.addEventListener("transitionend", eventFn);
        }
      }
    };
    const switchPage = (forward = true) => {
      if (allPageRef.value) {
        if (forward && props.page < props.pages) {
          emit("update:page", props.page + 1);
        } else if (!forward && props.page > 1) {
          emit("update:page", props.page - 1);
        }
      }
    };
    const init = () => {
      state.isPc = !isMoile();
      if (!state.isPc) {
        console.log("\u5F53\u524Dmv-full-page\u8FD0\u884C\u73AF\u5883\u4E3A: \u79FB\u52A8\u7AEF");
        iNoBounce.enable();
      } else {
        console.log("\u5F53\u524Dmv-full-page\u8FD0\u884C\u73AF\u5883\u4E3A: PC\u7AEF");
      }
      initPageWH();
      initPageListener();
      window.addEventListener("resize", resizeWin);
    };
    watch(() => props.page, (val) => {
      if (state.isInitTranslate) {
        startRoll(0);
        state.isInitTranslate = false;
        setTimeout(() => {
          allPageRef.value.classList.remove("transition-clear");
        }, 1);
        return;
      }
      nextTick(() => {
        state.pagesArr[props.page - 1].isShow = true;
        if (!state.isInitPage) {
          state.isInitPage = true;
          rollPage(val, true);
          return;
        }
        rollPage(val);
      });
    }, {
      immediate: true
    });
    watch(() => props.pages, (val) => {
      if (!props.pages || props.pages <= 0) {
        return;
      }
      state.pagesArr.length = 0;
      for (let index = 0; index < props.pages; index++) {
        state.pagesArr.push({
          page: index + 1,
          isShow: index == 0 ? true : false
        });
      }
      state.pagesArr[0].isShow = true;
      if (props.page > 1 && state.isInitPage) {
        allPageRef.value && allPageRef.value.classList.add("transition-clear");
        state.isInitTranslate = true;
      }
      if (!state.isInitPage) {
        emit("update:page", props.page);
        return;
      }
      emit("update:page", 1);
    }, {
      immediate: true
    });
    watch(() => config.value.autoPlay, (val) => {
      if (val) {
        nextTick(() => {
          initAutoPlay();
        });
      } else {
        stopAutoPlay();
      }
    }, {
      immediate: true
    });
    onMounted(() => {
      init();
    });
    onBeforeUnmount(() => {
      removePageListener();
      window.removeEventListener("resize", resizeWin);
      stopAutoPlay();
      console.log("\u9500\u6BC1\u9875\u9762\u4E8B\u4EF6\u6210\u529F");
    });
    return __spreadProps(__spreadValues({}, toRefs(state)), {
      config,
      allPageRef,
      outContainerRef,
      pointerClick,
      pointerMouseover,
      toPage
    });
  }
});
const _hoisted_1 = {
  key: 0,
  class: "page-box"
};
const _hoisted_2 = {
  key: 1,
  class: "page-box"
};
const _hoisted_3 = ["onClick", "onMouseover"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "mv-page-container",
    style: normalizeStyle({
      position: _ctx.config.position,
      height: _ctx.config.height,
      width: _ctx.config.width
    }),
    ref: "outContainerRef"
  }, [
    createElementVNode("div", {
      class: "mv-all-page",
      ref: "allPageRef",
      style: normalizeStyle({
        "transition-duration": _ctx.config.transition.duration,
        "transition-timing-function": _ctx.config.transition.timingFun,
        "transition-delay": _ctx.config.transition.delay
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.pagesArr, (item, index) => {
        return openBlock(), createElementBlock("div", {
          key: index,
          class: normalizeClass(["page", { floatLeft: !(_ctx.config.direction == "v") }]),
          style: normalizeStyle({
            height: _ctx.fullHeight + "px",
            width: _ctx.fullWidth + "px",
            "background-color": _ctx.config.bgArr[index] && _ctx.config.bgArr[index].color,
            "background-image": _ctx.config.bgArr[index].image && `url(${_ctx.config.bgArr[index].image})`
          }),
          ref_for: true,
          ref: `page${item.page}`
        }, [
          _ctx.config.cache ? withDirectives((openBlock(), createElementBlock("div", _hoisted_1, [
            renderSlot(_ctx.$slots, `page${item.page}`, { data: item }, void 0, true)
          ], 512)), [
            [vShow, item.isShow]
          ]) : withDirectives((openBlock(), createElementBlock("div", _hoisted_2, [
            renderSlot(_ctx.$slots, `page${item.page}`, { data: item }, void 0, true)
          ], 512)), [
            [vShow, _ctx.page == item.page]
          ])
        ], 6);
      }), 128))
    ], 4),
    _ctx.config.pointer ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["mv-pointer-wrapper", _ctx.config.poiPosition])
    }, [
      createElementVNode("ul", {
        class: normalizeClass(_ctx.isPc && "hover")
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.pages, (index) => {
          return openBlock(), createElementBlock("li", {
            class: normalizeClass({ active: _ctx.page == index }),
            onClick: withModifiers(($event) => _ctx.pointerClick(index), ["stop"]),
            key: index,
            onMouseover: ($event) => _ctx.pointerMouseover($event, index)
          }, null, 42, _hoisted_3);
        }), 128))
      ], 2)
    ], 2)) : createCommentVNode("v-if", true),
    _ctx.config.arrow.last && _ctx.page > 1 ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: "last-arrow iconfont icon-jiantoushang",
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.toPage("last"))
    })) : createCommentVNode("v-if", true),
    _ctx.config.arrow.next && _ctx.page < _ctx.pages ? (openBlock(), createElementBlock("div", {
      key: 2,
      class: "next-arrow iconfont icon-jiantouxia",
      onClick: _cache[1] || (_cache[1] = ($event) => _ctx.toPage("next"))
    })) : createCommentVNode("v-if", true)
  ], 4);
}
var MyComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5e88b1b5"]]);
MyComponent.install = (app, options) => {
  app.component(MyComponent.name, MyComponent);
};
export { MyComponent as default };
