

// JavaScript code for handling character customization

// Get canvas element
var canvas = document.getElementById("characterCanvas");
var ctx = canvas.getContext("2d");

// Character attributes
var skinColor = "#ff0000";
var hairColor = "#ffffff";
var backColor = "#ffffff";
var pantColor = "#ffffff";
var shirtColor = "#ffffff";
var eyeIndex = 0;
var mouthIndex = 0;
var noseIndex = 0;
var earIndex = 0;
var hairIndex = 0;
var accIndex = 0;

var speed = 0;
var aware = 0;
var health = 0;
var charisma = 0;
var initiative = 0;
var attack = 0;


var width = 100;
var height = 100;

// Character images
var eyeImages = ["res/eye1.png", "res/eye2.png", "res/eye3.png","res/eye4.png", "res/eye5.png", "res/eye6.png","res/eye7.png", "res/eye8.png", "res/eye9.png"];
var mouthImages = ["res/mouth1.png", "res/mouth2.png", "res/mouth3.png","res/mouth4.png", "res/mouth5.png", "res/mouth6.png","res/mouth7.png", "res/mouth8.png"];
var noseImages = ["res/nose1.png", "res/nose2.png", "res/nose3.png","res/nose4.png", "res/nose5.png", "res/nose6.png"];
var earImages = ["res/ear1.png", "res/ear2.png", "res/ear3.png"];
var hairImages = ["res/hair1.png", "res/hair2.png", "res/hair3.png", "res/hair4.png","res/hair5.png","res/hair6.png","res/hair7.png","res/hair8.png","res/hair9.png","res/hair10.png","res/hair11.png","res/hair12.png","res/hair13.png","res/hair14.png","res/hair15.png","res/hair16.png"];
var accImages = ["res/hair6.png", "res/acc1.png", "res/acc2.png", "res/acc3.png","res/acc4.png", "res/acc5.png", "res/acc6.png", "res/acc7.png"];

// Load initial character
loadCharacter();

// Event listeners for navigation buttons
document.getElementById("prevEye").addEventListener("click", function() {
    eyeIndex = (eyeIndex - 1 + eyeImages.length) % eyeImages.length;
    loadCharacter();
});

document.getElementById("WidthRange").addEventListener("change", function(e) {
    width = document.getElementById("WidthRange").value;
    loadCharacter();
});


document.getElementById("HeightRange").addEventListener("change", function(e) {
    height = document.getElementById("HeightRange").value;
    loadCharacter();
});

document.getElementById("nextEye").addEventListener("click", function() {
    eyeIndex = (eyeIndex + 1) % eyeImages.length;
    loadCharacter();
});



document.getElementById("prevMouth").addEventListener("click", function() {
    mouthIndex = (mouthIndex - 1 + mouthImages.length) % mouthImages.length;
    loadCharacter();
});

document.getElementById("nextMouth").addEventListener("click", function() {
    mouthIndex = (mouthIndex + 1) % mouthImages.length;
    loadCharacter();
});


document.getElementById("prevAcc").addEventListener("click", function() {
    accIndex = (accIndex - 1 + accImages.length) % accImages.length;
    loadCharacter();
});

document.getElementById("nextAcc").addEventListener("click", function() {
    accIndex = (accIndex + 1) % accImages.length;
    loadCharacter();
});

document.getElementById("prevHair").addEventListener("click", function() {
    hairIndex = (hairIndex - 1 + hairImages.length) % hairImages.length;
    loadCharacter();
});

document.getElementById("nextHair").addEventListener("click", function() {
    hairIndex = (hairIndex + 1) % hairImages.length;
    loadCharacter();
});

document.getElementById("prevNose").addEventListener("click", function() {
    noseIndex = (noseIndex - 1 + noseImages.length) % noseImages.length;
    loadCharacter();
});

document.getElementById("nextNose").addEventListener("click", function() {
    noseIndex = (noseIndex + 1) % noseImages.length;
    loadCharacter();
});

document.getElementById("prevEar").addEventListener("click", function() {
    earIndex = (earIndex - 1 + earImages.length) % earImages.length;
    loadCharacter();
});

document.getElementById("nextEar").addEventListener("click", function() {
    earIndex = (earIndex + 1) % earImages.length;
    loadCharacter();
});

// Event listener for skin color selector
document.getElementById("skinColor").addEventListener("change", function() {
    skinColor = this.value;
    loadCharacter();
});

    // Event listener for skin color selector
    document.getElementById("pantColor").addEventListener("change", function() {
    pantColor = this.value;
    loadCharacter();
});

document.getElementById("shirtColor").addEventListener("change", function() {
    shirtColor = this.value;
    loadCharacter();
});

document.getElementById("hairColor").addEventListener("change", function() {
    hairColor = this.value;
    loadCharacter();
});

document.getElementById("backColor").addEventListener("change", function() {
    backColor = this.value;
    loadCharacter();
});

// Event listener for shirt color selector
document.getElementById("shirtColor").addEventListener("change", function() {
    shirtColor = this.value;
    loadCharacter();
});

document.getElementById("bw").addEventListener("change", function() {
    loadCharacter();
});



