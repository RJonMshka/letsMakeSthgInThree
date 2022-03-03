

// Scene
const scene = new THREE.Scene();

// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Material
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// mesh
const mesh = new THREE.Mesh(geometry, material);

// adding mesh to the scene
scene.add(mesh);


// Sizes
const sizes = {
    width: 800,
    height: 600
};

// Camera for point of view

// default camera- perspective
// 75 as FOV, second arg as the apsect ratio
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3
scene.add(camera);

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
renderer.render(scene, camera) 

// the position of the camera is in x, y, z
// z is forward-backward axis in 3JS

//