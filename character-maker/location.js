
document.getElementById("bw").addEventListener("change", function() {
    drawCard();
});
// JavaScript code for handling character customization

// Get canvas element
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// List of images
const images = [
  "res/wheat.png",
  "res/tree.png",
  "res/pine.png",
  "res/house.png",
  "res/tower.png",
  "res/mountain.png",
  "res/cloud.png",
  "res/sun.png",
  "res/cactus.png",
  "res/water.png",
  "res/well.png",
  "res/fence.png",
  "res/horse.png",
  "res/boat.png",
  "res/planks.png",
  "res/dead-tree.png",
  "res/wave.png",
  "res/moon.png",
];


// Function to load images and create buttons
function loadImagesAndButtons() {
  const toolButtons = document.getElementById('toolButtons');

  images.forEach((imageUrl, index) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = function() {
      const button = document.createElement('button');
      button.innerHTML = '<img width = "50" height = "50" src = "' + img.src + '"/>';
      button.addEventListener('click', () => {
        setSelectedTool(index);
      });
      toolButtons.appendChild(button);
    };
  });
}

// Set selected tool index
let selectedToolIndex = 0;

// Function to set the selected tool
function setSelectedTool(index) {
  selectedToolIndex = index;
}

// Function to draw image at clicked position
function drawImageAtPosition(x, y) {
  const img = new Image();
  img.src = images[selectedToolIndex];
  let width = document.getElementById("WidthRange").value;
  let height = document.getElementById("WidthRange").value;
  img.onload = function() {
      ctx.drawImage(img, x - width/2, y - height/2, width, height);
  };
}



// Event listener for canvas click
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  drawImageAtPosition(x, y);
});

// Initialize
loadImagesAndButtons();

let gc = "#00ff00";
let sc = "#0000ff";

redraw();
drawCard();

document.getElementById("skyColor").addEventListener("change", () => {
  sc = document.getElementById("skyColor").value;
  redraw();
});

document.getElementById("groundColor").addEventListener("change", () => {
  gc = document.getElementById("groundColor").value;
  redraw();
});

async function redraw() {
  ctx.fillStyle = sc;
  ctx.fillRect(0,0, canvas.width, canvas.height);
  let back = recolor(await loadImage("res/ground.png"), hexToRgb(gc).r,hexToRgb(gc).g,hexToRgb(gc).b);
  ctx.drawImage(back,0,0);
}






async function drawCard() {
let c2 = document.getElementById("cardCanvas");
c2.width = 750/2;
c2.height = 1050/2;
let ctx = c2.getContext("2d");

ctx.fillStyle = "black";
ctx.drawImage(canvas,20,0,750/2 - 25*2,750/2 - 25*2);



let cardSrc = "res/card_template_land.png";
if(document.getElementById("bw").checked) {
  cardSrc = "res/card_template_land_bs.png";
}

var back = await loadImage(cardSrc);
ctx.drawImage(back,0,0,750/2, 1050/2);

ctx.font = "20px Love Ya Like A Sister";
ctx.fillText(document.getElementById("name").value,35,335);


}
