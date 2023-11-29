function loadImage() {
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
    memTextarea.outerHTML = memTextarea.outerHTML.replace(/<textarea/g, '<p').replace(/<\/textarea>/g, '</p>');
    document.getElementById('mem-textarea').innerHTML = val

});

widthInput.addEventListener('input', function () {
    var width = widthInput.value + 'px';
    memTextarea.style.width = width;
});

heightInput.addEventListener('input', function () {
    var height = heightInput.value + 'px';
    memTextarea.style.height = height;
});
