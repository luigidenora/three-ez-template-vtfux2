import { Group, Mesh, MeshBasicMaterial, PointLight, SphereGeometry } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FoliageMaterial } from './materials/foliage-material';

const loader = new GLTFLoader();

export class Island extends Group {
  public innerLight = new PointLight('blue', 0, 10, 5);

  constructor() {
    super();
    this.interceptByRaycaster = false;
    this.scale.multiplyScalar(2);
    this.rotateY(Math.PI);
    this.load();

    this.add(this.innerLight);
  }

  private load(): void {
    loader.load('./models/island-alberi.glb', (gltf) => {
      const scene = gltf.scene;
      this.add(scene);
      scene.traverse((obj) => {
        obj.receiveShadow = true;
        if (obj instanceof Mesh) {
          if (obj.name.includes('Foliage')) {
            obj.material = new FoliageMaterial(/* this.sunLight.position */);
          }
        }
      });
    });
  }
}
