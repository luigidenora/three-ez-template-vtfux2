import { AnimationAction, Audio, Box3, Color, Euler, Group, MeshPhysicalMaterial, SkinnedMesh, Vector3 } from 'three';
import { Interface } from './interface';
import { Particles } from './particles';
import { Scene } from './scene';
import { Tile } from './tile';
import { AudioUtils } from './utils/audioUtils';
import { GLTFUtils, Models } from './utils/gltfUtils';

export class Pumpkin extends Group {
  declare scene: Scene;
  public boundingBox = new Box3();
  public spitSound: Audio;
  public punchSound: Audio;
  public spawnSound: Audio;
  private _shootAction: AnimationAction;
  private _bulletOffset = new Vector3(-0.5, 0.2, -0.2).divideScalar(5);
  private _shootDelay = 2;
  private _elapsedTime = 0;
  private _isDead = false;
  private _temp = new Vector3();

  constructor(private _isInput = false, private _tile?: Tile) {
    super();
    this.rotateY(Math.PI / 2);
    this.scale.multiplyScalar(2.5);
    this.load();
    this.spitSound = new Audio(AudioUtils.audioListener).setBuffer(AudioUtils.spitSoundBuffer);
    this.punchSound = new Audio(AudioUtils.audioListener).setBuffer(AudioUtils.punchSoundBuffer);
    this.spawnSound = new Audio(AudioUtils.audioListener).setBuffer(AudioUtils.spawnSoundBuffer);
    this.spitSound.setVolume(0.3);
    this.punchSound.setVolume(0.1);
    this.spawnSound.setVolume(0.25);
    this.spawnSound.play();
    this.interceptByRaycaster = !_isInput;
  }

  private load(): void {
    const result = GLTFUtils.get(Models.pumpkin, true);
    this.add(result.group.children[0]);
    this._shootAction = result.actions[2];
    this._shootAction.repetitions = 1;

    if (!this._isInput) {
      this.on('animate', (e) => {
        if (this._isDead) return;
        this._elapsedTime += e.delta;
        if (this._elapsedTime > this._shootDelay) {
          this.shoot();
          this._elapsedTime -= this._shootDelay;
        }
        result.mixer.update(e.delta);
      });

      this.on('click', () => {
        if (this._isDead) return;
        this.powerUp();
      });
    } else {
      const material1 = ((this.children[0].children[0] as SkinnedMesh).material as MeshPhysicalMaterial).clone();
      const material2 = ((this.children[0].children[1].children[0] as SkinnedMesh).material as MeshPhysicalMaterial).clone();
      const material3 = ((this.children[0].children[1].children[1] as SkinnedMesh).material as MeshPhysicalMaterial).clone();
      (this.children[0].children[0] as SkinnedMesh).material = material1;
      (this.children[0].children[1].children[0] as SkinnedMesh).material = material2;
      (this.children[0].children[1].children[1] as SkinnedMesh).material = material3;
      material1.transparent = material2.transparent = material3.transparent = true;
      material1.opacity = material2.opacity = material3.opacity = 0.3;

      this.on('animate', () => {
        const color = this.scene.battleManager.money === 0 ? 'red' : 'black';
        material1.emissive.set(color);
        material2.emissive.set(color);
        material3.emissive.set(color);
      });
    }
  }

  private shoot(): void {
    this._shootAction.stop();
    this._shootAction.play();
    this.spitSound.play();
    const bulletOffset = this._temp.copy(this._bulletOffset).multiplyScalar(this.scale.x);
    this.scene.shoot(this.position.clone().add(bulletOffset), this._tile.row);
  }

  public setMaterialVisibility(value: boolean): void {
    const material1 = (this.children[0].children[0] as SkinnedMesh).material as MeshPhysicalMaterial;
    const material2 = (this.children[0].children[1].children[0] as SkinnedMesh).material as MeshPhysicalMaterial;
    const material3 = (this.children[0].children[1].children[1] as SkinnedMesh).material as MeshPhysicalMaterial;
    material1.opacity = material2.opacity = material3.opacity = value ? 0.3 : 0;
  }

  public die(): void {
    this.punchSound.play();
    this._isDead = true;
    this.tween()
      .by(1000, { rotation: new Euler(0, Math.PI * 4, 0), scale: -5 }, { easing: 'easeInBack' })
      .call(() => {
        this.removeFromParent();
        this._tile.isBusy = false;
        this._tile.pumpkin = undefined;
        this._tile.cursor = 'pointer';
      })
      .start();
  }

  public powerUp(): boolean {
    if (this.scene.battleManager.money > 0 && this._shootDelay > 0.25) {
      this.scene.battleManager.money--;
      Interface.setMoney(this.scene.battleManager.money);
      this._shootDelay = Math.max(0.25, this._shootDelay - 0.25);
      this.changeScale(2.5 + (2 - this._shootDelay + 0.25) * 2);
      if (this._shootDelay === 0.25) {
        this.children[0].children[0].cursor = 'not-allowed';
        this.children[0].children[1].children[0].cursor = 'not-allowed';
        this.children[0].children[1].children[1].cursor = 'not-allowed';
        this._tile.cursor = 'not-allowed';
      }
      const red = this._shootDelay / 1.5;
      this.add(new Particles(new Color(red, 1 - red, 1 - red)));
      return true;
    }
  }

  public changeScale(value: number): void {
    this.tween('scale').to(200, { scale: value }, { easing: 'linear' }).start();
  }
}
