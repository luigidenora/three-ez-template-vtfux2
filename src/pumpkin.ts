import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();

export class Pumpkin extends Group {
  constructor() {
    super();
    this.scale.multiplyScalar(5);
    this.rotation.y = Math.PI / 2;
    this.load();
  }

  private load(): void {
    loader.load('./models/pumpkin.glb', (gltf) => {
      this.add(gltf.scene.children[0]);
    });
  }
}
