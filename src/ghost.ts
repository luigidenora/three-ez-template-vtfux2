import { Euler, Mesh, Box3, Audio } from 'three';
import { GLTFUtils, Models } from './utils/gltfUtils';
import { AudioUtils } from './utils/audioUtils';
import { Scene } from './scene';

export class Ghost extends Mesh {
  declare scene: Scene
  public boundingBox = new Box3();
  public isDead = false;
  public hitSound: Audio;
  public startScale: number;

  constructor(public row: number, public health: number) {
    super();
    this.hitSound = new Audio(AudioUtils.audioListener).setBuffer(AudioUtils.hitSoundBuffer);
    this.hitSound.setVolume(0.1);
    this.interceptByRaycaster = false;
    this.startScale = 2.5 + health * 0.3;
    this.scale.multiplyScalar(this.startScale);
    this.load();
    this.translateX(8);
    this.translateZ(0.5 + row - 5);
  }

  private load(): void {
    const obj = GLTFUtils.get(Models.ghost, true);
    this.add(obj.group.children[0]);
    obj.actions[0].play();

    this.on('animate', (e) => {
      obj.mixer.update(e.delta);
      !this.isDead && this.translateX(-e.delta);
      if (this.position.x < -5) this.scene.gameOver();
      this.boundingBox.setFromObject(this);
    });
  }

  public die(): void {
    this.isDead = true;
    this.tween()
      .by(1000, { rotation: new Euler(0, Math.PI * 4, 0), scale: -this.startScale }, { easing: 'easeInBack' })
      .call(() => {
        this.removeFromParent();
      })
      .start();
  }
}
