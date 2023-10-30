import { AnimationAction, Box3, Euler, Group, MeshPhysicalMaterial, SkinnedMesh, Vector3, Audio } from 'three';
import { Bullet } from './bullet';
import { GLTFUtils, Models } from './utils/gltfUtils';
import { Tile } from './tile';
import { Scene } from './scene';
import { AudioUtils } from './utils/audioUtils';

export class Pumpkin extends Group {
  declare scene: Scene;
  public boundingBox = new Box3();
  public spitSound: Audio;
  public punchSound: Audio;
  public spawnSound: Audio;
  private _shootAction: AnimationAction;
  private _bulletOffset = new Vector3(-0.5, 0.2, -0.2);
  private _shootDelay = 2;
  private _elapsedTime = 0;
  private _isDead = false;

  constructor(private _isInput = false, private _tile?: Tile) {
    super();
    this.rotateY(Math.PI / 2);
    this.scale.multiplyScalar(5);
    this.load();
    this.spitSound = new Audio(AudioUtils.audioListener).setBuffer(AudioUtils.spitSoundBuffer);
    this.punchSound = new Audio(AudioUtils.audioListener).setBuffer(AudioUtils.punchSoundBuffer);
    this.spawnSound = new Audio(AudioUtils.audioListener).setBuffer(AudioUtils.spawnSoundBuffer);
    this.spitSound.setVolume(0.8);
    this.punchSound.setVolume(0.2);
    this.spawnSound.setVolume(0.5);
    this.spawnSound.play();
    this.interceptByRaycaster = false;
  }

  private load(): void {
    const result = GLTFUtils.get(Models.pumpkin, true);
    this.add(result.group.children[0]);
    this._shootAction = result.actions[2];
    this._shootAction.repetitions = 1;

    if (!this._isInput) {
      this.on('animate', (e) => {
        this._elapsedTime += e.delta;
        if (this._elapsedTime > this._shootDelay) {
          this.shoot();
          this._elapsedTime -= this._shootDelay;
        }
        result.mixer.update(e.delta);
      });
    } else {
      const material1 = ((this.children[0].children[0] as SkinnedMesh).material as MeshPhysicalMaterial).clone();
      const material2 = ((this.children[0].children[1] as SkinnedMesh).material as MeshPhysicalMaterial).clone();
      (this.children[0].children[0] as SkinnedMesh).material = material1;
      (this.children[0].children[1] as SkinnedMesh).material = material2;
      material1.transparent = material2.transparent = true;
      material1.opacity = material2.opacity = 0.3;
    }
  }

  private shoot(): void {
    this._shootAction.stop();
    this._shootAction.play();
    this.spitSound.play();
    this.scene.shoot(this.position.clone().add(this._bulletOffset), this._tile.row);
  }

  public setMaterialVisibility(value: boolean): void {
    const material1 = (this.children[0].children[0] as SkinnedMesh).material as MeshPhysicalMaterial;
    const material2 = (this.children[0].children[1] as SkinnedMesh).material as MeshPhysicalMaterial;
    material1.opacity = material2.opacity = value ? 0.3 : 0;
  }

  public die(): void {
    this.punchSound.play();
    this._isDead = true;
    this.tween()
      .by(1000, { rotation: new Euler(0, Math.PI * 4, 0), scale: -5 }, { easing: 'easeInBack' })
      .call(() => {
        this.removeFromParent();
        this._tile.isBusy = false;
      })
      .start();
  }
}
