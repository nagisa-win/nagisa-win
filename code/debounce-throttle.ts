/**
 * 防抖和节流
 */

// 1. 防抖

function debounce(fn: Function, delay = 500) {
    let timer = 0;
    return function (...args: any[]) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// 2. 节流

function throttle(fn: Function, delay = 500) {
    let timer = -1;
    return function (...args: any[]) {
        if (timer === -1) {
            fn.apply(this, args);
            timer = setTimeout(() => {
                clearTimeout(timer);
                timer = -1;
            }, delay);
        }
    };
}
function throttleTime(fn: Function, delay = 500) {
    let lastTime = 0;
    return function (...args: any[]) {
        const now = Date.now();
        if (now - lastTime >= delay) {
            fn.apply(this, args);
            lastTime = now;
        }
    };
}
