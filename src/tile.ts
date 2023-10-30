import { Mesh, MeshLambertMaterial, PlaneGeometry } from 'three';
import { Pumpkin, inputPumpkin } from './pumpkin';

export class Tile extends Mesh<PlaneGeometry, MeshLambertMaterial> {
  public isBusy = false;

  constructor(row: number, col: number) {
    super(new PlaneGeometry(1, 1), new MeshLambertMaterial({ transparent: true, opacity: 0.3, color: 'gray' }));
    this.position.set(col - 5 + 0.5, 0, row - 5 + 0.5);
    this.rotateX(Math.PI / -2);
    this.receiveShadow = true;

    this.on('pointerenter', (e) => {
      this.material.color.set(this.isBusy ? 'red' : 'green');
      inputPumpkin.position.copy(this.position);
      this.scene.add(inputPumpkin); // move logic in grid to avoid to add/remoove
    });

    this.on('pointerleave', (e) => {
      this.material.color.set('gray');
      inputPumpkin.removeFromParent();
    });

    this.on('click', (e) => {
      if (this.isBusy) return;
      this.isBusy = true;
      inputPumpkin.removeFromParent();
      const pumpkin = new Pumpkin();
      pumpkin.position.copy(this.position);
      this.scene.add(pumpkin);
      this.material.color.set('red');
    });
  }
}
