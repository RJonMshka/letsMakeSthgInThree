# letsMakeSthgInThree
A Three.js journey: I don't know where it will take me but lets venture out in the wild


# cameras
camera: abstract class - cant use directly

other cameras inherit from others
array camera: render the scene from multiple cameras on specific areas of the render - its for different split screen for old video games (multiplayer)

StereoCamera: Two renders - mimic the eyes - depth effect for maybe VR devices

CubeCamera: 6 renders: t, b, l, r, f, b - for different directions - for environment map, reflection or shadow map

OrthographicCamera: render without perspective - perfect for rts games 

PerspectiveCamera: most common for 3d scenes

## PerspectiveCamera
first param: vertical vision angle (b/w 45 and 75)
second param: aspect ratio - (width of render / height of render) - it might change in very specific requirements
3rd: near (go with 0.1 or 1)
4th: far (100 or 1000 is fine)

object beyond near and far wont show up on screen

using extreme values of near and far would result in a glitch called z-fighting - object overlapping - GPU gets confused

## OrthographicCamera
difference with perspectivecamera is lack of perspective
params: left, right, top, bottom, near, far

render will stretch the object as per aspect ratio

## Control camera with mouse
we can use perspective camera for that

## built in controls

### DeviceOrientationControls
Mostly for smartphone movement, useful for VR experiences 
But iOS stopped using deviceOrientation 


# Full screen and resize:
removing margin and padding from body makes the canvas cover whole screen

more than 2 pixel ratio is just marketing gimmick

window.devicePixelRatio





