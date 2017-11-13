var app = new PIXI.Application(800, 600, {autoStart: false} );
document.body.appendChild(app.view);

var rt = [];
for (var i=0;i<2;i++) rt.push(PIXI.RenderTexture.create(app.screen.width, app.screen.height));
var current = 0;

var bg;
var brush;

app.loader.add('bg', 'required/assets/bkg-grass.jpg');
app.loader.add('one', 'https://raw.githubusercontent.com/PavelLaptev/test-rep/master/one.png');
app.loader.load(function(loader, resources) {
    var tempBg = new PIXI.Sprite(resources.bg.texture);
    tempBg.width = app.screen.width;
    tempBg.height = app.screen.height;

    app.renderer.render(tempBg, rt[0]);

    bg = new PIXI.Sprite(rt[0]);
    app.stage.addChild(bg);
    brush = new PIXI.Sprite(resources.one.texture);
    app.stage.addChild(brush);
    brush.anchor.set(0.5);

    bg.filters = [new PIXI.filters.DisplacementFilter(brush)];

    app.stage.interactive = true;
    app.stage.on('pointerdown', onPointerDown);
    app.stage.on('pointerup', onPointerUp);
    app.stage.on('pointermove', onPointerMove);

    app.start();
});

function snap() {
    app.renderer.render(app.stage, rt[1 - current]);
    bg.texture = rt[1 - current];
    current = 1 - current;
}

var dragging = false;

function onPointerDown(event) {
    dragging = true;
    onPointerMove(event);
}

function onPointerMove(event) {
    brush.position.copy(event.data.global);
    if (dragging) snap();
}

function onPointerUp() {
    dragging = false;
}

