import { Group } from 'three';
import { GLTFUtils, Models } from './utils/gltfUtils';

export class Island extends Group {
  constructor() {
    super();
    this.interceptByRaycaster = false;
    this.scale.multiplyScalar(2);
    this.rotateY(Math.PI);
    this.add(GLTFUtils.get(Models.island).group);
  }
}
