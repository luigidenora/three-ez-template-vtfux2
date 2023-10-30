import { AnimationAction, Group, MeshPhysicalMaterial, SkinnedMesh, Vector3 } from 'three';
import { Bullet } from './bullet';
import { GLTFUtils, Models } from './utils/gltfUtils';

export class Pumpkin extends Group {
  private _action: AnimationAction;
  private _bulletOffset = new Vector3(-0.5, 0.2, -0.2);

  constructor(private _isInput = false) {
    super();
    this.rotateY(Math.PI / 2);
    this.scale.multiplyScalar(5);
    this.load();
    this.interceptByRaycaster = !_isInput;
  }

  private load(): void {
    const result = GLTFUtils.get(Models.pumpkin, true);
    this.add(result.group);
    this._action = result.actions[2];

    if (!this._isInput) {
      setInterval(() => this.shoot(), 3000);
      this.on('animate', (e) => {
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
    this._action.stop();
    this._action.play();
    this.scene.add(new Bullet(this.position.clone().add(this._bulletOffset)));
  }
}
