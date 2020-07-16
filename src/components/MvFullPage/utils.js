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
 * 禁止浏览器下拉回弹
 */
export const stopDrop = () => {
  var lastY;//最后一次y坐标点
  document.addEventListener('touchstart', function (event) {
    lastY = event.changedTouches[0].clientY;//点击屏幕时记录最后一次Y度坐标。
  });
  document.addEventListener('touchmove', function (event) {

    var y = event.changedTouches[0].clientY;
    var st = document.body.scrollTop; //滚动条高度  
    if (y >= lastY && st <= 10) {//如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
      lastY = y;
      event.preventDefault();
    }
    lastY = y;
  });
}
/**
 * 判断是否是火狐浏览器
 */
export const isFireFox = () => {
  return window.navigator.userAgent.toLowerCase().indexOf("firefox") != -1;
}