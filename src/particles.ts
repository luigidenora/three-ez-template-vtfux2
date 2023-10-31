import { InstancedMesh2, InstancedMeshEntity } from '@three.ez/main';
import { ColorRepresentation, DoubleSide, MeshBasicMaterial, PlaneGeometry, Vector3 } from 'three';

const geometry = new PlaneGeometry(0.01, 0.01);

class Particle extends InstancedMeshEntity {
  constructor(parent: InstancedMesh2, index: number, color: ColorRepresentation) {
    super(parent, index, color);
    const angleY = Math.random() * Math.PI * 2;
    const angleX = Math.random() * Math.PI * 2;
    const rotationAxis = new Vector3().randomDirection();

    this.on('animate', (e) => {
      this.position.setFromSphericalCoords(0.1, angleX + e.total, angleY + e.total * 1.2);
      this.position.y += 0.1;
      this.rotateOnWorldAxis(rotationAxis, e.delta);
      this.updateMatrix();
    });
  }
}

export class Particles extends InstancedMesh2 {
  constructor(color: ColorRepresentation) {
    super(geometry, new MeshBasicMaterial({ side: DoubleSide, transparent: true }), 50, Particle, true, color);
    this.interceptByRaycaster = false;
    this.on('animate', (e) => {
      (this.material as MeshBasicMaterial).opacity -= e.delta / 2;
      if ((this.material as MeshBasicMaterial).opacity < 0) {
        this.removeFromParent();
      }
    });
  }
}
