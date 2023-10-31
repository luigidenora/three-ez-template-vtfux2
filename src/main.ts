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
    const view = main.createView({ scene, camera: scene.camera });
    
    scene.addEventListener('gameOver', (event: any) => {
        view.visible = false;
        console.log(event.win);
    });
});


// interface.init