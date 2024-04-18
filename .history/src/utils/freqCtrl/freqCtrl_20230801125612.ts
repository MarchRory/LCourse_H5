// 防抖
export function debounce(fn: { apply: (arg0: any, arg1: any) => void }, delay: number = 500) {
    let timer: any = null
    return function (this: any, ...args: any) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setInterval(() => {
            timer = null
            fn.apply(this, args)
        }, delay)
    }
}


// 节流
export function throttle(fn: { apply: (arg0: any, arg1: any[]) => void }, delay: number = 500) {
    let timerId = true
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

