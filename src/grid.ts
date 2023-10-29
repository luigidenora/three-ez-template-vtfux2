import { GridHelper, Group } from 'three';
import { Tile } from './tile';

export class Grid extends Group {
  constructor() {
    super();
    const grid = new GridHelper(10, 10, 'white', 'white');
    grid.interceptByRaycaster = false;
    grid.position.y += 10 ** -2;
    this.add(grid);

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.add(new Tile(i, j));
      }
    }
  }
}
