import { Light, PointLight } from 'three';

export class LightUtils {
    
  public static applyShadow(light: Light, size: number) {
    if (light instanceof PointLight) {
      light.castShadow = true;
      light.shadow.mapSize.width = size;
      light.shadow.mapSize.height = size;
      light.shadow.camera.near = 0.0001;
      light.shadow.camera.far = 1000;
      light.shadow.bias = -0.002;
    }
  }
}
