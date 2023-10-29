import { Mesh, MeshLambertMaterial, PlaneGeometry } from 'three';

export class Tile extends Mesh<PlaneGeometry, MeshLambertMaterial> {
  constructor(row: number, col: number) {
    super(new PlaneGeometry(1, 1), new MeshLambertMaterial({ transparent: true, opacity: 0.3, color: 'gray' }));
    this.position.set(col - 5 + 0.5, 0, row - 5 + 0.5);
    this.rotateX(Math.PI / -2);
    this.receiveShadow = true;

    this.on(['pointerenter', 'pointerleave'], (e) => {
      this.material.color.set(e.type === 'pointerenter' ? 'orange' : 'gray');
    });
  }
}
