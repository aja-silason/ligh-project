import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';


const scene = new THREE.Scene();
scene.background = new THREE.Color('black');

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(600, 400);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: 'red',
  roughness: 0.3,
  metalness: 0.4,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(3, 3, 3);
scene.add(directionalLight);

const lightTarget = new THREE.Object3D();
lightTarget.position.set(0, 0, 0);
scene.add(lightTarget);
directionalLight.target = lightTarget;

const gui = new GUI();

const lightFolder = gui.addFolder('Iluminação');
const lightPos = { x: 3, y: 3, z: 3 };
lightFolder.add(lightPos, 'x', -5, 5, 0.1).onChange(() => {
  directionalLight.position.x = lightPos.x;
});
lightFolder.add(lightPos, 'y', -5, 5, 0.1).onChange(() => {
  directionalLight.position.y = lightPos.y;
});
lightFolder.add(lightPos, 'z', -5, 5, 0.1).onChange(() => {
  directionalLight.position.z = lightPos.z;
});

const sphereFolder = gui.addFolder('Esfera');
const spherePos = { x: 0, y: 0, z: 0 };
sphereFolder.add(spherePos, 'x', -3, 3, 0.1).onChange(() => {
  sphere.position.x = spherePos.x;
});
sphereFolder.add(spherePos, 'y', -3, 3, 0.1).onChange(() => {
  sphere.position.y = spherePos.y;
});
sphereFolder.add(spherePos, 'z', -3, 3, 0.1).onChange(() => {
  sphere.position.z = spherePos.z;
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
