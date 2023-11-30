function loadImage(event) {
    document.getElementById('gener-wrapper-id').style.opacity = '1'

    const fileInput = event.target;

    var reader = new FileReader();

    reader.onload = function () {
        var img = document.getElementById('meme-img');
        img.src = reader.result;
    };

    reader.readAsDataURL(fileInput.files[0]);

    document.getElementById('description-id').style.display = 'none';
}

const memTextarea = document.getElementById('mem-textarea');
const sideMenu = document.getElementById('side-menu');
const fontSizeInput = document.getElementById('font-size');
const fontColorInput = document.getElementById('font-color');
const fontStyleSelect = document.getElementById('font-style');
const saveBtn = document.getElementById('save-btn');
const memGenerator = document.getElementById('mem-generator');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');

let isDragging = false;
let offset = { x: 0, y: 0 };

memTextarea.addEventListener('mousedown', (e) => {
    isDragging = true;
    offset = {
        x: e.clientX - memTextarea.getBoundingClientRect().left,
        y: e.clientY - memTextarea.getBoundingClientRect().top
    };
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const x = e.clientX - offset.x - memGenerator.getBoundingClientRect().left;
        const y = e.clientY - offset.y - memGenerator.getBoundingClientRect().top;

        // Ограничиваем перемещение внутри блока mem-generator
        const maxX = memGenerator.clientWidth - memTextarea.clientWidth;
        const maxY = memGenerator.clientHeight - memTextarea.clientHeight;

        memTextarea.style.left = `${Math.min(Math.max(0, x), maxX)}px`;
        memTextarea.style.top = `${Math.min(Math.max(0, y), maxY)}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

fontSizeInput.addEventListener('input', function () {
    memTextarea.style.fontSize = fontSizeInput.value + 'px';
});

fontColorInput.addEventListener('input', function () {
    memTextarea.style.color = fontColorInput.value;
});

fontStyleSelect.addEventListener('change', function () {
    memTextarea.style.fontStyle = fontStyleSelect.value;
});

saveBtn.addEventListener('click', function () {
    var val = memTextarea.value
    memTextarea.outerHTML = memTextarea.outerHTML.replace(/<textarea/g, '<div').replace(/<\/textarea>/g, '</div>');
    document.getElementById('mem-textarea').innerHTML = val



    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
    
      var text = document.getElementById('mem-textarea');
      var top = parseInt(window.getComputedStyle(text).top, 10);
      var left = parseInt(window.getComputedStyle(text).left, 10);
    
      context.textBaseline = "top";
      context.font = window.getComputedStyle(text).fontSize + ' Arial';
      context.fillStyle = window.getComputedStyle(text).color;
    
      var words = text.innerHTML.split(' ');
      var maxWidth = parseInt(window.getComputedStyle(text).width, 10); // максимальная ширина строки
    
      var currentLine = '';
      var lines = [];
    
      words.forEach(function (word) {
        var testLine = currentLine + word + ' ';
        var testWidth = context.measureText(testLine).width;
        if (testWidth > maxWidth) {
          lines.push(currentLine);
          currentLine = word + ' ';
        } else {
          currentLine = testLine;
        }
      });
    
      lines.push(currentLine);
    
      lines.forEach(function (line, index) {
        context.fillText(line, left, top + index * parseInt(window.getComputedStyle(text).lineHeight, 10));
      });
    
      const dataUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = 'meme.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    // Загружаем файл изображения
    img.src = document.getElementById('meme-img').getAttribute('src');

    // location.reload();
});

widthInput.addEventListener('input', function () {
    var width = widthInput.value + 'px';
    memTextarea.style.width = width;
});

heightInput.addEventListener('input', function () {
    var height = heightInput.value + 'px';
    memTextarea.style.height = height;
});
