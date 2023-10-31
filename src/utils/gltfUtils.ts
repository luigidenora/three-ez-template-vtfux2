import { AnimationAction, AnimationClip, AnimationMixer, BufferGeometry, Mesh, MeshLambertMaterial, Object3D, SkinnedMesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

export enum Models { // use only string
  pumpkin = 'https://vercel.com/api/v6/deployments/dpl_C1nPNPzjSGibztgA5BwkFCMsKz6N/files/get?path=models%2Fpumpkin.glb',
  ghost = 'https://vercel.com/api/v6/deployments/dpl_C1nPNPzjSGibztgA5BwkFCMsKz6N/files/get?path=models%2Fghost.glb',
  island = 'https://vercel.com/api/v6/deployments/dpl_C1nPNPzjSGibztgA5BwkFCMsKz6N/files/get?path=models%2Fisland.glb',
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
      const promises = [this.loadModel(Models.pumpkin), this.loadModel(Models.ghost), this.loadModel(Models.island)];
      Promise.all(promises).then(() => resolve());
    });
  }

  private static async loadModel(model: Models): Promise<void> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        model,
        (gltf) => {
          const group = gltf.scene;

          group.traverse((obj) => {
            (obj as Mesh).geometry?.computeBoundingBox();
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
