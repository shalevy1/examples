var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();


var geometry = new PIXI.mesh.Geometry()
.addAttribute('aVertexPosition',  // the attribute name
              [-100, -100,   // x, y
                100, -100,   // x, y
                100 , 100,
               -100 , 100], // x, y
               2)           // the size of the attribute
.addAttribute('aUvs',  // the attribute name
              [0, 0,  // u, v
               1, 0,  // u, v
               1, 1,
               0, 1], // u, v
               2)        // the size of the attribute
.addIndex([0, 1, 2, 0, 2, 3]);

var shader = new PIXI.Shader(`

    precision mediump float;

    attribute vec2 aVertexPosition;
    attribute vec2 aUvs;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    varying vec2 vUvs;

    void main() {

        vUvs = aUvs;
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    }`,

    `precision mediump float;

    varying vec2 vUvs;

    uniform sampler2D uSampler2;
    uniform float time;

    void main() {

        gl_FragColor = texture2D(uSampler2, vUvs + sin( (time + (vUvs.x) * 14.) ) * 0.1 );
    }

`)

var uniforms = {
  uSampler2:PIXI.Texture.from('required/assets/SceneRotate.jpg'),
  time:0
}

var quad = new PIXI.mesh.RawMesh(geometry, shader, uniforms);

quad.position.set(400, 300);
quad.scale.set(2);

stage.addChild(quad);

// start the animation..
requestAnimationFrame(animate);

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(stage);
    quad.rotation += 0.01;
    quad.uniforms.time += 0.1
}
