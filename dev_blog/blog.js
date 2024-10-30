// color palette
// const bg = '#f4f4f2';
// const light = '#e8e8e8';
// const base = '#bbbfca';
// const accent = '#495464';
// const accent2 = '#272d36';

const bg = '#282828';
const red = '#cc241d';
const red2 = '#fb4934';
const green = '#98971a';
const green2 = '#b8bb26';
const yellow = '#d79921';
const yellow2 = '#fabd2f';
const blue = '#458588';
const blue2 = '#83a598';
const purple = '#b16286';
const purple2 = '#d3869b';
const aqua = '#689d6a';
const aqua2 = '#8ec07c';
const orange = '#d65d0e';
const orange2 = '#fe8019';
const gray = '#a89984';
const gray2 = '#928374';
const fg = '#ebdbb2';
const bg0_h = '#1d2021';
const bg0 = '#282828';
const bg0_s = '#32302f';
const bg1 = '#3c3836';
const bg2 = '#504945';
const bg3 = '#665c54';
const bg4 = '#7c6f64';
const bg5 = '#928374';
const fg4 = '#a89984';
const fg3 = '#bdae93';
const fg2 = '#d5c4a1';
const fg1 = '#ebdbb2';
const fg0 = '#fbf1c7';


function getRandomInt(start, stop) {
  return start + Math.floor(Math.random() * (stop - start));
}

Zfont.init(Zdog);
var font = new Zdog.Font({
  src: '../../UbuntuMono-Regular.ttf'
});

let isSpinning = true;
let width = window.innerWidth;

let zoom = 0.3;

// create illo
let illo = new Zdog.Illustration({
  // set canvas with selector
  element: '.zdog-canvas',
  resize: true,
  rotate: { y: Zdog.TAU / 12 },
  zoom: zoom,
  translate: { y: -30 }
});

// function updateIlloZoom() {
//   let width = window.innerWidth;
//   if (width > 1500) {
//     illo.zoom = (width - 1500) * .001 + 1.25;
//   } else if (width > 1000) {
//     illo.zoom = (width - 1000) * .4 / 500 + .85;
//   } else if (width > 375) {
//     illo.zoom = (width - 375) * .1 / 625 + .6;
//   } else {
//     illo.zoom = (width - 220) * .3 / 155 + .3;
//   }
// }

// laptop
let laptop = new Zdog.Anchor({
  addTo: illo,
  rotate: { x: -Zdog.TAU / 18 }
});


let screenGroup = new Zdog.Group({
  addTo: laptop,
  rotate: { x: Zdog.TAU / 12 }
})

let screen = new Zdog.Box({
  addTo: screenGroup,
  width: 320,
  height: 200,
  depth: 10,
  stroke: 10,
  color: bg3,
  fill: true
});

let innerScreen = new Zdog.Box({
  addTo: laptop,
  width: 290,
  height: 160,
  depth: 1,
  stroke: 1,
  color: bg1,
  fill: true,
  rearFace: false,
  leftFace: false,
  rightFace: false,
  topFace: false,
  bottomFace: false,
  rotate: { x: Zdog.TAU / 12 },
  translate: { y: -12, z: 5 }
});

let bottom = new Zdog.Box({
  addTo: laptop,
  width: 320,
  height: 200,
  depth: 10,
  stroke: 10,
  color: bg3,
  fill: true,
  rotate: { x: Zdog.TAU / 4 },
  translate: { y: 90, z: 135 }
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
  color: bg1,
  translate: { y: 60, z: 10 }
});

let keyboard = trackpad.copy({
  width: 280,
  height: 100,
  translate: { y: -40, z: 10 }
});

let textGroup = new Zdog.Group({
  addTo: laptop
})

possible_colors = [red, green, yellow, orange, blue, purple, aqua]
let color_weight = [red, green, green, green, yellow, yellow, yellow, blue, purple, purple, aqua, aqua, orange]
let multicolor = Math.random() < .1;
let random_color = color_weight[Math.floor(Math.random() * color_weight.length)]
console.log(random_color)
const NUM_CHARS = 15;
for (let i = 0; i < NUM_CHARS; i++) {
  if (multicolor === true) {
    random_color = possible_colors[Math.floor(Math.random() * possible_colors.length)]
  }
  new Zdog.Text({
    addTo: textGroup,
    fontSize: 24,
    font: font,
    stroke: 2,
    fill: true,
    value: '0',
    color: random_color,
    translate: { x: -140 + i * (280 / NUM_CHARS) + getRandomInt(-5, 5), y: (-105 + 67) - Math.sign(i % 2 * 2 - 1) * getRandomInt(0, 67), z: getRandomInt(70, 120) },
    rotate: { x: Zdog.TAU / 12 }
  });
  if (multicolor === true) {
    random_color = possible_colors[Math.floor(Math.random() * possible_colors.length)]
  }
  new Zdog.Text({
    addTo: textGroup,
    fontSize: 24,
    font: font,
    stroke: 2,
    fill: true,
    value: '1',
    color: random_color,
    translate: { x: -140 + i * (280 / NUM_CHARS) + getRandomInt(-5, 5), y: (-105 + 67) - Math.sign(i % 2 * 2 - 1) * getRandomInt(0, 67), z: getRandomInt(70, 120) },
    rotate: { x: Zdog.TAU / 12 }
  });
}

let text = new Zdog.Text({
  addTo: illo,
  font: font,
  fontSize: 80,
  value: "Luke Lavin",
  color: fg1,
  fill: true,
  textAlign: 'center',
  textbg2line: 'middle',
  translate: { y: 0, z: 200 },
  rotate: { x: Zdog.TAU / 12 - Zdog.TAU / 18 }
})

text.copy({
  color: fg3,
  translate: { y: 1, z: 195 }
})

text.copy({
  color: fg3,
  translate: { y: 2, z: 190 }
})

let ticker = 0;
let cycleCount = window.innerWidth > 1000 ? 600 : 300;

function animate() {
  if (isSpinning) {
    let sceneStartRotation = { y: 0 };
    let progress = ticker / cycleCount;
    let theta = Zdog.easeInOut(progress % 1, 4) * Zdog.TAU % (Zdog.TAU);
    illo.rotate.y = theta + sceneStartRotation.y;
    ticker++;
  }

  // illo.rotate.y += 0.02;

  illo.updateRenderGraph();
  // animate next frame
  requestAnimationFrame(animate);
}
// start animation
animate();

// update & render
illo.updateRenderGraph();

