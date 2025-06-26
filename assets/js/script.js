const canvas = new fabric.Canvas('thumbnailCanvas', {
  backgroundColor: '#000',
  selection: true,
  preserveObjectStacking: true
});

// ✅ RTL-compatible TextBox Creator
function createRTLTextBox(text, top, fontSize) {
  const tb = new fabric.Textbox(text, {
    left: canvas.width - 100,                // Dahi side se alignment
    top: top,
    width: canvas.width - 200,               // Text wrapping ke liye
    fontSize: fontSize,
    fill: document.getElementById('textColor').value,
    backgroundColor: document.getElementById('bgColor').value,
    textAlign: 'right',
    direction: 'rtl',
    fontFamily: 'Arial',
    originX: 'right',
    selectable: true,
    editable: true,
    lockScalingFlip: true
  });
  tb.setCoords(); // refresh coordinates for drag
  return tb;
}

// ✅ Title input
document.getElementById('titleText').addEventListener('input', function () {
  const fontSize = parseInt(document.getElementById('fontSize').value);
  if (!canvas.titleText) {
    const text = createRTLTextBox(this.value, 50, fontSize);
    canvas.titleText = text;
    canvas.add(text);
    canvas.setActiveObject(text);
  } else {
    canvas.titleText.text = this.value;
    canvas.titleText.setCoords();
  }
  canvas.renderAll();
});

// ✅ Subtitle input
document.getElementById('subtitleText').addEventListener('input', function () {
  const fontSize = parseInt(document.getElementById('fontSize').value * 0.75);
  if (!canvas.subtitleText) {
    const text = createRTLTextBox(this.value, 150, fontSize);
    canvas.subtitleText = text;
    canvas.add(text);
    canvas.setActiveObject(text);
  } else {
    canvas.subtitleText.text = this.value;
    canvas.subtitleText.setCoords();
  }
  canvas.renderAll();
});

// ✅ Font size change
document.getElementById('fontSize').addEventListener('input', function () {
  const size = parseInt(this.value);
  if (canvas.titleText) canvas.titleText.set('fontSize', size);
  if (canvas.subtitleText) canvas.subtitleText.set('fontSize', size * 0.75);
  canvas.renderAll();
});

// ✅ Text color
document.getElementById('textColor').addEventListener('input', function () {
  const color = this.value;
  if (canvas.titleText) canvas.titleText.set('fill', color);
  if (canvas.subtitleText) canvas.subtitleText.set('fill', color);
  canvas.renderAll();
});

// ✅ Background color
document.getElementById('bgColor').addEventListener('input', function () {
  const bg = this.value;
  if (canvas.titleText) canvas.titleText.set('backgroundColor', bg);
  if (canvas.subtitleText) canvas.subtitleText.set('backgroundColor', bg);
  canvas.renderAll();
});

// ✅ Image upload
document.getElementById('imageUpload').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (f) {
    fabric.Image.fromURL(f.target.result, function (img) {
      img.set({
        left: 100,
        top: 100,
        scaleX: 0.5,
        scaleY: 0.5,
        selectable: true
      });
      canvas.add(img);
      canvas.setActiveObject(img);
    });
  };
  reader.readAsDataURL(file);
});

// ✅ Download thumbnail
document.getElementById('downloadBtn').addEventListener('click', function () {
  const dataURL = canvas.toDataURL({
    format: 'png',
    quality: 1
  });
  const link = document.createElement('a');
  link.download = 'thumbnail.png';
  link.href = dataURL;
  link.click();
});

// ✅ Delete selected object
document.addEventListener('keydown', function (e) {
  if (e.key === 'Delete' || e.key === 'Backspace') {
    const active = canvas.getActiveObject();
    if (active) {
      canvas.remove(active);
    }
  }
});
