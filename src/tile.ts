import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';

export class Tile extends Mesh<PlaneGeometry, MeshBasicMaterial> {
  constructor(row: number, col: number) {
    super(new PlaneGeometry(1, 1), new MeshBasicMaterial({ color: 'gray' }));
    this.position.set(col - 5 + 0.5, 0, row - 5 + 0.5);
    this.rotateX(Math.PI / -2);

    this.on(['pointerenter', 'pointerleave'], (e) => {
      this.material.color.set(e.type === 'pointerenter' ? 'yellow' : 'gray');
    });
  }
}
