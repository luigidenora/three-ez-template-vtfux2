import { AnimationAction, AnimationClip, AnimationMixer, BufferGeometry, Mesh, MeshLambertMaterial, Object3D, SkinnedMesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

export enum Models {
  pumpkin = './models/pumpkin.glb',
  ghost = './models/gost.glb',
}

export interface GLTFAnimations {
  mixer?: AnimationMixer;
  actions?: AnimationAction[];
}

export interface GLTFResult extends GLTFAnimations {
  group: Object3D;
}

export interface GLTFPreloadResult extends GLTFResult {
  animations: AnimationClip[];
  firstUse: boolean;
}

export class GLTFUtils {
  private static loader = new GLTFLoader();
  private static cache: { [x: string]: GLTFPreloadResult } = {};

  public static async preload(): Promise<void> {
    return new Promise((resolve, reject) => {
      const promises = [this.loadModel(Models.pumpkin), this.loadModel(Models.ghost)];
      Promise.all(promises).then(() => resolve());
    });
  }

  private static async loadModel(model: Models): Promise<void> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        model,
        (gltf) => {
          const group = gltf.scene.children[0];

          group.traverse((obj) => {
            obj.castShadow = true;
            obj.receiveShadow = true;
          });

          this.cache[model] = { group, animations: gltf.animations, firstUse: true };
          resolve();
        },
        undefined,
        (e) => reject(e)
      );
    });
  }

  private static loadAnimations(group: Object3D, animations: AnimationClip[]): GLTFAnimations {
    if (animations.length === 0) return {};
    const mixer = new AnimationMixer(group);
    const actions: AnimationAction[] = [];

    for (const animation of animations) {
      const action = mixer.clipAction(animation);
      action.repetitions = 1;
      actions.push(action);
    }

    return { mixer, actions };
  }

  public static get(name: Models, forceClone = false): GLTFResult {
    const result = this.cache[name];
    let group: Object3D;

    if (result.firstUse && !forceClone) {
      group = result.group;
      result.firstUse = false;
    } else {
      group = clone(result.group);
    }

    return { group, ...this.loadAnimations(group, result.animations) };
  }
}
