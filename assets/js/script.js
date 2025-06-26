const canvas = new fabric.Canvas('thumbnailCanvas', {
  backgroundColor: '#000',
  selection: true,
  preserveObjectStacking: true
});

// Common settings for RTL Text
function createRTLTextBox(text, top, fontSize) {
  return new fabric.Textbox(text, {
    left: 100,
    top: top,
    width: 1000,
    fontSize: fontSize,
    fill: document.getElementById('textColor').value,
    backgroundColor: document.getElementById('bgColor').value,
    textAlign: 'right',
    direction: 'rtl',
    fontFamily: 'Arial',
    selectable: true,
    editable: true,
    lockScalingFlip: true
  });
}

// Title Text
document.getElementById('titleText').addEventListener('input', function () {
  if (!canvas.titleText) {
    const text = createRTLTextBox(this.value, 50, parseInt(document.getElementById('fontSize').value));
    canvas.titleText = text;
    canvas.add(text);
    canvas.setActiveObject(text);
  } else {
    canvas.titleText.text = this.value;
  }
  canvas.requestRenderAll();
});

// Subtitle Text
document.getElementById('subtitleText').addEventListener('input', function () {
  if (!canvas.subtitleText) {
    const text = createRTLTextBox(this.value, 150, parseInt(document.getElementById('fontSize').value * 0.75));
    canvas.subtitleText = text;
    canvas.add(text);
    canvas.setActiveObject(text);
  } else {
    canvas.subtitleText.text = this.value;
  }
  canvas.requestRenderAll();
});

// Font size change
document.getElementById('fontSize').addEventListener('input', function () {
  const size = parseInt(this.value);
  if (canvas.titleText) canvas.titleText.set('fontSize', size);
  if (canvas.subtitleText) canvas.subtitleText.set('fontSize', size * 0.75);
  canvas.requestRenderAll();
});

// Text color
document.getElementById('textColor').addEventListener('input', function () {
  const color = this.value;
  if (canvas.titleText) canvas.titleText.set('fill', color);
  if (canvas.subtitleText) canvas.subtitleText.set('fill', color);
  canvas.requestRenderAll();
});

// Background color
document.getElementById('bgColor').addEventListener('input', function () {
  const bg = this.value;
  if (canvas.titleText) canvas.titleText.set('backgroundColor', bg);
  if (canvas.subtitleText) canvas.subtitleText.set('backgroundColor', bg);
  canvas.requestRenderAll();
});

// Upload image
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

// Download thumbnail
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

// Delete selected object
document.addEventListener('keydown', function (e) {
  if (e.key === 'Delete' || e.key === 'Backspace') {
    const active = canvas.getActiveObject();
    if (active) {
      canvas.remove(active);
    }
  }
});
