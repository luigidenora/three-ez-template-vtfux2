import { OrthographicCameraAuto } from '@three.ez/main';
import { AmbientLight, Color, DirectionalLight, DirectionalLightHelper, Fog, Object3D, PointLight, PointLightHelper, Scene as SceneBase, SpotLight, Vector3 } from 'three';
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
  public island = new Island();

  constructor() {
    super();

    const origin = new Vector3();

    this.background = new Color(0x092409);
    const ambientLight = new AmbientLight('white', 1.5);
    const dirLight = new DirectionalLight(0x0e23ff, 10);
    const dirLight2 = new DirectionalLight(0xffb6a9, 10);
    dirLight.position.setFromSphericalCoords(100, Math.PI / 3, 0);
    dirLight2.position.setFromSphericalCoords(100, Math.PI / 3, Math.PI / 2);

    this.add(ambientLight, dirLight, dirLight2, this.grid, this.island);

    this.camera.position.setFromSphericalCoords(40, Math.PI / 3, Math.PI / 4);
    this.camera.lookAt(origin);

    this.grid.tiles[5][0].trigger('click'); // spawn pumpkin
    this.addGhost(5, 1);

    this.on('afteranimate', (e) => {
      this.battleManager.update(e.delta);
    });
  }

  public addPumpkin(tile: Tile): Pumpkin {
    const pumpkin = new Pumpkin(false, tile);
    pumpkin.position.copy(tile.position);
    this.add(pumpkin);
    pumpkin.boundingBox.setFromObject(pumpkin);
    this.battleManager.pumpkin[tile.row].push(pumpkin);
    return pumpkin;
  }

  public addGhost(row: number, health: number): void {
    const ghost = new Ghost(row, health);
    this.add(ghost);
    this.battleManager.ghosts[row].push(ghost);
  }

  public shoot(origin: Vector3, row: number, scale: number): void {
    const bullet = new Bullet(origin, row, scale);
    this.add(bullet);
    this.battleManager.bullets.push(bullet);
  }

  public gameOver(): void {
    this.dispatchEvent<any>({ type: 'gameOver' });
  }
}
