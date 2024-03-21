import { Tstate } from "../update/state";

export default function draw(ctx: CanvasRenderingContext2D, state: Tstate) {
  drawBackground(ctx, state);
  drawTiles(ctx, state);
}
function drawBackground(ctx: CanvasRenderingContext2D, state: Tstate) {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  ctx.fillStyle = state.backgroundColor;
  ctx.fillRect(0, 0, windowWidth, windowHeight);
}
function drawTiles(ctx: CanvasRenderingContext2D, state: Tstate) {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const tileWidth = windowWidth / state.tiles.width;
  const tileHeight = windowHeight / state.tiles.height;
  state.tiles.Tiles.forEach((tile) => {
    ctx.fillStyle = tile.data?.color || '#000000';
    ctx.fillRect(
      tile.coords.x * tileWidth,
      windowHeight - ((tile.coords.y+1) * tileHeight),
      tileWidth,
      tileHeight
    );
  });
}
