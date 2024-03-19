import {Tstate} from "../../update";

export default function draw(ctx: CanvasRenderingContext2D,state:Tstate) {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  ctx.fillStyle = state.backgroundColor;
  ctx.fillRect(0, 0, windowWidth, windowHeight);
}

