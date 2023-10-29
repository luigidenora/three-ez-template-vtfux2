import { Main } from '@three.ez/main';
import { Pumpkin } from './pumpkin';
import { Scene } from './scene';

const scene = new Scene();

const pumpkin = new Pumpkin();
scene.add(pumpkin);

const main = new Main();
main.createView({ scene, camera: scene.camera });
