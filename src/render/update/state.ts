import { TileMatrix } from "../../wfc/TileMatrix";

export interface Tstate {
  backgroundColor: string;
  tiles: TileMatrix;
}
const TILE_AMOUNT = 100
const initialState: Tstate = {
  backgroundColor: "#00FF00",
  tiles: new TileMatrix(
    TILE_AMOUNT,
    TILE_AMOUNT,
    Array(TILE_AMOUNT * TILE_AMOUNT)
      .fill(undefined)
      .map(() => getRandomColor())
  ),
};
function getRandomColor() {
  return ("#" +
    (((1 << 24) * Math.random()) | 0)
      .toString(16)
      .padStart(6, "0")) as hexColor;
}

export function init(callback: () => void) {
  const handler = {
    set(target: Tstate, prop: keyof Tstate, value: unknown) {
      const set = Reflect.set(target, prop, value);
      callback();
      return set;
    },
  };
  const state = new Proxy(initialState, handler);
  return state;
}
