import { Main } from '@three.ez/main';
import { Scene } from './scene';
import { GLTFUtils } from './utils/gltfUtils';
import { AudioUtils } from './utils/audioUtils';
import { Interface } from './interface';

AudioUtils.init();

Interface.init();

GLTFUtils.preload().then(() => {

    
    const scene = new Scene();
    
    const main = new Main();
    main.createView({ scene, camera: scene.camera });
    
    (window as any).main = main;

    // Interface.loaded();
});


// interface.init