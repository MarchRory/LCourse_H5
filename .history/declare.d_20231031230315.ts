export { }
declare global {
    interface window {
        insertText: Function;      // 声明模板中绑定的click事件
    }
}