import { AnimationAction, AnimationMixer, Group, MeshLambertMaterial, PointLight, PointLightHelper, SkinnedMesh, Vector3 } from 'three';
import { LightUtils } from './utils/lightUtils';
import { GLTFUtils } from './utils/gltfUtils';
import { Bullet } from './bullet';

export class Pumpkin extends Group {
  private _action: AnimationAction;
  private _bulletOffset = new Vector3(-0.5, 0.2, -0.2);

  constructor(private _isInput = false) {
    super();
    this.rotateY(Math.PI / 2);
    this.scale.multiplyScalar(5);
    this.load();
    !_isInput && this.addLight();
    this.interceptByRaycaster = !_isInput;
  }

  private addLight(): void {
    const pointLight = new PointLight('orange', 1, 10, 5);
    LightUtils.applyShadow(pointLight, 32);
    pointLight.position.y = 0.02;
    this.add(pointLight);
  }

  private load(): void {
    GLTFUtils.loadPumpkin().then((obj) => {
      this.add(obj.group);
      this._action = obj.action;

      if (!this._isInput) {
        setInterval(() => this.shoot(), 3000);
        this.on('animate', (e) => {
          obj.mixer.update(e.delta);
        });
      } else {
        // fixare clone
        // const material1 = (this.children[0].children[0] as SkinnedMesh).material as MeshLambertMaterial; // get by name
        // const material2 = (this.children[0].children[1] as SkinnedMesh).material as MeshLambertMaterial;
        // material1.transparent = material2.transparent = true;
        // material1.opacity = material2.opacity = 0.3;
      }
    });
  }

  private shoot(): void {
    this._action.stop();
    this._action.play();
    this.scene.add(new Bullet(this.position.clone().add(this._bulletOffset)));
  }
}

export const inputPumpkin = new Pumpkin(true);
