import { Group, Mesh, MeshBasicMaterial, PointLight, SphereGeometry } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();

export class Island extends Group {
  constructor() {
    super();
    this.interceptByRaycaster = false;
    this.position.y = -1;
    this.scale.multiplyScalar(2);
    this.rotateY(Math.PI);
    this.load();
  }

  private load(): void {
    loader.load('./models/island.glb', (gltf) => {
      const scene = gltf.scene;
      this.add(scene);
      scene.traverse((obj) => {
        obj.receiveShadow = true;
      });
    });
  }
}
