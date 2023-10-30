import { Main } from '@three.ez/main';
import { Island } from './island';
import { Scene } from './scene';
import { BasicShadowMap } from 'three';
import { Ghost } from './ghost';
import { GLTFUtils } from './utils/gltfUtils';

GLTFUtils.preload().then(() => {
    debugger;
    const scene = new Scene();
    const island = new Island();
    
    scene.add(island);
    const gost = new Ghost();
    gost.position.x += 4
    scene.add(gost);
    
    const main = new Main();
    main.createView({ scene, camera: scene.camera });
    main.renderer.shadowMap.enabled = true;
    main.renderer.shadowMap.type = BasicShadowMap;
    main.renderer.outputColorSpace = 'srgb-linear';
    
    (window as any).main = main;
});