// Function to load and draw character
async function loadCharacter() {
    
    //easy print
    let recolor2 = recolor;
    if(document.getElementById("bw").checked) {
        recolor2 = (e,r,g,b,c) => { return recolor(e,255,255,255,c);}
        ctx.fillStyle = "white";
    } else {
        ctx.fillStyle = backColor;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0,0, canvas.width, canvas.height);

    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "black";
    ctx.fillRect(0,canvas.height/2, canvas.width, canvas.height/2);
    ctx.globalAlpha = 1.0;



    // Draw character components
    // Draw skin

    let head = recolor2(await loadImage("res/head.png"), hexToRgb(skinColor).r,hexToRgb(skinColor).g,hexToRgb(skinColor).b);
    ctx.drawImage(head, 150, 10, 100, 100);

    let torso = recolor2(await loadImage("res/torso.png"), hexToRgb(skinColor).r,hexToRgb(skinColor).g,hexToRgb(skinColor).b);
    let torsoShirt = recolor2(torso, hexToRgb(shirtColor).r,hexToRgb(shirtColor).g,hexToRgb(shirtColor).b, [2,249,0]);
    ctx.drawImage(torsoShirt, 200 - width/2, 110, width, height);

    let legs = recolor2(await loadImage("res/legs.png"), hexToRgb(pantColor).r,hexToRgb(pantColor).g,hexToRgb(pantColor).b);
    ctx.drawImage(legs, 200 - width/2, 110 + height/1.5, width, height);

    var arm = recolor2(await loadImage("res/arm.png"), hexToRgb(skinColor).r,hexToRgb(skinColor).g,hexToRgb(skinColor).b);
    let armShirt = recolor2(arm, hexToRgb(shirtColor).r,hexToRgb(shirtColor).g,hexToRgb(shirtColor).b, [2,249,0]);
    ctx.drawImage(armShirt, 130 - Math.floor(width/2.5), 110, 100, 100);

    

    // Draw eyes
    var eyeImage = await loadImage(eyeImages[eyeIndex]);
    ctx.drawImage(eyeImage, 150, 35, 50, 50);
    ctx.drawImage(eyeImage, 190, 35, 50, 50);

  

    // Draw hair
    let hairImage = recolor2(await loadImage(hairImages[hairIndex]), hexToRgb(hairColor).r,hexToRgb(hairColor).g,hexToRgb(hairColor).b);
    ctx.drawImage(hairImage, 150, 10, 100, 100);

    // Draw mouth
    var mouthImage = await loadImage(mouthImages[mouthIndex]);
    ctx.drawImage(mouthImage, 180, 55, 50, 50);

    // Draw nose
    var noseImage = await loadImage(noseImages[noseIndex]);
    ctx.drawImage(noseImage, 180, 40, 50, 50);

    // Draw ears
    var earImage = recolor2(await loadImage(earImages[earIndex]),hexToRgb(skinColor).r,hexToRgb(skinColor).g,hexToRgb(skinColor).b);
    ctx.drawImage(earImage, 136, 40, 50, 50);
    //drawImageFlipped(earImage, 210, 40, 50, 50);
    console.log("here");
    // Draw hair
    let accImage = recolor2(await loadImage(accImages[accIndex]), hexToRgb(hairColor).r,hexToRgb(hairColor).g,hexToRgb(hairColor).b);
    ctx.drawImage(accImage, 150, 15, 100, 100);
    setTimeout(function(){
        drawCard();
    }, 100);

}



function generateRandomNumbersWithSum(total, count) {
let numbers = [];

// Generate random numbers
for (let i = 0; i < count; i++) {
    let random = Math.random();
    numbers.push(random);
}

// Calculate sum of generated numbers
let sum = numbers.reduce((acc, num) => acc + num, 0);

// Scale numbers to make sum to be total
numbers = numbers.map(num => Math.round(num / sum * total));

return numbers;
}

function rollStats() {
nums = generateRandomNumbersWithSum(24,6);
health = nums[0];
speed = nums[1];
charisma = nums[2];
initiative = nums[3];
attack = nums[4];
aware = nums[5];
drawCard();
}
async function drawCard() {
let c2 = document.getElementById("cardCanvas");
c2.width = 750/2;
c2.height = 1050/2;
let ctx = c2.getContext("2d");
ctx.fillStyle = "black";

ctx.drawImage(canvas,0,20,750/2,750/2);


let cardSrc = "res/card_template.png";
if(document.getElementById("bw").checked) {
    cardSrc = "res/card_template_bw.png";
}
var back = await loadImage(cardSrc);
ctx.drawImage(back,0,0,750/2, 1050/2);

ctx.font = "20px Love Ya Like A Sister";
ctx.fillText(document.getElementById("name").value,35,335);

ctx.font = "30px Love Ya Like A Sister";
ctx.fillText(aware,750/2 - 50,70);

console.log(speed);
//TODO: is this good balancing?
ctx.fillText(Math.ceil(speed / 2),750/2 - 50,135);

ctx.fillText(charisma,750/2 - 50,140+65);
ctx.fillText(initiative,750/2 - 50,270);

ctx.font = "40px Love Ya Like A Sister";
ctx.fillText(attack,750/2 - 100,410);
ctx.fillStyle = "white";
ctx.fillText(health,750/2 - 100,480);
}

function drawImageFlipped(image, x,y,width,height) {
    ctx.save();
    ctx.translate(x + width/2, y + width/2);
    ctx.scale(-1, 1);
    ctx.translate(-(x + width/2), -(y + width/2));
    ctx.drawImage(image, 0,0);
    ctx.restore();
}

rollStats();