function uploadImages(event) {
    let files = Array.from(event.target.files);
    let preview = document.getElementById('imagePreview');
    preview.innerHTML = '';
    let num_images = files.length;
    let num_images_loaded = 0;
    let images = [];

    if (num_images == 0) {
        displayErrorDialog('No images selected', 'Please select at least one image.');
        return;
    }

    if (num_images > 40) {
        displayErrorDialog('Too many images', 'Please select at most 40 images.');
        return;
    }

    // Sort files by name
    files.sort((a, b) => a.name.localeCompare(b.name));

    for (let i = 0; i < files.length; i++) {
        let file = files[i];

        // Only process image files.
        if (!file.type.startsWith('image/')){ continue; }

        let reader = new FileReader();

        startLoad();

        reader.onload = function(e) {
            let img = new Image();
            img.onload = function() {
                let scaledImage = scaleImage(img, PREVIEW_HEIGHT);
                images.push({name: file.name, image: scaledImage});

                num_images_loaded++;
                
                // update progress bar
                let progressBar = document.getElementById('uploadProgressBar');
                progressBar.style.width = (num_images_loaded / num_images * 100) + '%';
                let progressText = document.getElementById('uploadProgressText');
                progressText.innerHTML = num_images_loaded + ' / ' + num_images;

                if (num_images_loaded == num_images) {
                    // Sort images by name and append to preview
                    images.sort((a, b) => a.name.localeCompare(b.name));
                    for (let j = 0; j < images.length; j++) {
                        preview.appendChild(images[j].image);
                    }

                    finishLoad();

                    refreshImages();
                    // document.getElementById('filmstripPreview').classList.remove('disabled');

                    // enable preview
                    previewDraw();

                    // enable ok button remove 'disabled' attribute
                    // document.getElementById('uploadOKButton').removeAttribute('disabled');
                }
            };
            img.src = e.target.result;
        };

        // Read the image file as a data URL.
        reader.readAsDataURL(file);
        document.getElementById('imagePreview').classList.remove('disabled');
    }

    // reset progress bar
    document.getElementById('uploadProgressBar').style.width = '0%';
    document.getElementById('uploadProgressText').innerHTML = '0 / ' + num_images;

    // remove 'disabled' attr from continue (alt) button
    document.getElementById('uploadImageButton_alt').removeAttribute('disabled');
}

function addUploaderEventListener() {
    document.getElementById('uploadImageButton').addEventListener('change', uploadImages);
    document.getElementById('uploadImageButton_alt').addEventListener('click', function() {
        let event = new Event('change');
        document.getElementById('uploadImageButton').dispatchEvent(event);
    });
}


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