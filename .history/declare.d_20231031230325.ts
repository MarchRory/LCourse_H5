export { }
declare global {
    interface Window {
        insertText: Function;      // 声明模板中绑定的click事件
    }
}