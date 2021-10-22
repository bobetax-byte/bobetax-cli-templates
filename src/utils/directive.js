import Vue from "Vue";
import { debounce } from "laodsh";

import { once, on } from "@/utils/event";

Vue.directive("debounce", {
  bind: function (el, binding) {
    let clicked = false,
      debounceTime = 100,
      interval = null,
      startTime = 0,
      innerHtml = el.innerText;
    
    const handler = debounce(() => {
      if (binding.value) {
        binding.value().finally(() => {
          clicked = false;
          el.innerHtml = innerHtml;
          el.classList.remove("el-disabled");
        })
      }
    },debounceTime);

    const clear = () => {
      if (Date.now() - startTime < debounceTime) {
        handler();
      };
      clearInterval(interval);
      interval = null;
    }

    on(el, "mousedown", (e) => {
      if (e.button !== 0 || clicked) return Promise.reject();
      clicked = true;
      el.innerHtml = `<i class="el-icon-loading"></i>${innerHtml}`;
      el.classList.add("el-disabled");
      startTime = Date.now();
      once(document, "mouseup", clear);
      clearInterval(interval);
      interval = setInterval(handler, debounceTime)
    })
  }
})