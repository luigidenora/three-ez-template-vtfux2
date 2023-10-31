import { Mesh, MeshLambertMaterial, SphereGeometry, Vector3 } from 'three';

const geometry = new SphereGeometry(0.1);
const material = new MeshLambertMaterial({ color: 'yellow' });

export class Bullet extends Mesh {
  public static direction = new Vector3(1, 0, 0);

  constructor(origin: Vector3, public row: number) {
    super(geometry, material);
    this.position.copy(origin);
  }
}
