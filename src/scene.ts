import { OrthographicCameraAuto } from '@three.ez/main';
import { AmbientLight, DirectionalLight, PointLight, PointLightHelper, Scene as SceneBase, SpotLight, Vector3 } from 'three';
import { Grid } from './grid';
import { Island } from './island';
import { Ghost } from './ghost';
import { Pumpkin } from './pumpkin';
import { BattleManager } from './battleManager';
import { Bullet } from './bullet';
import { Tile } from './tile';

export class Scene extends SceneBase {
  public camera = new OrthographicCameraAuto(25);
  public battleManager = new BattleManager(this);
  public grid = new Grid();

  constructor() {
    super();
    const origin = new Vector3();
    const ambientLight = new AmbientLight(0x0A009E, 0.1);
    const spotLight = new SpotLight(0xa41ec9, 50, 100, Math.PI, 1);
    spotLight.translateY(3);
    const pointLight1 = new PointLight(0x0A009E, 100, 200);
    pointLight1.translateY(5).translateZ(3);
    const pointLight2 = new PointLight(0x0A009E, 100, 200);
    pointLight2.translateY(5).translateZ(-3);
    const pointLight3 = new PointLight(0x0A009E, 100, 200);
    pointLight3.translateY(5).translateZ(-3).translateX(3);

    this.add(ambientLight, spotLight, pointLight1, pointLight2, pointLight3, this.grid, new Island());
    
    // this.camera.add(this.audioListener);
    this.camera.position.setFromSphericalCoords(40, Math.PI / 3, Math.PI / 4);
    this.camera.lookAt(origin);

    this.grid.tiles[5][0].trigger('click'); // spawn pumpkin
    this.addGhost(5);

    this.on('afteranimate', (e) => {
      this.battleManager.update(e.delta);
    });

  }

  public addPumpkin(tile: Tile): void {
    const pumpkin = new Pumpkin(false, tile);
    pumpkin.position.copy(tile.position);
    this.add(pumpkin);
    pumpkin.boundingBox.setFromObject(pumpkin);
    this.battleManager.pumpkin[tile.row].push(pumpkin);
  }

  public addGhost(row: number): void {
    const ghost = new Ghost(row, 2);
    this.add(ghost);
    this.battleManager.ghosts[row].push(ghost);
  }

  public shoot(origin: Vector3, row: number): void {
    // this.spitSound.play();
    const bullet = new Bullet(origin, row);
    this.add(bullet);
    this.battleManager.bullets.push(bullet);
  }
}
