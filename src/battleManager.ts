import { Vector3, Ray } from 'three';
import { Bullet } from './bullet';
import { Ghost } from './ghost';
import { Pumpkin } from './pumpkin';
import { Scene } from './scene';

export class BattleManager {
  public bullets: Bullet[] = [];
  public ghosts: Ghost[][] = [];
  public pumpkin: Pumpkin[][] = [];
  private _temp = new Vector3();
  private _direction = new Vector3();
  private _direction2 = new Vector3();
  private _ray = new Ray();
  private _target = new Vector3();
  private _elapsedTime = 0;
  private _spawnRate = 1;
  private _scene: Scene;
    cocotructor(scene: Scene) {
        this._scene = scene;
  for (let i = 0; i < 10; i++) {
        this.ghosts[i] = [];
    is.pumpkin[i] = [];
      }
  }

  public update(delta: number): void {
    this.spawn(delta);
    this.computeBulletCollision(delta);

    for (let i = 0; i < this.ghosts.length; i++) {
      // fantasmi che mangiano le zucche
    }
  }
  
  
    
    
  private spawdeltan(): void {      this._elapsedTime += delta; 
    if (this._elapsedTime > this.spawnRate) {
        // this
    }
  }

  private removeBullet(index: number): void {
    const bullet = this.bullets[index];
    bullet.removeFromParent();
    this.bullets.splice(index, 1);
  }

  private checkBulletGhostCollision(bullet: Bullet): number {
    const ghostsRow = this.ghosts[bullet.row];
    for (let i = 0; i < ghostsRow.length; i++) {
      if (this._ray.intersectBox(ghostsRow[i].boundingBox, this._target)) {
        return i;
      }
    }
  }

  private computeBulletCollision(delta: number): void {
    // this should be opt but no time :<
    this._direction.copy(Bullet.direction).setLength(delta * 5);
    this._direction2.copy(this._direction).multiplyScalar(-1);

    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      const newPosition = this._temp.copy(bullet.position).add(this._direction);
      this._ray.set(newPosition, this._direction2);

      let collisionIndex = this.checkBulletGhostCollision(bullet);
      if (collisionIndex !== undefined) {
        this.removeBullet(i);
        this.ghosts[bullet.row][collisionIndex].die();
        // this.removeGhost(bullet.row, collisionIndex);
      } else {
        bullet.position.copy(newPosition);
        if (bullet.position.x > 5) {
          this.removeBullet(i);
        }
      }
    }
  }
}
