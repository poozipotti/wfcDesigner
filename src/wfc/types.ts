// translated from https://github.com/robert/wavefunction-collapse/blob/master/main.py
type hexColor = `#${string}`;
type cord = [number, number];
type Tile = hexColor;

type up = [1, 0];
type down = [-1, 0];
type left = [0, -1];
type right = [0, 1];
type Direction = up | down | left | right;
type Compatibility = { tile1: Tile; tile2: Tile; direction: Direction };
interface Weights {
  [Tile: Tile]: number;
}
type Coefficients = Set<Tile>;
type CoefficientMatrix = Coefficients[][];

const UP: up = [1, 0];
const DOWN: down = [-1, 0];
const LEFT: left = [0, -1];
const RIGHT: right = [0, 1];
const DIRS: Direction[] = [UP, DOWN, LEFT, RIGHT];
