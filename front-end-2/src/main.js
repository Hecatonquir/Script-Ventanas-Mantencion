import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "./assets/main.css";

/* ------------ Configurations for Deploy ----------- */
import axios from "axios";
axios.defaults.baseURL = import.meta.env.FOO || "http://localhost:3001";
/* ------------ End of Deploy config ---------------- */
const app = createApp(App);
app.use(ElementPlus);
app.mount("#app");
