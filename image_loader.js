document.getElementById('imageFolderInput').addEventListener('change', function(event) {
    let files = Array.from(event.target.files);
    let preview = document.getElementById('imagePreview');
    preview.innerHTML = '';
    let num_images = files.length;
    let num_images_loaded = 0;
    let images = [];

    // Sort files by name
    files.sort((a, b) => a.name.localeCompare(b.name));

    for (let i = 0; i < files.length; i++) {
        let file = files[i];

        // Only process image files.
        if (!file.type.startsWith('image/')){ continue; }

        let reader = new FileReader();

        reader.onload = function(e) {
            let img = new Image();
            img.onload = function() {
                let scaledImage = scaleImage(img, PREVIEW_HEIGHT);
                images.push({name: file.name, image: scaledImage});

                num_images_loaded++;
                if (num_images_loaded == num_images) {
                    // Sort images by name and append to preview
                    images.sort((a, b) => a.name.localeCompare(b.name));
                    for (let j = 0; j < images.length; j++) {
                        preview.appendChild(images[j].image);
                    }

                    refreshImages();
                    document.getElementById('filmstripPreview').classList.remove('disabled');

                    // enable preview
                    previewDraw();
                }
            };
            img.src = e.target.result;
        };

        // Read the image file as a data URL.
        reader.readAsDataURL(file);
    }
});

function scaleImage(img, maxHeight) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    let width = img.width;
    let height = img.height;

    // if landscape
    if (width > height) {
        // 

        // Calculate the new dimensions
        if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw the scaled image
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas to an image
        let scaledImage = new Image();
        scaledImage.src = canvas.toDataURL();

        return scaledImage;
    } else { // rotate image
        // Calculate the new dimensions
        if (width > maxHeight) {
            height *= maxHeight / width;
            width = maxHeight;
        }

        canvas.width = height;
        canvas.height = width;

        // Draw the scaled image
        ctx.translate(height, 0);
        ctx.rotate(90 * Math.PI / 180);
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas to an image
        let scaledImage = new Image();
        scaledImage.src = canvas.toDataURL();

        return scaledImage;
    }
}