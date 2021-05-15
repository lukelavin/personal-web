// color palette
const bg = '#f4f4f2';
const light = '#e8e8e8';
const base = '#bbbfca';
const accent = '#495464';
const accent2 = '#272d36';


function getRandomInt(start, stop) {
  return start + Math.floor(Math.random() * (stop - start));
}

Zfont.init(Zdog);
var font = new Zdog.Font({
  src: 'UbuntuMono-Regular.ttf'
});

let isSpinning = true;
let width = window.innerWidth;
let zoom = 1.25;
if (width > 1000) {
  zoom = (width - 1000) * .4/500 + .85;
} else if (width > 375) {
  zoom = (width - 375) * .1/625 + .6;
} else {
  zoom = (width - 220) * .3/155 + .3;
}

// create illo
let illo = new Zdog.Illustration({
  // set canvas with selector
  element: '.zdog-canvas',
  resize: true,
  rotate: {y: Zdog.TAU/12},
  zoom: zoom,
  translate: {y:-30},
  dragRotate: true,
  onDragStart: function(pointer) {
    isSpinning = false;
  }
});

function updateIlloZoom() {
  let width = window.innerWidth;
  if (width > 1500) {
    illo.zoom = 1.25;
  } else if (width > 1000) {
    illo.zoom = (width - 1000) * .4/500 + .85;
  } else if (width > 375) {
    illo.zoom = (width - 375) * .1/625 + .6;
  } else {
    illo.zoom = (width - 220) * .3/155 + .3;
  }
}

// laptop
let laptop = new Zdog.Anchor({
  addTo: illo,
  rotate: {x: -Zdog.TAU/18}
});


let screenGroup = new Zdog.Group({
  addTo: laptop,
  rotate: {x: Zdog.TAU/12}
})

let screen = new Zdog.Box({
  addTo: screenGroup,
  width: 320,
  height: 200,
  depth: 10,
  stroke: 10,
  color: base,
  fill: true
});

let innerScreen = new Zdog.Box({
  addTo: laptop,
  width: 290,
  height: 160,
  depth: 1,
  stroke: 1,
  color: light,
  fill: true,
  rearFace: false,
  leftFace: false,
  rightFace: false,
  topFace: false,
  bottomFace: false,
  rotate: {x: Zdog.TAU/12},
  translate: {y: -12, z: 5}
});

let bottom = new Zdog.Box({
  addTo: laptop,
  width: 320,
  height: 200,
  depth: 10,
  stroke: 10,
  color: base,
  fill: true,
  rotate: {x: Zdog.TAU/4},
  translate: {y: 90, z: 135}
});

let bottomGroup = new Zdog.Group({
  addTo: bottom
})

let trackpad = new Zdog.Box({
  addTo: bottomGroup,
  width: 100,
  height: 50,
  depth: 1,
  stroke: 3,
  fill: true,
  color: light,
  translate: {y: 60, z:10}
});

let keyboard = trackpad.copy({
  width: 280,
  height: 100,
  translate: {y:-40, z:10}
});

for (let i = 0; i < 12; i++) {
  new Zdog.Text({
    addTo: laptop,
    fontSize: 24,
    font: font,
    stroke: 2,
    fill: true,
    value: '0',
    color: base,
    translate: {x: -140 + i * (280 / 12) + getRandomInt(-5, 5), y: getRandomInt(-105, 30), z: getRandomInt(70, 120)},
    rotate: {x: Zdog.TAU/12}
  });

  new Zdog.Text({
    addTo: laptop,
    fontSize: 24,
    font: font,
    stroke: 2,
    fill: true,
    value: '1',
    color: base,
    translate: {x: -135 + i * (280 / 12) + getRandomInt(-5, 5), y: getRandomInt(-105, 30), z: getRandomInt(70, 120)},
    rotate: {x: Zdog.TAU/12}
  });
}

let text = new Zdog.Text({
  addTo: illo,
  font: font,
  fontSize: 80,
  value: "Luke Lavin",
  color: accent,
  fill: true,
  textAlign: 'center',
  textBaseline: 'middle',
  translate: {y: -40, z: 200},
  rotate: {x: Zdog.TAU/12-Zdog.TAU/18}
})

text.copy({
  color: accent2,
  translate: {y: -40, z: 195}
})

let ticker = 0;
let cycleCount = 300;

function animate() {
  if (isSpinning) {
    let sceneStartRotation = {y:0}; //{y: Zdog.TAU/30};
    let progress = ticker / cycleCount;
    let theta = Zdog.easeInOut( progress % 1, 3 ) * Zdog.TAU;
    illo.rotate.y = theta + sceneStartRotation.y;
    ticker++;
  }

  // illo.rotate.y += 0.02;

  illo.updateRenderGraph();
  // animate next frame
  requestAnimationFrame( animate );
}
// start animation
animate();

// update & render
illo.updateRenderGraph();
