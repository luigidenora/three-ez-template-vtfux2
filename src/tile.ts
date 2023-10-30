import { Mesh, MeshLambertMaterial, PlaneGeometry } from 'three';
import { Pumpkin } from './pumpkin';
import { Grid } from './grid';

export class Tile extends Mesh<PlaneGeometry, MeshLambertMaterial> {
  declare parent: Grid;
  public isBusy = false;

  constructor(row: number, col: number) {
    super(new PlaneGeometry(1, 1), new MeshLambertMaterial({ transparent: true, opacity: 0.3, color: 'gray' }));
    this.position.set(col - 5 + 0.5, 0, row - 5 + 0.5);
    this.rotateX(Math.PI / -2);
    this.receiveShadow = true;

    this.on('pointerenter', (e) => {
      if (this.isBusy) {
        this.material.color.set('red');
      } else {
        this.material.color.set('green');
        this.parent.inputPumpkin.position.copy(this.position);
      }
      this.scene.add(this.parent.inputPumpkin); // move logic in grid to avoid to add/remoove
    });

    this.on('pointerleave', (e) => {
      this.material.color.set('gray');
      this.parent.inputPumpkin.removeFromParent();
    });

    this.on('click', (e) => {
      if (this.isBusy) return;
      this.isBusy = true;
      this.parent.inputPumpkin.removeFromParent();
      const pumpkin = new Pumpkin();
      pumpkin.position.copy(this.position);
      this.scene.add(pumpkin);
      this.material.color.set('red');
    });
  }
}
