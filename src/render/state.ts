export interface Tstate {
  backgroundColor: string;
}
const initialState: Tstate = {
  backgroundColor: "#00FF00",
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


