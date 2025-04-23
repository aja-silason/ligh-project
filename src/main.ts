const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const width = canvas.width;
const height = canvas.height;

// Vetor utilitário
class Vec3 {
  constructor(public x: number, public y: number, public z: number) {}

  add(v: Vec3) {
    return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  sub(v: Vec3) {
    return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  mul(t: number) {
    return new Vec3(this.x * t, this.y * t, this.z * t);
  }

  dot(v: Vec3) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  normalize() {
    const len = Math.sqrt(this.dot(this));
    return this.mul(1 / len);
  }
}

// Esfera e luz
const sphereCenter = new Vec3(0, 0, -1);
const sphereRadius = 0.5;
const lightDir = new Vec3(1, 1, -1).normalize();

function rayColor(rayOrigin: Vec3, rayDir: Vec3): [number, number, number] {
  const oc = rayOrigin.sub(sphereCenter);
  const a = rayDir.dot(rayDir);
  const b = 2.0 * oc.dot(rayDir);
  const c = oc.dot(oc) - sphereRadius * sphereRadius;
  const discriminant = b * b - 4 * a * c;

  if (discriminant > 0) {
    const t = (-b - Math.sqrt(discriminant)) / (2.0 * a);
    const hitPoint = rayOrigin.add(rayDir.mul(t));
    const normal = hitPoint.sub(sphereCenter).normalize();
    const lightIntensity = Math.max(0, normal.dot(lightDir));
    const color = 255 * lightIntensity;
    return [color, color, color];
  }

  return [30, 30, 30]; // Cor de fundo (sombra)
}

function render() {
  const imageData = ctx.createImageData(width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const u = (x / width) * 2 - 1;
      const v = (y / height) * 2 - 1;
      const rayOrigin = new Vec3(0, 0, 0);
      const rayDir = new Vec3(u, -v, -1).normalize();
      const [r, g, b] = rayColor(rayOrigin, rayDir);

      const index = (y * width + x) * 4;
      imageData.data[index] = r;
      imageData.data[index + 1] = g;
      imageData.data[index + 2] = b;
      imageData.data[index + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

render();
