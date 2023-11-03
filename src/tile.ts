import { Mesh, MeshLambertMaterial, PlaneGeometry } from 'three';
import { Grid } from './grid';
import { Interface } from './interface';
import { Pumpkin } from './pumpkin';
import { Scene } from './scene';

export class Tile extends Mesh<PlaneGeometry, MeshLambertMaterial> {
  declare parent: Grid;
  declare scene: Scene;
  public isBusy = false;
  public pumpkin: Pumpkin;

  constructor(public row: number, public col: number) {
    super(new PlaneGeometry(1, 1), new MeshLambertMaterial({ transparent: true, opacity: 0.2, color: 0x2d1720 }));
    this.position.set(col - 5 + 0.5, 0, row - 5 + 0.5);
    this.rotateX(Math.PI / -2);
    this.cursor = 'cell';

    this.on('pointerenter', (e) => {
      if (this.isBusy) {
        this.material.color.set('red');
      } else {
        this.material.color.set('yellow');
        this.parent.inputPumpkin.position.copy(this.position);
        this.parent.inputPumpkin.setMaterialVisibility(true);
      }
    });

    this.on('pointerleave', (e) => {
      this.material.color.set(0x2d1720);
      this.parent.inputPumpkin.setMaterialVisibility(false);
    });

    this.on('click', (e) => {
      if (this.isBusy) {
        this.pumpkin.powerUp();
      } else if (this.scene.battleManager.money > 0) {
        this.scene.battleManager.money--;
        Interface.setMoney(this.scene.battleManager.money);
        this.isBusy = true;
        this.material.color.set('red');
        this.pumpkin = this.scene.addPumpkin(this);
        this.parent.inputPumpkin.setMaterialVisibility(false);
        this.cursor = 'pointer';
      }
    });
  }
}
