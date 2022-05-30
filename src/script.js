import './style.css'
import * as THREE from "three";
import { AxesHelper } from 'three';
import gsap from 'gsap';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0
};
window.addEventListener('mousemove', event => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = - (event.clientY / sizes.height - 0.5);
});

// Scene
const scene = new THREE.Scene();

// Red cube
//const geometry = new THREE.BoxGeometry(1, 1, 1);

// making our own geometry
const geometry = new THREE.BufferGeometry();

// float32array which can be handled easily by behind the javascript code - computer
const triangleCount = 500;
const verticesPerTraingle = 3;
const dataLengthPerVertex = 3;
const positionsArray = new Float32Array(triangleCount * verticesPerTraingle * dataLengthPerVertex);

for(let i = 0; i < triangleCount * verticesPerTraingle * dataLengthPerVertex; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 2;
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, dataLengthPerVertex);
geometry.setAttribute('position', positionsAttribute);

// Material
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
// mesh
const mesh = new THREE.Mesh(geometry, material);

// positioning
mesh.position.set(0, 0, 0);

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
// mesh.scale.set(1, 1, 1);


// Rotating - can be done with rotation or quaternion
// to avoid gimbal locks - use reorder method - do it before changing the rotation
// mesh.rotation.reorder("YXZ");
// rotation - type Euler  - in radians
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.y = Math.PI * 0.25;

// to avoid issues with rotation we use quaternion
// it represents rotation in more mathematical way
// most softwares and 3d engines use it


// create a group
// const group = new THREE.Group();
// scene.add(group);

// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
// );

// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial( { color: 0x0000ff } )
// );

// cube2.position.x = 2

// group.add(cube1);
// group.add(cube2);


// Axes helper - takes unit, default = 1
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const apsectRatio = sizes.width / sizes.height;


// Camera for point of view

// default camera- perspective
// 75 as FOV, second arg as the apsect ratio
const camera = new THREE.PerspectiveCamera(100, apsectRatio, 0.1, 100);

// Orthographic camera
// const camera = new THREE.OrthographicCamera(
//     -1 * apsectRatio,
//      1 * apsectRatio,
//     1,
//     -1, 
//     0.1, 
//     100
// );

window.addEventListener('resize', () => {
    console.log("hi");
    // update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight

    // update camera's aspect ratio
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // update renderer - updating the canvas
    renderer.setSize(sizes.width, sizes.height);

    // for multiple screen per computer
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('dblclick', () => {
    const fullScreenElement = document.fullscreenElement || document.webkitFullScreenElement;

    if (!fullScreenElement) {
        if(canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if(canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    } else {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.webkitExitFullScreen) {
            document.webkitExitFullScreen();
        }
    }
});




// defining a renderer
// Canvas DOM element
const canvas = document.querySelector(".webgl");

camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
// controls.enabled = false;
controls.enableDamping = true;
// controls.target.y = 2;
controls.update();

// look at this - no need for complex calculations 
camera.lookAt(mesh.position);

// distance between mesh and camera
// mesh.position.distanceTo(camera.position)



// there are also, SVGRenderer, CSS Renderer to work with in Three.js
const renderer = new THREE.WebGLRenderer({
    canvas
});

// resize the renderer
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// first render
renderer.render(scene, camera);

// the position of the camera is in x, y, z
// z is forward-backward axis in 3JS

// Clock
const clock = new THREE.Clock();

// gsap.to(mesh.position, {
//     x: 2,
//     duration: 1,
//     delay: 1
// })

// Animations
const tick = () => {

    // Clock
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    // mesh.rotation.x = Math.sin(elapsedTime);
    // mesh.rotation.z = Math.cos(elapsedTime);
    // camera.lookAt(mesh.position);

    // update the camera on cursor
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = cursor.y * 5;
    // camera.lookAt(mesh.position);
    controls.update();

    // Render
    renderer.render(scene, camera);
    
    window.requestAnimationFrame(tick);
};

tick();
