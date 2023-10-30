import { Main } from '@three.ez/main';
import { Scene } from './scene';
import { GLTFUtils } from './utils/gltfUtils';
import { AudioUtils } from './utils/audioUtils';

AudioUtils.init();

GLTFUtils.preload().then(() => {
    const scene = new Scene();

    const main = new Main();
    main.createView({ scene, camera: scene.camera });
    
    (window as any).main = main;
});


// interface.init