const canvas = document.getElementById('thumbnailCanvas');
const ctx = canvas.getContext('2d');

let title = {
  text: '',
  x: 100,
  y: 100,
  fontSize: 48,
  color: '#ffffff',
  bgColor: '#000000',
  dragging: false
};

let subtitle = {
  text: '',
  x: 100,
  y: 180,
  fontSize: 36,
  color: '#ffffff',
  bgColor: '#000000',
  dragging: false
};

let image = null;
let imageX = 0;
let imageY = 0;
let imageWidth = 1280;
let imageHeight = 720;
let draggingImage = false;

let offsetX, offsetY;

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background image
  if (image) {
    ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);
  }

  // Draw title background
  if (title.text) {
    ctx.fillStyle = title.bgColor;
    ctx.fillRect(0, title.y - title.fontSize, canvas.width, title.fontSize + 20);
    ctx.fillStyle = title.color;
    ctx.font = `bold ${title.fontSize}px Arial`;
    ctx.fillText(title.text, title.x, title.y);
  }

  // Draw subtitle background
  if (subtitle.text) {
    ctx.fillStyle = subtitle.bgColor;
    ctx.fillRect(0, subtitle.y - subtitle.fontSize, canvas.width, subtitle.fontSize + 20);
    ctx.fillStyle = subtitle.color;
    ctx.font = `bold ${subtitle.fontSize}px Arial`;
    ctx.fillText(subtitle.text, subtitle.x, subtitle.y);
  }
}

function isInsideText(x, y, obj) {
  ctx.font = `bold ${obj.fontSize}px Arial`;
  const textWidth = ctx.measureText(obj.text).width;
  return (
    x > obj.x &&
    x < obj.x + textWidth &&
    y > obj.y - obj.fontSize &&
    y < obj.y + 10
  );
}

canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (isInsideText(mouseX, mouseY, title)) {
    title.dragging = true;
    offsetX = mouseX - title.x;
    offsetY = mouseY - title.y;
  } else if (isInsideText(mouseX, mouseY, subtitle)) {
    subtitle.dragging = true;
    offsetX = mouseX - subtitle.x;
    offsetY = mouseY - subtitle.y;
  } else if (
    image &&
    mouseX > imageX &&
    mouseX < imageX + imageWidth &&
    mouseY > imageY &&
    mouseY < imageY + imageHeight
  ) {
    draggingImage = true;
    offsetX = mouseX - imageX;
    offsetY = mouseY - imageY;
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (!(title.dragging || subtitle.dragging || draggingImage)) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (title.dragging) {
    title.x = mouseX - offsetX;
    title.y = mouseY - offsetY;
  } else if (subtitle.dragging) {
    subtitle.x = mouseX - offsetX;
    subtitle.y = mouseY - offsetY;
  } else if (draggingImage) {
    imageX = mouseX - offsetX;
    imageY = mouseY - offsetY;
  }

  drawCanvas();
});

canvas.addEventListener('mouseup', () => {
  title.dragging = false;
  subtitle.dragging = false;
  draggingImage = false;
});

document.getElementById('titleText').addEventListener('input', (e) => {
  title.text = e.target.value;
  drawCanvas();
});

document.getElementById('subtitleText').addEventListener('input', (e) => {
  subtitle.text = e.target.value;
  drawCanvas();
});

document.getElementById('fontSize').addEventListener('input', (e) => {
  title.fontSize = parseInt(e.target.value);
  subtitle.fontSize = parseInt(e.target.value * 0.75);
  drawCanvas();
});

document.getElementById('textColor').addEventListener('input', (e) => {
  title.color = e.target.value;
  subtitle.color = e.target.value;
  drawCanvas();
});

document.getElementById('bgColor').addEventListener('input', (e) => {
  title.bgColor = e.target.value;
  subtitle.bgColor = e.target.value;
  drawCanvas();
});

document.getElementById('imageUpload').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    image = new Image();
    image.onload = () => {
      imageWidth = canvas.width;
      imageHeight = canvas.height;
      drawCanvas();
    };
    image.src = event.target.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'thumbnail.png';
  link.href = canvas.toDataURL();
  link.click();
});
