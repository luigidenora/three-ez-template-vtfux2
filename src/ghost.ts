import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFUtils, Models } from './utils/gltfUtils';

const loader = new GLTFLoader();

export class Ghost extends Mesh {
  constructor() {
    super();
    this.scale.multiplyScalar(5);
    this.load();
  }

  private load(): void {
    const obj = GLTFUtils.get(Models.ghost);
    this.add(obj.group);
    !this.geometry.boundingBox && this.geometry.computeBoundingBox();
    obj.actions[0].play();

    this.on('animate', (e) => {
      if (this.enabled) obj.mixer.update(e.delta);
      this.translateX(-e.delta);
    });
  }
}

// mettere ombre
// fix trasparenza e add se già presente
// collisioni
// spawn
// miglioramenti
// kill delle zucche
