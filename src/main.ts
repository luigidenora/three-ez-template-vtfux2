import { Main } from '@three.ez/main';
import { Scene } from './scene';
import { GLTFUtils } from './utils/gltfUtils';

GLTFUtils.preload().then(() => {
    const scene = new Scene();

    const main = new Main();
    main.createView({ scene, camera: scene.camera });
    // main.renderer.shadowMap.enabled = true;
    // main.renderer.shadowMap.type = PCFSoftShadowMap;
    // main.renderer.outputColorSpace = 'srgb-linear';
    
    (window as any).main = main;
});
