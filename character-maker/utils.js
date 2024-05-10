const loadImage = src =>
new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = reject;
  img.src = src;
});

function hexToRgb(hex) {
var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
return result ? {
r: parseInt(result[1], 16),
g: parseInt(result[2], 16),
b: parseInt(result[3], 16)
} : null;


}

function recolor(img, red,green,blue, color = [255,255,255]){

var c = document.createElement('canvas');

var w = img.width, h = img.height;

c.width = w;
c.height = h;

var ctx = c.getContext('2d');

ctx.drawImage(img, 0, 0, w, h);
var imageData = ctx.getImageData(0,0, w, h);
var pixel = imageData.data;

var r=0, g=1, b=2,a=3;
for (var p = 0; p<pixel.length; p+=4)
{

  if (
      pixel[p+r] == color[0] &&
      pixel[p+g] == color[1] &&
      pixel[p+b] == color[2]) // if white then change alpha to 0
  {
    
    pixel[p+r] = red;
    pixel[p+g] = green;
    pixel[p+b] = blue;
  }
}

ctx.putImageData(imageData,0,0);

//return c.toDataURL('image/png');
return c;
}

function download() {
    var download = document.getElementById("download");
    var image = document.getElementById("cardCanvas").toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
    //download.setAttribute("download","archive.png");
    }