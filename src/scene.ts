import { OrthographicCameraAuto } from '@three.ez/main';
import { AmbientLight, DirectionalLight, Scene as SceneBase, Vector3 } from 'three';
import { Grid } from './grid';

export class Scene extends SceneBase {
  public camera = new OrthographicCameraAuto(25);

  constructor() {
    super();
    const origin = new Vector3();
    const ambientLight = new AmbientLight();
    const directionalLight = new DirectionalLight('white', 10);

    this.add(ambientLight, directionalLight, new Grid());

    this.camera.position.setFromSphericalCoords(40, Math.PI / 3, Math.PI / 4);
    this.camera.lookAt(origin);

    directionalLight.matrixAutoUpdate = false;
    directionalLight.matrix = this.camera.matrix; // the light will always follow the camera, must be done after added to scene.
  }
}
