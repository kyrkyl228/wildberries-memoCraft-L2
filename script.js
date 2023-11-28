function loadImage ()  {
    const fileInput = event.target;

    var reader = new FileReader();

    reader.onload = function() {
      var img = document.getElementById('meme-img');
      img.src = reader.result;
    };

    reader.readAsDataURL(fileInput.files[0]);

    document.getElementById('description-id').style.display = 'none'
}