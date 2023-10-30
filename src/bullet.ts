import { Mesh, MeshLambertMaterial, SphereGeometry, Vector3 } from 'three';

export class Bullet extends Mesh {
  private direction = new Vector3(1, 0, 0);

  constructor(origin: Vector3) {
    super(new SphereGeometry(0.1), new MeshLambertMaterial({ color: 'orange' }));
    this.position.copy(origin);

    this.on('animate', (e) => {
        this.position.add(this.direction.setLength(e.delta * 5));
    });
  }
}
