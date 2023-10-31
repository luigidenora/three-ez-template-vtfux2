import { Main } from '@three.ez/main';
import { Interface } from './interface';
import { Scene } from './scene';
import { AudioUtils } from './utils/audioUtils';
import { GLTFUtils } from './utils/gltfUtils';

AudioUtils.init();

Interface.init();

GLTFUtils.preload().then(() => {
  Interface.loaded();
});

(window as any).start = function (): void {
  const scene = new Scene();
  const main = new Main({ showStats: false, rendererParameters: { antialias: true } });
  const view = main.createView({ scene, camera: scene.camera });

  scene.addEventListener('gameOver', () => {
    view.visible = false;
    Interface.gameOver();
  });
}
