import { createApp } from 'vue'
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// reset css
import "@kirklin/reset-css/kirklin.css";
import "~/assets/css/main.scss";
import "uno.css";

// 不使用mock 请注释掉
import { registerEcharts } from "~/plugins/echarts";
import { mockXHR } from "~/mock/index";
// 模拟数据
mockXHR();

const app = createApp(App);
// 图表
registerEcharts(app);
// 存储
app.use(createPinia());
// 路由
app.use(router);

app.mount("#app");
