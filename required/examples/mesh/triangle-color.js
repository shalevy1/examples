var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();


var geometry = new PIXI.mesh.Geometry()
.addAttribute('aVertexPosition',  // the attribute name
              [-100, -50,   // x, y
                100, -50,   // x, y
                0. , 100.], // x, y
               2)           // the size of the attribute

.addAttribute('aColor',  // the attribute name
              [1, 0, 0,  // r, g, b
               0, 1, 0,  // r, g, b
               0, 0, 1], // r, g, b
               3)        // the size of the attribute

var shader = new PIXI.Shader.from(`

    precision mediump float;
    attribute vec2 aVertexPosition;
    attribute vec3 aColor;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    varying vec3 vColor;

    void main() {

        vColor = aColor;
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    }`,

    `precision mediump float;

    varying vec3 vColor;

    void main() {
        gl_FragColor = vec4(vColor, 1.0);
    }

`)

var triangle = new PIXI.mesh.RawMesh(geometry, shader);

triangle.position.set(400, 300);
triangle.scale.set(2);

stage.addChild(triangle);

// start the animation..
requestAnimationFrame(animate);

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(stage);
    triangle.rotation += 0.01;
}
