document.addEventListener('DOMContentLoaded', function () {
  window.canvas = new fabric.Canvas('thumbnailCanvas', {
    backgroundColor: '#000',
    selection: true,
    preserveObjectStacking: true
  });

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

  const titleInput = document.getElementById('titleText');
  const fontSizeInput = document.getElementById('fontSize');

  if (titleInput && fontSizeInput) {
    titleInput.addEventListener('input', function () {
      const input = this.value.trim();
      const fontSize = parseInt(fontSizeInput.value);

      if (input === '') {
        if (canvas.titleText) {
          canvas.remove(canvas.titleText);
          canvas.titleText = null;
        }
        return;
      }

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
  }
});
