import { AnimationAction, AnimationClip, AnimationMixer, BufferGeometry, Mesh, MeshLambertMaterial, Object3D, SkinnedMesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

export interface Model {
  group: Object3D;
  mixer?: AnimationMixer;
  action?: AnimationAction;
  animations?: AnimationClip[];
}

export class GLTFUtils {
  private static loader = new GLTFLoader();
  private static pumpkin: Model; //salvarer geometrie e materiali

  public static async loadPumpkin(): Promise<Model> {
    return new Promise((resolve, reject) => {
      if (!this.pumpkin) {
        this.loader.load(
          './models/pumpkin.glb',
          (gltf) => {
            const group = gltf.scene.children[0];

            group.traverse((obj) => {
              obj.castShadow = true;
              obj.receiveShadow = true;
            });

            const mixer = new AnimationMixer(group);
            const action = mixer.clipAction(gltf.animations[2]);
            action.repetitions = 1;

            this.pumpkin = { group, mixer, action, animations: gltf.animations };
            resolve({ group, mixer, action });
          },
          undefined,
          (e) => reject(e)
        );
      } else {
        const group = clone(this.pumpkin.group);
        const mixer = new AnimationMixer(group);
        const action = mixer.clipAction(this.pumpkin.animations[2]);
        action.repetitions = 1;
        resolve({ group, mixer, action });
      }
    });
  }

  public static async load(path: string, actionIndex?: number): Promise<Model> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        path,
        (gltf) => {
          const group = gltf.scene.children[0] as Object3D;

          group.traverse((obj) => {
            obj.castShadow = true;
            obj.receiveShadow = true;
          });

          if (gltf.animations.length === 0) return resolve({ group });

          const mixer = new AnimationMixer(group);
          const action = mixer.clipAction(gltf.animations[actionIndex]);
          action.repetitions = 1;

          resolve({ group, mixer, action });
        },
        undefined,
        (e) => reject(e)
      );
    });
  }
}
