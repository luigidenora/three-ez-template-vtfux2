import { AnimationMixer, DoubleSide, Group, Mesh, MeshBasicMaterial, PointLight, SkinnedMesh, SphereGeometry } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();

export class Pumpkin extends Group {
  public innerLight = new PointLight('orange', 0, 10, 5);
  private _mixer: AnimationMixer;
  private helper = new Mesh(new SphereGeometry(0.01), new MeshBasicMaterial());

  constructor() {
    super();
    this.rotation.y = Math.PI / 2;
    this.scale.multiplyScalar(5);
    this.load();

    this.add(this.innerLight);
    this.innerLight.castShadow = true;

    this.innerLight.shadow.mapSize.width = 1024;
    this.innerLight.shadow.mapSize.height = 1024;
    this.innerLight.shadow.camera.near = 0.1;
    this.innerLight.shadow.camera.far = 1000;

    this.innerLight.shadow.bias = -0.005;

    this.helper.position.copy(this.innerLight.position);
    this.add(this.helper);

    this.on('animate', (e) => {
      this._mixer?.update(e.delta);
      this.innerLight.position.y = 0.1 + Math.sin(e.total * 15) * 0.005;
      this.innerLight.position.x = Math.cos(e.total * 15) * 0.005;
      this.innerLight.intensity = Math.abs(Math.sin(e.total * 2) * 45);
    });
  }

  private load(): void {
    loader.load('./models/pumpkin.glb', (gltf) => {
      const model = gltf.scene.children[0];
      this.add(model);
      
      (model.children[0] as SkinnedMesh).material = new MeshBasicMaterial({color: 'green'});

      model.traverse((obj) => {
        obj.draggable = true;
        obj.dragTarget = this;
        obj.castShadow = true;
        obj.receiveShadow = false;
      });

      const animations = gltf.animations;
      this._mixer = new AnimationMixer(model);
      const sputoAction = this._mixer.clipAction(animations[2]);
      sputoAction.repetitions = 1;
      sputoAction.play();
    });
  }
}
