import { Tstate } from "../update/state";

export default function draw(ctx: CanvasRenderingContext2D, state: Tstate) {
  drawBackground(ctx, state);
  drawRects(ctx, state);
}
function drawBackground(ctx: CanvasRenderingContext2D, state: Tstate) {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  ctx.fillStyle = state.backgroundColor;
  ctx.fillRect(0, 0, windowWidth, windowHeight);
}
function drawRects(ctx: CanvasRenderingContext2D, state: Tstate) {
  state.rects.forEach((rect) => {
    ctx.fillStyle = rect.color;
  ctx.fillRect(rect.y, rect.x, rect.width, rect.height);

  });
}
