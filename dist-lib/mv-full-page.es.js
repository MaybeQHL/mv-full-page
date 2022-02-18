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
import { defineComponent, reactive, ref, computed, watch, nextTick, onMounted, onBeforeUnmount, openBlock, createElementBlock, normalizeStyle, unref, createElementVNode, Fragment, renderList, normalizeClass, createCommentVNode, renderSlot, withDirectives, vShow, withModifiers } from "vue";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function isObject$a(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_1 = isObject$a;
var freeGlobal$1 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal$1;
var freeGlobal = _freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root$5 = freeGlobal || freeSelf || Function("return this")();
var _root = root$5;
var root$4 = _root;
var now$1 = function() {
  return root$4.Date.now();
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
var root$3 = _root;
var Symbol$3 = root$3.Symbol;
var _Symbol = Symbol$3;
var Symbol$2 = _Symbol;
var objectProto$a = Object.prototype;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
var nativeObjectToString$1 = objectProto$a.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$8.call(value, symToStringTag$1), tag = value[symToStringTag$1];
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
var objectProto$9 = Object.prototype;
var nativeObjectToString = objectProto$9.toString;
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}
var _objectToString = objectToString$1;
var Symbol$1 = _Symbol, getRawTag = _getRawTag, objectToString = _objectToString;
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
function baseGetTag$5(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
var _baseGetTag = baseGetTag$5;
function isObjectLike$6(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_1 = isObjectLike$6;
var baseGetTag$4 = _baseGetTag, isObjectLike$5 = isObjectLike_1;
var symbolTag = "[object Symbol]";
function isSymbol$1(value) {
  return typeof value == "symbol" || isObjectLike$5(value) && baseGetTag$4(value) == symbolTag;
}
var isSymbol_1 = isSymbol$1;
var baseTrim = _baseTrim, isObject$9 = isObject_1, isSymbol = isSymbol_1;
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
  if (isObject$9(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject$9(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var toNumber_1 = toNumber$1;
var isObject$8 = isObject_1, now = now_1, toNumber = toNumber_1;
var FUNC_ERROR_TEXT$1 = "Expected a function";
var nativeMax$1 = Math.max, nativeMin = Math.min;
function debounce$1(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber(wait) || 0;
  if (isObject$8(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax$1(toNumber(options.maxWait) || 0, wait) : maxWait;
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
var debounce = debounce_1, isObject$7 = isObject_1;
var FUNC_ERROR_TEXT = "Expected a function";
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject$7(options)) {
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
function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}
var _listCacheClear = listCacheClear$1;
function eq$4(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_1 = eq$4;
var eq$3 = eq_1;
function assocIndexOf$4(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$3(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var _assocIndexOf = assocIndexOf$4;
var assocIndexOf$3 = _assocIndexOf;
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete$1(key) {
  var data = this.__data__, index = assocIndexOf$3(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var _listCacheDelete = listCacheDelete$1;
var assocIndexOf$2 = _assocIndexOf;
function listCacheGet$1(key) {
  var data = this.__data__, index = assocIndexOf$2(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var _listCacheGet = listCacheGet$1;
var assocIndexOf$1 = _assocIndexOf;
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}
var _listCacheHas = listCacheHas$1;
var assocIndexOf = _assocIndexOf;
function listCacheSet$1(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var _listCacheSet = listCacheSet$1;
var listCacheClear = _listCacheClear, listCacheDelete = _listCacheDelete, listCacheGet = _listCacheGet, listCacheHas = _listCacheHas, listCacheSet = _listCacheSet;
function ListCache$4(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache$4.prototype.clear = listCacheClear;
ListCache$4.prototype["delete"] = listCacheDelete;
ListCache$4.prototype.get = listCacheGet;
ListCache$4.prototype.has = listCacheHas;
ListCache$4.prototype.set = listCacheSet;
var _ListCache = ListCache$4;
var ListCache$3 = _ListCache;
function stackClear$1() {
  this.__data__ = new ListCache$3();
  this.size = 0;
}
var _stackClear = stackClear$1;
function stackDelete$1(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var _stackDelete = stackDelete$1;
function stackGet$1(key) {
  return this.__data__.get(key);
}
var _stackGet = stackGet$1;
function stackHas$1(key) {
  return this.__data__.has(key);
}
var _stackHas = stackHas$1;
var baseGetTag$3 = _baseGetTag, isObject$6 = isObject_1;
var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction$3(value) {
  if (!isObject$6(value)) {
    return false;
  }
  var tag = baseGetTag$3(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_1 = isFunction$3;
var root$2 = _root;
var coreJsData$1 = root$2["__core-js_shared__"];
var _coreJsData = coreJsData$1;
var coreJsData = _coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked$1(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var _isMasked = isMasked$1;
var funcProto$2 = Function.prototype;
var funcToString$2 = funcProto$2.toString;
function toSource$1(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var _toSource = toSource$1;
var isFunction$2 = isFunction_1, isMasked = _isMasked, isObject$5 = isObject_1, toSource = _toSource;
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype, objectProto$8 = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
var reIsNative = RegExp("^" + funcToString$1.call(hasOwnProperty$7).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function baseIsNative$1(value) {
  if (!isObject$5(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$2(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
var _baseIsNative = baseIsNative$1;
function getValue$1(object, key) {
  return object == null ? void 0 : object[key];
}
var _getValue = getValue$1;
var baseIsNative = _baseIsNative, getValue = _getValue;
function getNative$3(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var _getNative = getNative$3;
var getNative$2 = _getNative, root$1 = _root;
var Map$2 = getNative$2(root$1, "Map");
var _Map = Map$2;
var getNative$1 = _getNative;
var nativeCreate$4 = getNative$1(Object, "create");
var _nativeCreate = nativeCreate$4;
var nativeCreate$3 = _nativeCreate;
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}
var _hashClear = hashClear$1;
function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var _hashDelete = hashDelete$1;
var nativeCreate$2 = _nativeCreate;
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$7 = Object.prototype;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$6.call(data, key) ? data[key] : void 0;
}
var _hashGet = hashGet$1;
var nativeCreate$1 = _nativeCreate;
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$5.call(data, key);
}
var _hashHas = hashHas$1;
var nativeCreate = _nativeCreate;
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
var _hashSet = hashSet$1;
var hashClear = _hashClear, hashDelete = _hashDelete, hashGet = _hashGet, hashHas = _hashHas, hashSet = _hashSet;
function Hash$1(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash$1.prototype.clear = hashClear;
Hash$1.prototype["delete"] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;
var _Hash = Hash$1;
var Hash = _Hash, ListCache$2 = _ListCache, Map$1 = _Map;
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$1 || ListCache$2)(),
    "string": new Hash()
  };
}
var _mapCacheClear = mapCacheClear$1;
function isKeyable$1(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var _isKeyable = isKeyable$1;
var isKeyable = _isKeyable;
function getMapData$4(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var _getMapData = getMapData$4;
var getMapData$3 = _getMapData;
function mapCacheDelete$1(key) {
  var result = getMapData$3(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var _mapCacheDelete = mapCacheDelete$1;
var getMapData$2 = _getMapData;
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}
var _mapCacheGet = mapCacheGet$1;
var getMapData$1 = _getMapData;
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}
var _mapCacheHas = mapCacheHas$1;
var getMapData = _getMapData;
function mapCacheSet$1(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var _mapCacheSet = mapCacheSet$1;
var mapCacheClear = _mapCacheClear, mapCacheDelete = _mapCacheDelete, mapCacheGet = _mapCacheGet, mapCacheHas = _mapCacheHas, mapCacheSet = _mapCacheSet;
function MapCache$1(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache$1.prototype.clear = mapCacheClear;
MapCache$1.prototype["delete"] = mapCacheDelete;
MapCache$1.prototype.get = mapCacheGet;
MapCache$1.prototype.has = mapCacheHas;
MapCache$1.prototype.set = mapCacheSet;
var _MapCache = MapCache$1;
var ListCache$1 = _ListCache, Map = _Map, MapCache = _MapCache;
var LARGE_ARRAY_SIZE = 200;
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$1) {
    var pairs = data.__data__;
    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var _stackSet = stackSet$1;
var ListCache = _ListCache, stackClear = _stackClear, stackDelete = _stackDelete, stackGet = _stackGet, stackHas = _stackHas, stackSet = _stackSet;
function Stack$1(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack$1.prototype.clear = stackClear;
Stack$1.prototype["delete"] = stackDelete;
Stack$1.prototype.get = stackGet;
Stack$1.prototype.has = stackHas;
Stack$1.prototype.set = stackSet;
var _Stack = Stack$1;
var getNative = _getNative;
var defineProperty$2 = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
var _defineProperty = defineProperty$2;
var defineProperty$1 = _defineProperty;
function baseAssignValue$3(object, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var _baseAssignValue = baseAssignValue$3;
var baseAssignValue$2 = _baseAssignValue, eq$2 = eq_1;
function assignMergeValue$2(object, key, value) {
  if (value !== void 0 && !eq$2(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue$2(object, key, value);
  }
}
var _assignMergeValue = assignMergeValue$2;
function createBaseFor$1(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var _createBaseFor = createBaseFor$1;
var createBaseFor = _createBaseFor;
var baseFor$1 = createBaseFor();
var _baseFor = baseFor$1;
var _cloneBuffer = { exports: {} };
(function(module, exports) {
  var root2 = _root;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root2.Buffer : void 0, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
  function cloneBuffer2(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  module.exports = cloneBuffer2;
})(_cloneBuffer, _cloneBuffer.exports);
var root = _root;
var Uint8Array$1 = root.Uint8Array;
var _Uint8Array = Uint8Array$1;
var Uint8Array2 = _Uint8Array;
function cloneArrayBuffer$1(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
  return result;
}
var _cloneArrayBuffer = cloneArrayBuffer$1;
var cloneArrayBuffer = _cloneArrayBuffer;
function cloneTypedArray$1(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var _cloneTypedArray = cloneTypedArray$1;
function copyArray$1(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var _copyArray = copyArray$1;
var isObject$4 = isObject_1;
var objectCreate = Object.create;
var baseCreate$1 = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject$4(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
var _baseCreate = baseCreate$1;
function overArg$1(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var _overArg = overArg$1;
var overArg = _overArg;
var getPrototype$2 = overArg(Object.getPrototypeOf, Object);
var _getPrototype = getPrototype$2;
var objectProto$5 = Object.prototype;
function isPrototype$2(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$5;
  return value === proto;
}
var _isPrototype = isPrototype$2;
var baseCreate = _baseCreate, getPrototype$1 = _getPrototype, isPrototype$1 = _isPrototype;
function initCloneObject$1(object) {
  return typeof object.constructor == "function" && !isPrototype$1(object) ? baseCreate(getPrototype$1(object)) : {};
}
var _initCloneObject = initCloneObject$1;
var baseGetTag$2 = _baseGetTag, isObjectLike$4 = isObjectLike_1;
var argsTag$1 = "[object Arguments]";
function baseIsArguments$1(value) {
  return isObjectLike$4(value) && baseGetTag$2(value) == argsTag$1;
}
var _baseIsArguments = baseIsArguments$1;
var baseIsArguments = _baseIsArguments, isObjectLike$3 = isObjectLike_1;
var objectProto$4 = Object.prototype;
var hasOwnProperty$4 = objectProto$4.hasOwnProperty;
var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;
var isArguments$2 = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike$3(value) && hasOwnProperty$4.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
var isArguments_1 = isArguments$2;
var isArray$2 = Array.isArray;
var isArray_1 = isArray$2;
var MAX_SAFE_INTEGER$1 = 9007199254740991;
function isLength$2(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}
var isLength_1 = isLength$2;
var isFunction$1 = isFunction_1, isLength$1 = isLength_1;
function isArrayLike$3(value) {
  return value != null && isLength$1(value.length) && !isFunction$1(value);
}
var isArrayLike_1 = isArrayLike$3;
var isArrayLike$2 = isArrayLike_1, isObjectLike$2 = isObjectLike_1;
function isArrayLikeObject$1(value) {
  return isObjectLike$2(value) && isArrayLike$2(value);
}
var isArrayLikeObject_1 = isArrayLikeObject$1;
var isBuffer$2 = { exports: {} };
function stubFalse() {
  return false;
}
var stubFalse_1 = stubFalse;
(function(module, exports) {
  var root2 = _root, stubFalse2 = stubFalse_1;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root2.Buffer : void 0;
  var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
  var isBuffer2 = nativeIsBuffer || stubFalse2;
  module.exports = isBuffer2;
})(isBuffer$2, isBuffer$2.exports);
var baseGetTag$1 = _baseGetTag, getPrototype = _getPrototype, isObjectLike$1 = isObjectLike_1;
var objectTag$1 = "[object Object]";
var funcProto = Function.prototype, objectProto$3 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject$1(value) {
  if (!isObjectLike$1(value) || baseGetTag$1(value) != objectTag$1) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$3.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
var isPlainObject_1 = isPlainObject$1;
var baseGetTag = _baseGetTag, isLength = isLength_1, isObjectLike = isObjectLike_1;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray$1(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
var _baseIsTypedArray = baseIsTypedArray$1;
function baseUnary$1(func) {
  return function(value) {
    return func(value);
  };
}
var _baseUnary = baseUnary$1;
var _nodeUtil = { exports: {} };
(function(module, exports) {
  var freeGlobal2 = _freeGlobal;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && freeGlobal2.process;
  var nodeUtil2 = function() {
    try {
      var types = freeModule && freeModule.require && freeModule.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  }();
  module.exports = nodeUtil2;
})(_nodeUtil, _nodeUtil.exports);
var baseIsTypedArray = _baseIsTypedArray, baseUnary = _baseUnary, nodeUtil = _nodeUtil.exports;
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
var isTypedArray$2 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
var isTypedArray_1 = isTypedArray$2;
function safeGet$2(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
var _safeGet = safeGet$2;
var baseAssignValue$1 = _baseAssignValue, eq$1 = eq_1;
var objectProto$2 = Object.prototype;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
function assignValue$1(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$2.call(object, key) && eq$1(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue$1(object, key, value);
  }
}
var _assignValue = assignValue$1;
var assignValue = _assignValue, baseAssignValue = _baseAssignValue;
function copyObject$1(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}
var _copyObject = copyObject$1;
function baseTimes$1(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var _baseTimes = baseTimes$1;
var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex$2(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var _isIndex = isIndex$2;
var baseTimes = _baseTimes, isArguments$1 = isArguments_1, isArray$1 = isArray_1, isBuffer$1 = isBuffer$2.exports, isIndex$1 = _isIndex, isTypedArray$1 = isTypedArray_1;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function arrayLikeKeys$1(value, inherited) {
  var isArr = isArray$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$1.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex$1(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var _arrayLikeKeys = arrayLikeKeys$1;
function nativeKeysIn$1(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var _nativeKeysIn = nativeKeysIn$1;
var isObject$3 = isObject_1, isPrototype = _isPrototype, nativeKeysIn = _nativeKeysIn;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseKeysIn$1(object) {
  if (!isObject$3(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
var _baseKeysIn = baseKeysIn$1;
var arrayLikeKeys = _arrayLikeKeys, baseKeysIn = _baseKeysIn, isArrayLike$1 = isArrayLike_1;
function keysIn$2(object) {
  return isArrayLike$1(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var keysIn_1 = keysIn$2;
var copyObject = _copyObject, keysIn$1 = keysIn_1;
function toPlainObject$1(value) {
  return copyObject(value, keysIn$1(value));
}
var toPlainObject_1 = toPlainObject$1;
var assignMergeValue$1 = _assignMergeValue, cloneBuffer = _cloneBuffer.exports, cloneTypedArray = _cloneTypedArray, copyArray = _copyArray, initCloneObject = _initCloneObject, isArguments = isArguments_1, isArray = isArray_1, isArrayLikeObject = isArrayLikeObject_1, isBuffer = isBuffer$2.exports, isFunction = isFunction_1, isObject$2 = isObject_1, isPlainObject = isPlainObject_1, isTypedArray = isTypedArray_1, safeGet$1 = _safeGet, toPlainObject = toPlainObject_1;
function baseMergeDeep$1(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet$1(object, key), srcValue = safeGet$1(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue$1(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject$2(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue$1(object, key, newValue);
}
var _baseMergeDeep = baseMergeDeep$1;
var Stack = _Stack, assignMergeValue = _assignMergeValue, baseFor = _baseFor, baseMergeDeep = _baseMergeDeep, isObject$1 = isObject_1, keysIn = keysIn_1, safeGet = _safeGet;
function baseMerge$1(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack());
    if (isObject$1(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge$1, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}
var _baseMerge = baseMerge$1;
function identity$2(value) {
  return value;
}
var identity_1 = identity$2;
function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var _apply = apply$1;
var apply = _apply;
var nativeMax = Math.max;
function overRest$1(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
var _overRest = overRest$1;
function constant$1(value) {
  return function() {
    return value;
  };
}
var constant_1 = constant$1;
var constant = constant_1, defineProperty = _defineProperty, identity$1 = identity_1;
var baseSetToString$1 = !defineProperty ? identity$1 : function(func, string) {
  return defineProperty(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
var _baseSetToString = baseSetToString$1;
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut$1(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
var _shortOut = shortOut$1;
var baseSetToString = _baseSetToString, shortOut = _shortOut;
var setToString$1 = shortOut(baseSetToString);
var _setToString = setToString$1;
var identity = identity_1, overRest = _overRest, setToString = _setToString;
function baseRest$1(func, start) {
  return setToString(overRest(func, start, identity), func + "");
}
var _baseRest = baseRest$1;
var eq = eq_1, isArrayLike = isArrayLike_1, isIndex = _isIndex, isObject = isObject_1;
function isIterateeCall$1(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
    return eq(object[index], value);
  }
  return false;
}
var _isIterateeCall = isIterateeCall$1;
var baseRest = _baseRest, isIterateeCall = _isIterateeCall;
function createAssigner$1(assigner) {
  return baseRest(function(object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
var _createAssigner = createAssigner$1;
var baseMerge = _baseMerge, createAssigner = _createAssigner;
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});
var merge_1 = merge;
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
const _hoisted_1 = ["data-num"];
const _hoisted_2 = ["src", "onLoad"];
const _hoisted_3 = {
  key: 1,
  class: "page-box"
};
const _hoisted_4 = {
  key: 2,
  class: "page-box"
};
const _hoisted_5 = ["onClick", "onMouseover"];
const __default__ = {
  name: "MvFullPage"
};
const _sfc_main = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__), {
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
  emits: ["pointerMouseover", "update:page", "rollEnd"],
  setup(__props, { expose, emit }) {
    const props = __props;
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
      isInitPage: false,
      autoPlayFinished: false
    });
    const allPageRef = ref();
    const outContainerRef = ref();
    const config = computed(() => {
      const baseConfig = {
        position: "fixed",
        width: "100%",
        height: "100%",
        direction: "v",
        poi: {
          pointer: true,
          position: "right"
        },
        cache: true,
        bgArr: [],
        bgConfig: {
          fit: "cover"
        },
        transition: {
          duration: "1000ms",
          timingFun: "ease",
          delay: "0s"
        },
        loop: false,
        arrow: {
          last: false,
          next: false
        },
        autoPlay: {
          play: false,
          interval: 1e3
        }
      };
      const reConfig = merge_1(baseConfig, props.config);
      return reConfig;
    });
    const toPage = (type) => {
      if (!preCheck())
        return;
      if (type == "last") {
        switchPage(false);
      }
      if (type == "next") {
        switchPage(true);
      }
    };
    const pointerMouseover = (event, index) => {
      emit("pointerMouseover", {
        event,
        index
      });
    };
    const startAutoPlay = () => {
      setTimeout(() => {
        switchPage(true);
      }, config.value.autoPlay.interval);
    };
    const movePageByOffset = (offset = 0, quiet = false) => {
      quiet && setQuiet(true);
      allPageRef.value;
      let transformBind = `translate${config.value.direction == "v" ? "Y" : "X"}(${offset}px)`;
      allPageRef.value.style.transform = transformBind;
      quiet && setTimeout(() => {
        setQuiet(false);
      }, 500);
    };
    const resizeWin = throttle_1(() => {
      initPageWH();
    }, 500);
    const pointerClick = (index) => {
      if (!preCheck())
        return;
      movePage(index, true);
      emit("update:page", index);
    };
    const initPageWH = () => {
      state.fullHeight = outContainerRef.value.clientHeight;
      state.fullWidth = outContainerRef.value.clientWidth;
      state.maxY = props.pages * state.fullHeight;
      state.maxX = props.pages * state.fullWidth;
    };
    const initContainer = () => {
      allPageRef.value.style.height = allPageRef.value.querySelectorAll(".page").length * state.fullHeight + "px";
      allPageRef.value.style.width = allPageRef.value.querySelectorAll(".page").length * state.fullWidth + "px";
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
    const preCheck = () => {
      if (state.isRock || config.value.autoPlay.play && !state.autoPlayFinished || config.value.loop) {
        return false;
      }
      return true;
    };
    const pcRoll = (e) => {
      if (!preCheck())
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
      if (!preCheck())
        return;
      if (state.isRock)
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
    const movePage = (page, quiet, delayPage) => {
      if (allPageRef.value && state.fullHeight > 0 && state.fullWidth > 0) {
        let offset = -(page * (config.value.direction == "v" ? state.fullHeight : state.fullWidth));
        if (quiet) {
          allPageRef.value.style.transitionProperty = "none";
        }
        let transformBind = `translate${config.value.direction == "v" ? "Y" : "X"}(${offset}px)`;
        allPageRef.value.style.transform = transformBind;
        if (quiet) {
          setTimeout(() => {
            allPageRef.value.style.transitionProperty = "transform";
          }, 1);
        } else {
          state.isRock = true;
          const eventFn = () => {
            state.isRock = false;
            emit("rollEnd", props.page);
            allPageRef.value.removeEventListener("transitionend", eventFn);
            if (delayPage && delayPage > 0) {
              movePage(delayPage, true);
            }
            if (config.value.autoPlay.play) {
              if (config.value.loop) {
                startAutoPlay();
              } else if (props.page < props.pages && !state.autoPlayFinished) {
                startAutoPlay();
              } else {
                state.autoPlayFinished = true;
              }
            }
          };
          allPageRef.value.addEventListener("transitionend", eventFn);
        }
      }
    };
    const switchPage = (forward = true, quiet = false) => {
      if (allPageRef.value) {
        let targetPage;
        let delayPage;
        if (forward) {
          targetPage = props.page + 1;
          delayPage = props.page == props.pages && 1;
        } else {
          targetPage = props.page - 1;
          delayPage = props.page == 1 && props.pages;
        }
        if (delayPage) {
          movePage(targetPage, quiet, delayPage);
          emit("update:page", delayPage);
          return;
        }
        movePage(targetPage, quiet);
        emit("update:page", targetPage);
      }
    };
    const setQuiet = (quiet = true) => {
      const container = allPageRef.value;
      if (quiet) {
        container.classList.add("transition-clear");
      } else {
        container.classList.remove("transition-clear");
      }
    };
    const initLoop = () => {
      const container = allPageRef.value;
      if (container.firstChild && container.lastChild) {
        const pageFirst = container.querySelector(".page[data-num = '1']");
        const pageLast = container.querySelector(`.page[data-num = '${props.pages}']`);
        const pageFirstClone = pageFirst.cloneNode(true);
        const pageLastClone = pageLast.cloneNode(true);
        container.append(pageFirstClone);
        container.prepend(pageLastClone);
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
    const goPage = (page, quiet) => {
      movePage(page, quiet);
    };
    let loadedImgCount = 0;
    const imgLoad = (page) => {
      loadedImgCount += 1;
      if (loadedImgCount == props.pages && config.value.autoPlay.play) {
        console.log(`\u5168\u90E8\u80CC\u666F\u56FE\u7247\u521D\u59CB\u5316\u5B8C\u6210`);
        setTimeout(() => {
          startAutoPlay();
        }, config.value.autoPlay.interval);
      }
    };
    watch(() => props.page, (val) => {
      nextTick(() => {
        if (!state.isInitPage) {
          const offset = -(val * state.fullHeight);
          movePageByOffset(offset, true);
          state.isInitPage = true;
          return;
        }
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
      } else {
        emit("update:page", 1);
      }
      nextTick(() => {
        nextTick(() => {
          initLoop();
          initContainer();
        });
      });
    }, {
      immediate: true
    });
    watch(() => config.value.direction, (val) => {
      nextTick(() => {
        const container = allPageRef.value;
        if (val == "h") {
          movePageByOffset(-state.fullWidth, true);
          container.querySelectorAll(".page").forEach((item) => {
            item.classList.add("floatLeft");
          });
        } else {
          movePageByOffset(-state.fullHeight, true);
          container.querySelectorAll(".page").forEach((item) => {
            item.classList.remove("floatLeft");
          });
        }
      });
    }, {
      immediate: true
    });
    watch(() => config.value.autoPlay.play, (val) => {
      if (val) {
        nextTick(() => {
          startAutoPlay();
        });
      }
    }, {
      immediate: false
    });
    expose({
      goPage
    });
    onMounted(() => {
      init();
    });
    onBeforeUnmount(() => {
      removePageListener();
      window.removeEventListener("resize", resizeWin);
      console.log("\u9500\u6BC1\u9875\u9762\u4E8B\u4EF6\u6210\u529F");
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "mv-page-container",
        style: normalizeStyle({
          position: unref(config).position,
          width: "100%",
          height: "100%"
        }),
        ref_key: "outContainerRef",
        ref: outContainerRef
      }, [
        createElementVNode("div", {
          class: "mv-all-page",
          ref_key: "allPageRef",
          ref: allPageRef,
          style: normalizeStyle({
            "transition-duration": unref(config).transition.duration,
            "transition-timing-function": unref(config).transition.timingFun,
            "transition-delay": unref(config).transition.delay
          })
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(state).pagesArr, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: normalizeClass(["page", { floatLeft: !(unref(config).direction == "v") }]),
              style: normalizeStyle({
                height: unref(state).fullHeight + "px",
                width: unref(state).fullWidth + "px",
                "background-color": unref(config).bgArr[index] && unref(config).bgArr[index].color
              }),
              ref_for: true,
              ref: `page${item.page}`,
              "data-num": index + 1
            }, [
              unref(config).bgArr[index] && unref(config).bgArr[index].image ? (openBlock(), createElementBlock("img", {
                key: 0,
                class: "page-bg-img",
                src: `${unref(config).bgArr[index].image}`,
                style: normalizeStyle({ "object-fit": unref(config).bgConfig.fit }),
                onLoad: ($event) => imgLoad()
              }, null, 44, _hoisted_2)) : createCommentVNode("v-if", true),
              unref(config).cache ? (openBlock(), createElementBlock("div", _hoisted_3, [
                renderSlot(_ctx.$slots, `page${item.page}`, { data: item }, void 0, true)
              ])) : withDirectives((openBlock(), createElementBlock("div", _hoisted_4, [
                renderSlot(_ctx.$slots, `page${item.page}`, { data: item }, void 0, true)
              ], 512)), [
                [vShow, __props.page == item.page]
              ])
            ], 14, _hoisted_1);
          }), 128))
        ], 4),
        unref(config).poi.pointer ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["mv-pointer-wrapper", [unref(config).poi.position, unref(config).poi.className]])
        }, [
          createElementVNode("ul", {
            class: normalizeClass(unref(state).isPc && "hover")
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.pages, (index) => {
              return openBlock(), createElementBlock("li", {
                class: normalizeClass({ active: __props.page == index }),
                onClick: withModifiers(($event) => pointerClick(index), ["stop"]),
                key: index,
                onMouseover: ($event) => pointerMouseover($event, index)
              }, null, 42, _hoisted_5);
            }), 128))
          ], 2)
        ], 2)) : createCommentVNode("v-if", true),
        unref(config).arrow.last ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "last-arrow iconfont icon-jiantoushang",
          onClick: _cache[0] || (_cache[0] = ($event) => toPage("last"))
        })) : createCommentVNode("v-if", true),
        unref(config).arrow.next ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: "next-arrow iconfont icon-jiantouxia",
          onClick: _cache[1] || (_cache[1] = ($event) => toPage("next"))
        })) : createCommentVNode("v-if", true)
      ], 4);
    };
  }
}));
var MyComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5e88b1b5"]]);
MyComponent.install = (app, options) => {
  app.component(MyComponent.name, MyComponent);
};
export { MyComponent as default };
