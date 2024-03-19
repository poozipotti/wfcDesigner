import * as render from "./render/render";
import "./style.css";
import "./normalize.css";
import {createState, randomBackgroundColor} from "./update";

function init() {
  window.addEventListener("load", (event) => {
    const unsafeCanvas = document.getElementById("logoCanvas");
    if (!unsafeCanvas || !("getContext" in unsafeCanvas)) {
      throw new Error("could not find canvas or it is not the correct element");
    }
    const canvas = unsafeCanvas as HTMLCanvasElement;
    const RenderMethods = render.setupRenderer(canvas)
    RenderMethods.randomBackgroundColor();
  });
}


init();
