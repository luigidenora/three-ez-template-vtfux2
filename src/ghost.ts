import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFUtils } from './utils/gltfUtils';

const loader = new GLTFLoader();

export class Ghost extends Mesh {
  constructor() {
    super();
    this.scale.multiplyScalar(5);
    this.load();
  }

  private load(): void {
    GLTFUtils.load('./models/gost.glb').then((obj) => {
      this.add(obj.group);
      this.geometry.computeBoundingBox(); // cache it
      // this._action = obj.action;

      // this.on('animate', (e) => {
      //   if (this.enabled) obj.mixer.update(e.delta);
      // });
    });
  }
}
