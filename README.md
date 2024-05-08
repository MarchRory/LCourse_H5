# 基于易班的考评系统学生端
一个手机浏览器的H5 APP，目前已经部署到服务器并接入易班，预计不久后将正式上线投入使用

要求的全部功能很早以前已经完成，随时可以上线，具体看学校那边安排吧，现在也就没事做点优化和改bug的活。


# 技术栈
- Vue3
- TypeScript
- Pinia
- Vue-router@4
- Vite
- Vant4
- WebSocket
- Axios
- Echarts
- GSAP3

# 开发须知

## 如何本地运行?
- 首先，手机和电脑连接同一个局域网，然后拿到本地局域网的ip。
- 接着去`vite.config.ts`这个文件, 将`host`修改为当前ip
- 如果还要走授权登录, 还需要修改`.env.development`中`VITE_APP_REDIRECT_PATH`内ip为当前ip
- `npm run dev`

## 可以不在手机上运行吗?
**不可以! 移动端开发必须去真机运行看效果**，PC只是方便看调试数据，很多移动端的问题只有在真机上才会暴露，**一切以真机结果为准**


# 图标集

除了Vant4组件提供的图标集外, 项目还使用了 [iconify/tabler](https://icon-sets.iconify.design/tabler/?category=General) 作为另一套图标集, 并使用iconify官方提供的 [iconify/vue](https://iconify.design/docs/icon-components/vue/) 组件进行引入

## 使用示例


```bash
# 首先安装图标组件和图标集
npm i @iconify/vue @iconify/icons-tabler
```

`main.ts`
```ts
// 在入口文件中全局引入 Icon 组件
import { Icon } from '@iconify/vue'

// 然后全局挂载
createApp(App)
  .component('t-icon', Icon)
  .mount("#app")
// 因为我们使用的是tabler图标集, 所以将组件重命名为 t-icon 以便区分
```

`component.vue`
```html
<!-- 然后在iconify/tabler中找到想要引入的图标， 复制name, 传入icon prop -->
<t-icon icon="tabler:4k-bold" />
```

## props
> 详情请见 [官方文档](https://iconify.design/docs/icon-components/vue/#properties), 这里提供中文版

**必填项**
- icon: `iconifyIcon|string`，所选icon的名字, 格式为 `iconset-name:icon-name`，即`图标集名:图标名`, 例如, 本项目中使用的是`tabler`图标集, 我需要使用其中名为`4k-bold`的图标。那么传给组件的icon的值就是`tabler:4k-bold`

> icon值的详细组成详见[官方文档](https://iconify.design/docs/icon-components/vue/#properties)

**常用可选项**
- inline: `boolean`，设置垂直对齐方式为`inline`
- width：`string|number`，图标的宽
- height: `string|number`, 图标的高
- horizontalFlip: `boolean` 水平翻转图标
- verticalFlip: `boolean`，垂直翻转图标
- filp: `string`, 自定义翻转模式，值参考css对应属性
- rotate: `string`, 渲染角度
- color: `string`, 图标颜色
- onLoad: `Functon`, 图标完成加载时触发的回调方法

> 除此之外，图标组件还接收常见的其他属性和原生事件, 例如`onClick (vue中为click)`等。所有传入的属性和事件, 都会被传入给渲染出的`Svg`元素


# 未来计划
1、由于暂时没有给我们提供https，所以不可以扫码和调用浏览器原生Notification， 这些将在后续版本中补全

2、流量和性能监控方面，待 `xdMonitor` 开发完毕后会接入

3、为了app的更强的易扩展性、健壮性、易移植性，未来可能进行一定程度的重构，包括但不限于： 
- **UI重构**：计划使用 `Tailwind CSS` 或者 `UnoCSS` 重构整个app的UI。使用他们的原因一是相比其他的效率足够快，也很爽，而是他们在打包阶段比较友好，三是想感受一下UI严格规范设计下的还原设计稿。这个算是我一直以来最想做的，但是因为一点原因，嗯，我们这个项目的开发团队没有找到合适的UI同学，所以项目负责人临时找了开源的UI设计搞改了改暂时先用了，只能说看得过去吧，但是相较于大多数同学们的审美可能有一种“文艺复兴”的美，所以后面还是要找同学设计一下UI，前端的同学来重新切切图。

- **部分组件和代码重构**：使用设计模式进行重构，涉及的范围比较小

- **年度报告重构**：现在的年度报告只是基础的效果，虽然可以上线，一年后直接和用户见面，但是yysy设计看着还是很寒酸的。另外，根据我们后台教师端的规划，后续将集成低代码制作年度报告的功能，解放coder。所以年度报告涉及到的全部代码，在未来会迎来一次彻底重写，时间定在计划中的年度报告低代码平台验收完成之时，预计在2024年年中附近。