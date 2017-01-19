var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();


var geometry = new PIXI.mesh.Geometry()
.addAttribute('aVertexPosition', [-100, -50, 100, -50, 0, 100])

var shader = new PIXI.Shader(`

    precision mediump float;
    attribute vec2 aVertexPosition;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    void main() {
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    }`,

    `precision mediump float;

    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }

`)

var triangle = new PIXI.mesh.RawMesh(geometry, shader);

triangle.position.set(400, 300);

stage.addChild(triangle);

// start the animation..
requestAnimationFrame(animate);

function animate()
{
   // requestAnimationFrame(animate);
    renderer.render(stage);
    triangle.rotation += 0.01;
}
