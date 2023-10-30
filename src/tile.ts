import { Mesh, MeshLambertMaterial, PlaneGeometry } from 'three';
import { Pumpkin } from './pumpkin';
import { Grid } from './grid';
import { Scene } from './scene';

export class Tile extends Mesh<PlaneGeometry, MeshLambertMaterial> {
  declare parent: Grid;
  declare scene: Scene;
  public isBusy = false;

  constructor(public row: number, public col: number) {
    super(new PlaneGeometry(1, 1), new MeshLambertMaterial({ transparent: true, opacity: 0.4, color: 'gray' }));
    this.position.set(col - 5 + 0.5, 0, row - 5 + 0.5);
    this.rotateX(Math.PI / -2);

    this.on('pointerenter', (e) => {
      if (this.isBusy) {
        this.material.color.set('red');
      } else {
        this.material.color.set('yellow');
        this.parent.inputPumpkin.position.copy(this.position);
      }
      this.parent.inputPumpkin.setMaterialVisibility(true);
    });

    this.on('pointerleave', (e) => {
      this.material.color.set('gray');
      this.parent.inputPumpkin.setMaterialVisibility(false);
    });

    this.on('click', (e) => {
      if (this.isBusy) return;
      this.isBusy = true;
      this.parent.inputPumpkin.setMaterialVisibility(false);
      this.material.color.set('red');
      this.scene.addPumpkin(this);
    });
  }
}
