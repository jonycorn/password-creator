import { createApp } from "vue";
import App from "./App.vue";

import "./index.css";

const app = createApp(App);

app.mount("#app");

window.addEventListener("keydown", function (e) {
  if (e.key === "d") {
    document.body.classList.toggle("dark");
  }
});
