import { createApp } from "vue";
import App from "./App.vue";

import "./index.css";

const app = createApp(App);

app.mount("#app");

const htmlTag = document.querySelector(".html-tag");

window.addEventListener("keydown", function (e) {
  if (e.key === "d") {
    htmlTag.classList.toggle("dark");
  }
});

setInterval(() => {
  const matched = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (matched) htmlTag.classList.add("dark");
  else htmlTag.classList.remove("dark");
}, 10);
