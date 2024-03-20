import draw from "./draw";
import Updater from "./update";
const needUpdateEvent = new Event("needsUpdate");

export function setupRenderer(canvas: HTMLCanvasElement) {
  const flagDirty = () => {
    canvas.dispatchEvent(needUpdateEvent);
  };
  const ctx = canvas?.getContext("2d");
  if (!ctx) {
    throw new Error("could not get canvas context");
  }
  const updater = new Updater(flagDirty);
  canvas.addEventListener("needsUpdate", () => {
    setCanvasToWindowSize(canvas);
    draw(ctx, updater.state);
  });
  window.onresize = function () {
    flagDirty();
  };

  
  return updater;
}

export function setCanvasToWindowSize(canvas: HTMLCanvasElement) {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  canvas.setAttribute("width", String(windowWidth));
  canvas.setAttribute("height", String(windowHeight));
}
