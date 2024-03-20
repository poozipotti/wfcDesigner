export interface Tstate {
  backgroundColor: string;
  rects: { x: number; y: number; width: number; height: number ,color: string }[];
}
const initialState: Tstate = {
  backgroundColor: "#00FF00",
  rects: [],
};

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
