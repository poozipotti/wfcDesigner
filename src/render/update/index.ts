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
  addRandomRects(amount: number) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    for (let i = 0; i < amount; i++) {
      this.state.rects = [
        ...this.state.rects,
        {
          x: Math.random() * width,
          y: Math.random() * height,
          width: Math.random() * 200,
          height: Math.random() * 200,
          color: Updater.getRandomColor(),
        },
      ];
    }
  }
}
