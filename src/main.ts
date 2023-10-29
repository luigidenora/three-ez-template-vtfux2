import { Main } from '@three.ez/main';
import { Pumpkin } from './pumpkin';
import { Island } from './island';
import { Scene } from './scene';
import { BasicShadowMap } from 'three';

const scene = new Scene();
const island = new Island();

scene.add(island);
const pumpkin = new Pumpkin();
scene.add(pumpkin);

const main = new Main();
main.renderer.shadowMap.enabled = true;
main.renderer.shadowMap.type = BasicShadowMap;
main.createView({ scene, camera: scene.camera });

window.main = main;