/**
 * @description 事件监听执行
 * @param {Document} element Dom
 * @param {String} event 事件 
 * @param {Function} handler 函数
 */
export function on(element, event, handler) {
  if (element && event && handler) {
    element.addEventListener(event,handler,false)
  }
}

/**
 * @description 去掉事件监听
 * @param {Document} element Dom
 * @param {String} event 事件 
 * @param {Function} handler 函数
 */
export function off(element, event, handler) {
  if (element && event && handler) {
    element.removeEventListener(event,handler,false)
  }
}

/**
 * @description 事件一次执行
 * @param {Document} element Dom
 * @param {String} event 事件 
 * @param {Function} fn 函数
 */
export function once(element, event, fn) {
  const listener = function (...args) {
    if (fn) {
      fn.apply(this, args);
    }
    (0,off)(element,event,listener)
  }
  (0,on)(element,event,listener)
}

