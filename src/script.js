import './style.css'
import * as THREE from "three";
import { AxesHelper } from 'three';



// Scene
const scene = new THREE.Scene();

// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Material
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// mesh
const mesh = new THREE.Mesh(geometry, material);

// positioning
mesh.position.set(0.7, -0.6, 1);

// adding mesh to the scene
scene.add(mesh);

// take the length and reduce it to 1
// mesh.position.normalize();

// will return 1 now
// console.log(mesh.position.length());


// Scale
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5
//  or
mesh.scale.set(2, 0.5, 0.5);


// Rotating - can be done with rotation or quaternion
// to avoid gimbal locks - use reorder method - do it before changing the rotation
mesh.rotation.reorder("YXZ");
// rotation - type Euler  - in radians
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;

// to avoid issues with rotation we use quaternion
// it represents rotation in more mathematical way
// most softwares and 3d engines use it


// create a group
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial( { color: 0x0000ff } )
);

cube2.position.x = 2

group.add(cube1);
group.add(cube2);


// Axes helper - takes unit, default = 1
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Sizes
const sizes = {
    width: 800,
    height: 600
};

// Camera for point of view

// default camera- perspective
// 75 as FOV, second arg as the apsect ratio
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// look at this - no need for complex calculations 
camera.lookAt(mesh.position);

// distance between mesh and camera
// mesh.position.distanceTo(camera.position)

// defining a renderer
// Canvas DOM element
const canvas = document.querySelector(".webgl");

// there are also, SVGRenderer, CSS Renderer to work with in Three.js
const renderer = new THREE.WebGLRenderer({
    canvas
});

// resize the renderer
renderer.setSize(sizes.width, sizes.height);

// first render
renderer.render(scene, camera) ;

// the position of the camera is in x, y, z
// z is forward-backward axis in 3JS
