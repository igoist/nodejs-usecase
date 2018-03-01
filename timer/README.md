# timer -- 定时器

*The timer module exposes a global API for scheduling functions to be called at some future period of time. Because the timer functions are globals, there is no need to call require('timers') to use the API.*

timer 模块暴露了一个全局的 API，用于在某个未来时间段调用调度函数。 因为定时器函数是全局的，所以使用该 API 无需调用 require('timers')

*The timer functions within Node.js implement a similar API as the timers API provided by Web Browsers but use a different internal implementation that is built around the Node.js Event Loop.*

Node.js 中的计时器函数实现了与 Web 浏览器提供的定时器类似的 API，除了它使用了一个不同的内部实现，它是基于 Node.js 事件循环构建的


**List**

* demo0000 -- Basic