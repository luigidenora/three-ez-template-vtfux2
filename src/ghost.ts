import { Euler, Mesh, Box3, Audio } from 'three';
import { GLTFUtils, Models } from './utils/gltfUtils';
import { AudioUtils } from './utils/audioUtils';

export class Ghost extends Mesh {
  public boundingBox = new Box3();
  public isDead = false;
  public hitSound: Audio;

  constructor(public row: number, public life: number) {
    super();
    this.hitSound = new Audio(AudioUtils.audioListener).setBuffer(AudioUtils.spitSoundBuffer);
    this.interceptByRaycaster = false;
    this.scale.multiplyScalar(5);
    this.load();
    this.translateX(5);
    this.translateZ(0.5 + row - 5);
  }

  private load(): void {
    const obj = GLTFUtils.get(Models.ghost, true);
    this.add(obj.group.children[0]);
    obj.actions[0].play();

    this.on('animate', (e) => {
      obj.mixer.update(e.delta);
      !this.isDead && this.translateX(-e.delta);
      this.boundingBox.setFromObject(this);
    });
  }

  public die(): void {
    this.isDead = true;
    this.tween()
      .by(1000, { rotation: new Euler(0, Math.PI * 4, 0), scale: -5 }, { easing: 'easeInBack' })
      .call(() => {
        this.removeFromParent();
      })
      .start();
  }
}

// vittoria
// miglioramenti
