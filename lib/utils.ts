/**
 * 判断是否是移动端
 * @returns 
 */
export const isMoile = () => {
    const userAgentInfo = navigator.userAgent;
    const Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod",
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
/**
 * 判断是否是火狐浏览器
 * @returns 
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
export function addEvent(elem: any, type: any, fn: any) {
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
export function removeEvent(elem: any, type: any, fn: any) {
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
export function eventPath(evt: any) {
    const path = (evt.composedPath && evt.composedPath()) || evt.path,
        target = evt.target;

    if (path != null) {
        return (path.indexOf(window) < 0) ? path.concat(window) : path;
    }

    if (target === window) {
        return [window];
    }

    function getParents(node: any, memo?: any): any {
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

/**
 * 判断是否是ios系统
 * @returns 
 */
export const isIOS = () => {
    let u = navigator.userAgent;
    if (u.indexOf("iPhone") > -1) {
        return true;
    }
    return false;
}

