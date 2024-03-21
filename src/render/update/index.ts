import { Tstate, init } from "./state";

export default class Updater {
  state: Tstate;
  constructor(operationCallback: () => void) {
    this.state = init(operationCallback);
  }
  static getRandomColor() {
    return (
      "#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0")
    );
  }
  randomBackgroundColor() {
    this.state.backgroundColor = Updater.getRandomColor();
  }
}
