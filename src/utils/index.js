/**
 * common utils
 */
export default {
    /**
     * @param {any} value 
     */
    deepClone(value) {
        if (!value) return value;
        const complexDataTypes = ['object', 'function'];
        if (complexDataTypes.includes(typeof value)) {
            let cacheData;
            value = value.valueOf()
            switch (Object.prototype.toString.call(value).replace(/(^\[object )|(]$)/g, '')) {
            case 'Date': cacheData = new Date(value.valueOf()); break;
            case 'RegExp': cacheData = new RegExp(value.valueOf()); break;
            case 'Array':
                cacheData = [];
                value.forEach((val, index) => {
                cacheData[index] = this.deepClone(val);
                });
                break;
            case 'Object':
                cacheData = {};
                for (const i in value) {
                cacheData[i] = this.deepClone(value[i]);
                }
                break;
            default:
                cacheData = value;
                break;
            }
            return cacheData;
        } else {
            return value;
       }
    },
    /**
     * @param {Function} fn
     * @param {Number} delay
     */
    debounce(fn, delay) {
      let timer;
      return function () {
          if (timer) clearTimeout(timer)
          timer = window.setTimeout(() => {
            fn.apply(this, arguments)
          }, delay)
      } 
    },
    /**
     * @param {Function} fn
     * @param {Number} delay
     */
    throttle(fn, delay) {
      let isRun = false;
      return function() {
          if (!isRun) { 
            isRun = true
            window.setTimeout(() => {
                fn.apply(this, arguments)
                isRun = false
            }, delay)
          }
      }
    }
};
