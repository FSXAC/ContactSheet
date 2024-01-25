// pimage
let images = [];

function refreshImages() {
    // load images from preview
    images = [];
    let preview = document.getElementById('imagePreview');
    let previewImages = preview.getElementsByTagName('img');
    for (let i = 0; i < previewImages.length; i++) {
        let img = previewImages[i];
        images.push(loadImage(img.src));
    }

    console.log(images);
}

function renderFilmstrip(images) {
    
}

function previewDraw() {
    redraw();
}

function setup() {
    createCanvas(800, 800, document.getElementById('p5canvas'));
    background(0);
    noLoop();
}

function draw() {
    background(0);

    // draw all images in a grid
    let x = 0;
    let y = 0;
    let w = width / 4;
    let h = height / 4;
    for (let i = 0; i < images.length; i++) {
        let img = images[i];
        image(img, x, y, w, h);
        x += w;
        if (x >= width) {
            x = 0;
            y += h;
        }
    }
}