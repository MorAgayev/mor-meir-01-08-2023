import { format } from 'date-fns';

const DEBOUNCES = {};

export function debounce(fn, id = 0, delay = 500) {
    clearTimeout(DEBOUNCES[id]);
    DEBOUNCES[id] = null;
    return ((...args) => {
        DEBOUNCES[id] = setTimeout(() => {
            delete DEBOUNCES[id];
            if (typeof fn === 'function')
                fn(...args);
        }, delay);
    })();
}


export function getDayFromDate(date) {
    return format(new Date(date), 'EEE')
}

export function getAvg(nums = []) {
    const avg = nums.reduce((a,b) => a + b , 0) / nums.length
    return avg.toFixed()
}