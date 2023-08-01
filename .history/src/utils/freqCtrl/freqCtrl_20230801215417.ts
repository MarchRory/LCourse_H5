import { ref } from 'vue'
// 防抖, 短时间高频触发只会生效最后一次触发
export const debounce = (fn: Function, delay: number = 500) => {
    let timer: NodeJS.Timeout | null = null
    return (...args: any[]) => {
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}


export const throttle = (fn: Function, delay: number = 500) => {
    let flag = ref(true)

    return (...args: any[]) => {
        if (!flag.value) { return; }
        flag.value = false
        setTimeout(() => {
            fn(...args)
            flag.value = true
        }, delay)
    }
}

// 节流, 短时间高频触发, 只生效第一次触发
export function throttle(fn: { apply: (arg0: any, arg1: any[]) => void }, delay: number = 400) {
    var timerId = true
    return function (this: any, ...args: any) {
        if (timerId) {
            fn.apply(this, args)
            timerId = false
            setTimeout(() => {
                timerId = true
            }, delay)
        }
    }
}

