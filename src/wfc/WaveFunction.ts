import {
  DirectionNames,
  Tile,
  TileData,
  TileMatrix,
  coordinates,
} from "./TileMatrix";

interface CompatibilityRule {
  tile1: Tile;
  tile2: Tile;
  direction: DirectionNames;
}

export class CompatibilityOracle {
  rules: CompatibilityRule[];
  constructor() {
    this.rules = [];
  }

  static ruleEq(rule1: CompatibilityRule, rule2: CompatibilityRule) {
    return (
      rule1.tile1.identityString === rule2.tile1.identityString &&
      rule1.tile2.identityString === rule2.tile2.identityString &&
      rule1.direction === rule2.direction
    );
  }
  check(compatRule: CompatibilityRule) {
    this.rules.find((rule) => CompatibilityOracle.ruleEq(compatRule, rule));
  }
}
type Coeffecients = TileData[];
type Weights = { [key: string]: TileData };
export class CoefficientMatrix {
  tileMatrix: TileMatrix;
  coeffecients: Coeffecients;
  coeffecientMatrix: Coeffecients[];
  weights: Weights;
  constructor(width: number, height: number, inputTiles: Tile[], weights:Weights) {
    this.tileMatrix = new TileMatrix(
      width,
      height,
      Array(width * height).fill(undefined)
    );
    this.coeffecients = inputTiles.reduce(
      (coeffecients, { data }) =>
        !data ||
        coeffecients.find(
          (coeffecient) => data.toString() === coeffecient.toString()
        )
          ? coeffecients
          : [...coeffecients, data],
      [] as Coeffecients
    );
    this.coeffecientMatrix = Array(width * height).fill(this.coeffecients);
    this.weights = weights;
  }
  get(coords: coordinates) {
    const idx = this.tileMatrix.getIdx(coords);
    return {
      coeffecients: this.coeffecientMatrix[idx],
      tile: this.tileMatrix.Tiles[idx],
    };
  }
  getAll() {
    return this.coeffecientMatrix.map((coeffecients, idx) => ({
      coeffecients,
      tile: this.tileMatrix.Tiles[idx],
    }));
  }
  getCollapsed(coords: coordinates) {
    const tile = this.tileMatrix.get(coords);
    if (!tile) {
      throw new Error(`no tile at ${coords.toString()}`);
    }
    if (!tile.data) {
      throw new Error(`not collapsed at ${coords.toString}`);
    }
    return tile;
  }
  getAllCollapsed() {
    if (this.tileMatrix.Tiles.find(({ data }) => !data)) {
      throw new Error(`tiles not collapsed`);
    }
    return this.tileMatrix;
  }
}

export class WaveFunction {
  coeffecientMatrix: CoefficientMatrix;

  constructor(width: number, height: number, inputTiles: Tile[]) {
    this.coeffecientMatrix = new CoefficientMatrix(width, height, inputTiles);
  }
  shannonEntropy(coords: coordinates) {
    /*
        sum_of_weights = 0
        sum_of_weight_log_weights = 0
        for opt in self.coefficient_matrix[y][x]:
            weight = self.weights[opt]
            sum_of_weights += weight
            sum_of_weight_log_weights += weight * math.log(weight)

        return math.log(sum_of_weights) - (sum_of_weight_log_weights / sum_of_weights)
    */

  }
  isFullyCollapsed() {}
  collapse() {}
  constrain() {}
}
export class Model {
  constructor() {}
  run() {}
  iterate() {}
  propagate() {}
  minEntroyCoOrds() {}
}

function validDirs() {}
function parseExampleMatrix() {}

const input_matrix = [
  ["L", "L", "L", "L"],
  ["L", "L", "L", "L"],
  ["L", "L", "L", "L"],
  ["L", "C", "C", "L"],
  ["C", "S", "S", "C"],
  ["S", "S", "S", "S"],
  ["S", "S", "S", "S"],
];
const input_matrix2 = [
  ["A", "A", "A", "A"],
  ["A", "A", "A", "A"],
  ["A", "A", "A", "A"],
  ["A", "C", "C", "A"],
  ["C", "B", "B", "C"],
  ["C", "B", "B", "C"],
  ["A", "C", "C", "A"],
];
