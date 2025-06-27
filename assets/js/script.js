const canvas = new fabric.Canvas('thumbnailCanvas', {
  backgroundColor: '#000',
  selection: true,
  preserveObjectStacking: true
});

// ✅ Centered RTL Text Box
function createRTLTextBox(text, top, fontSize) {
  const tb = new fabric.Textbox(text, {
    left: canvas.getWidth() / 2,
    top: top,
    width: 800,
    fontSize: fontSize,
    fill: document.getElementById('textColor').value,
    backgroundColor: document.getElementById('bgColor').value,
    textAlign: 'right',
    direction: 'rtl',
    fontFamily: 'Arial',
    originX: 'center',
    selectable: true,
    editable: true,
    lockScalingFlip: true
  });
  tb.setCoords();
  return tb;
}

// ✅ Title input
document.getElementById('titleText').addEventListener('input', function () {
  const input = this.value.trim();
  const fontSize = parseInt(document.getElementById('fontSize').value);

  // Remove textbox if input is empty
  if (input === '') {
    if (canvas.titleText) {
      canvas.remove(canvas.titleText);
      canvas.titleText = null;
    }
    return;
  }

  // If titleText not exist, create it
  if (!canvas.titleText) {
    const text = createRTLTextBox(input, 50, fontSize);
    canvas.titleText = text;
    canvas.add(text);
    canvas.setActiveObject(text);
  } else {
    canvas.titleText.set({ text: input });
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
    canvas.subtitleText.set({ text: this.value });
    canvas.subtitleText.setCoords();
  }
  canvas.renderAll();
});

// ✅ Font size
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

// ✅ Upload image
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

// ✅ Download image
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
