/**
 * @desc  函数防抖---“立即执行版本” 和 “非立即执行版本” 的组合版本
 * @param  func 需要执行的函数
 * @param  wait 延迟执行时间（毫秒）
 * @param  immediate---true 表立即执行，false 表非立即执行
 **/
export const debounce = (func, wait, immediate) => {
  let timer;
  return function () {
    let context = this;
    let args = arguments;

    if (timer) clearTimeout(timer);
    if (immediate) {
      var callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timer = setTimeout(function () {
        func.apply(context, args)
      }, wait);
    }
  }
}
/**
 * @desc  函数节流
 * @param  func 需要执行的函数
 * @param  wait 延迟执行时间（毫秒）
 **/
export const throttle = (func, wait = 500) => {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args)
      }, wait)
    }
  }
}
/**
 * 判断是否是火狐浏览器
 */
export const isFireFox = () => {
  return window.navigator.userAgent.toLowerCase().indexOf("firefox") != -1;
}

/**
 *  通用浏览器注册事件函数
 * @param {*} elem 
 * @param {*} type 
 * @param {*} fn 
 */
export function addEvent(elem, type, fn) {
  if (elem.attachEvent) {
    elem.attachEvent('on' + type, fn);
    return;
  }
  if (elem.addEventListener) {
    elem.addEventListener(type, fn, false);
  }
}

/**
 * 通用浏览器移出事件函数
 * @param {*} elem 
 * @param {*} type 
 * @param {*} fn 
 */
export function removeEvent(elem, type, fn) {
  if (elem.detachEvent) {
    debugger;
    elem.detachEvent('on' + type, fn);
    return;
  }
  if (elem.removeEventListener) {
    elem.removeEventListener(type, fn, false);
  }
}

/*
 * 获取事件冒泡路径，兼容ie11,edge,chrome,firefox,safari
 * @param evt
 * @returns {*}
 */
export function eventPath(evt) {
  const path = (evt.composedPath && evt.composedPath()) || evt.path,
    target = evt.target;

  if (path != null) {
    return (path.indexOf(window) < 0) ? path.concat(window) : path;
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
