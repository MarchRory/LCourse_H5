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

# 未来计划
1、由于暂时没有给我们提供https，所以不可以扫码和调用浏览器原生Notification， 这些将在后续版本中补全

2、流量和性能监控方面，待 `xdMonitor` 开发完毕后会接入

3、为了app的更强的易扩展性、健壮性、易移植性，未来可能进行一定程度的重构，包括但不限于： 
- **UI重构**：计划使用 `Tailwind CSS` 或者 `UnoCSS` 重构整个app的UI。使用他们的原因一是相比其他的效率足够快，也很爽，而是他们在打包阶段比较友好，三是想感受一下UI严格规范设计下的还原设计稿。这个算是我一直以来最想做的，但是因为一点原因，嗯，我们这个项目的开发团队没有找到合适的UI同学，所以项目负责人临时找了开源的UI设计搞改了改暂时先用了，只能说看得过去吧，但是相较于大多数同学们的审美可能有一种“文艺复兴”的美，所以后面还是要找同学设计一下UI，前端的同学来重新切切图。

- **部分组件和代码重构**：使用设计模式进行重构，涉及的范围比较小

- **年度报告重构**：现在的年度报告只是基础的效果，虽然可以上线，一年后直接和用户见面，但是yysy设计看着还是很寒酸的。另外，根据我们后台教师端的规划，后续将集成低代码制作年度报告的功能，解放coder。所以年度报告涉及到的全部代码，在未来会迎来一次彻底重写，时间定在计划中的年度报告低代码平台验收完成之时，预计在2024年年中附近。