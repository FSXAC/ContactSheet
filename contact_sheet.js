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
    let fs_width = images.length * (SHOT_WIDTH_PX + HPADDING_PX) + HPADDING_PX;
    let fs_height = SHOT_HEIGHT_PX + 2 * VPADDING_PX;
    let fs = createGraphics(fs_width, fs_height);
    fs.background(0);

    // draw images
    let x = HPADDING_PX;
    let y = VPADDING_PX;
    for (let i = 0; i < images.length; i++) {
        let img = images[i];
        fs.image(img, x, y, SHOT_WIDTH_PX, SHOT_HEIGHT_PX);
        x += SHOT_WIDTH_PX + HPADDING_PX;
    }

    // draw sprocket holes
    let dx = SPROCKET_HOLE_WIDTH_PX + SPROCKET_HOLE_SPACING_WIDTH_PX;
    let start_x = Math.random() * 0.5 * dx; // Generate random value between 0 and 0.5 times dx
    fs.fill(SPROKET_HOLE_COLOR);
    fs.stroke(SPROKET_HOLE_STROKE_COLOR);
    for (let x = start_x; x < fs_width; x += dx) {
        fs.rect(x, SPROCKET_HOLE_MARGIN_PX, SPROCKET_HOLE_WIDTH_PX, SPROCKET_HOLE_HEIGHT_PX, SPROCKET_HOLE_ROUNDING_PX);
        fs.rect(x, fs_height - SPROCKET_HOLE_MARGIN_PX - SPROCKET_HOLE_HEIGHT_PX, SPROCKET_HOLE_WIDTH_PX, SPROCKET_HOLE_HEIGHT_PX, SPROCKET_HOLE_ROUNDING_PX);
    }
    
    return fs;
}

function previewDraw() {
    redraw();

    // draw filmstrip
    let fs = renderFilmstrip(images);
    // put fs as image to #filmstripimg
    let fsimg = document.getElementById('filmstripimg');
    fsimg.src = fs.canvas.toDataURL();
    fsimg.style.display = 'block';
}

function setup() {
    // createCanvas(800, 800, document.getElementById('p5canvas'));
    // background(0);
    noLoop();
}

function draw() {
    // background(0);

    // // draw all images in a grid
    // let x = 0;
    // let y = 0;
    // let w = width / 4;
    // let h = height / 4;
    // for (let i = 0; i < images.length; i++) {
    //     let img = images[i];
    //     image(img, x, y, w, h);
    //     x += w;
    //     if (x >= width) {
    //         x = 0;
    //         y += h;
    //     }
    // }
}