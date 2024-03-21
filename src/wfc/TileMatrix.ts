export type coordinates = { x: number; y: number };
type hexColor = `#${string}`;
interface Directions {
  UP: { x: 1; y: 0 };
  DOWN: { x: -1; y: 0 };
  LEFT: { x: 0; y: -1 };
  RIGHT: { x: 0; y: 1 };
}
export type DirectionNames = keyof Directions;
type DirectionVectors = Directions[DirectionNames];

export const directions: Directions = {
  UP: { x: 1, y: 0 },
  DOWN: { x: -1, y: 0 },
  LEFT: { x: 0, y: -1 },
  RIGHT: { x: 0, y: 1 },
};

function applyDirection(coords: coordinates, direction: DirectionNames) {
  const directionVector = directions[direction];
  return { x: coords.x + directionVector.x, y: coords.y + directionVector.y };
}
export interface TileData {
  color: hexColor;
}
export class Tile {
  coords: coordinates;
  data: TileData | undefined;
  constructor(coords: coordinates, data?: { color: hexColor }) {
    this.coords = coords;
    this.data = data;
  }
  get identityString() {
    return `${this.data?.color || "undefined"}|${this.coords.x}|${
      this.coords.y
    }`;
  }
  get dataString() {
    return this.data?.toString() || 'undefined';
  }
  coordEq(coord: coordinates) {
    return this.coords.x === coord.x && this.coords.y === coord.y;
  }
  eq(tile: Tile) {
    return this.identityString == tile.identityString;
  }
  clear() {
    this.data = undefined;
  }
}

export class TileMatrix {
  Tiles: Tile[];
  width: number;
  height: number;
  constructor(width: number, height: number, Tiles: hexColor[] | undefined[]) {
    if (width * height !== Tiles?.length) {
      throw new Error(
        `Input Tiles not correct length should be ${width * height} got ${
          Tiles?.length
        }`
      );
    }
    this.width = width;
    this.height = height;
    this.Tiles = Tiles?.map((color: hexColor | undefined, i) => {
      return new Tile(
        { x: i % width, y: Math.floor(i / width) },
        color ? { color } : undefined
      );
    });
  }
  get(coords: coordinates) {
    return this.Tiles.find((tile) => tile.coordEq(coords));
  }
  getIdx(coords: coordinates) {
    return this.Tiles.findIndex((tile) => tile.coordEq(coords));
  }
  set(coords: coordinates, data: TileData) {
    const idx = this.getIdx(coords);
    this.Tiles[idx].data = data;
  }
  getTileWithNeighbors(coords: coordinates) {
    const idx = this.getIdx(coords);
    return {
      Center: this.Tiles[idx],
      UP: this.get(applyDirection(coords, "UP")),
      DOWN: this.get(applyDirection(coords, "DOWN")),
      LEFT: this.get(applyDirection(coords, "LEFT")),
      RIGHT: this.get(applyDirection(coords, "RIGHT")),
    };
  }
}
