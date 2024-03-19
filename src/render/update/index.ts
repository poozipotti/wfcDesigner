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

export default class Updater {
  state: Tstate;
  constructor(operationCallback: ()=>void) {
    this.state = init(operationCallback);
  }
  randomBackgroundColor() {
    this.state.backgroundColor =
      "#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0");
  }
}
