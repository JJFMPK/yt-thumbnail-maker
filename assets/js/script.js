const canvas = new fabric.Canvas('thumbnailCanvas', {
  backgroundColor: '#000',
  selection: true,
  preserveObjectStacking: true
});

// Add title text
document.getElementById('titleText').addEventListener('input', function () {
  if (!canvas.titleText) {
    const text = new fabric.Textbox(this.value, {
      left: 100,
      top: 50,
      fontSize: parseInt(document.getElementById('fontSize').value),
      fill: document.getElementById('textColor').value,
      backgroundColor: document.getElementById('bgColor').value,
      editable: true,
      selectable: true
    });
    canvas.titleText = text;
    canvas.add(text);
    canvas.setActiveObject(text);
  } else {
    canvas.titleText.text = this.value;
  }
  canvas.requestRenderAll();
});

// Add subtitle text
document.getElementById('subtitleText').addEventListener('input', function () {
  if (!canvas.subtitleText) {
    const text = new fabric.Textbox(this.value, {
      left: 100,
      top: 150,
      fontSize: parseInt(document.getElementById('fontSize').value * 0.75),
      fill: document.getElementById('textColor').value,
      backgroundColor: document.getElementById('bgColor').value,
      editable: true,
      selectable: true
    });
    canvas.subtitleText = text;
    canvas.add(text);
    canvas.setActiveObject(text);
  } else {
    canvas.subtitleText.text = this.value;
  }
  canvas.requestRenderAll();
});

// Font size
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

// Download button
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
