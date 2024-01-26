// pimage
let images = [];

let FONTS = {
    vcd: null
};


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

function addTopLineText(fs, text, size_mm, margin_top_mm, interval_mm, offset_mm, textfont="sans-serif") {
    if (interval_mm <= 0) {
        interval_mm = SHOT_WIDTH_MM + HPADDING_MM;
    }

    let size_px = size_mm * SCALE;
    let margin_top_px = margin_top_mm * SCALE;
    let interval_px = interval_mm * SCALE;
    let offset_px = offset_mm * SCALE;

    fs.fill(FILM_BORDER_COLOR);
    fs.noStroke();
    fs.textSize(size_px);
    fs.textAlign(CENTER, TOP);
    fs.textFont(textfont);

    fs.push();
    fs.translate(0, margin_top_px);
    for (let x = offset_px; x < fs.width; x += interval_px) {
        fs.text(text, x, 0);
    }
    fs.pop();
}

function frameCountToString(fc) {
    if (fc == -2) {
        return "X";
    } else if (fc == -1) {
        return "00";
    } else {
        // return fc.toString().padStart(2, "0");
        return fc.toString();
    }
}

function addBottomLine(
    fs,
    fc_start=-2,
    fc_size_mm=2,
    fc_margin_mm=0.1,
    fc2_size_mm=1.4,
    fc2_margin_mm=0,
    fc2_hoffset_mm=1.2,
    fc2_tri_width_mm = 1.5,
    fc2_tri_height_mm = 0.8,
    fc2_tri_margin_mm = 0.8,
    fc2_tri_hoffset_mm = -2.1,
    fc2_tri_inner_color = FILM_BORDER_COLOR,
    draw_dx_code = true,
    dx_code_width_mm = 12,
    dx_code_height_mm = 2,
    ) {
    
    let fc_size_px = fc_size_mm * SCALE;
    let fc_margin_px = fc_margin_mm * SCALE;
    let fc2_size_px = fc2_size_mm * SCALE;
    let fc2_margin_px = fc2_margin_mm * SCALE;
    let fc2_hoffset_px = fc2_hoffset_mm * SCALE;
    let fc2_tri_width_px = fc2_tri_width_mm * SCALE;
    let fc2_tri_height_px = fc2_tri_height_mm * SCALE;
    let fc2_tri_margin_px = fc2_tri_margin_mm * SCALE;
    let fc2_tri_hoffset_px = fc2_tri_hoffset_mm * SCALE;
    let dx_code_width_px = dx_code_width_mm * SCALE;
    let dx_code_height_px = dx_code_height_mm * SCALE;

    let FW = SHOT_WIDTH_PX + HPADDING_PX;

    // draw frame count
    fs.fill(FILM_BORDER_COLOR);
    fs.noStroke();
    fs.textSize(fc_size_px);
    fs.textAlign(CENTER, BOTTOM);
    for (let x = 0, fc = fc_start; x < fs.width; x += FW, fc++) {
        fs.text(frameCountToString(fc), x, fs.height - fc_margin_px);
    }

    // draw frame count 2
    fs.textSize(fc2_size_px);
    for (let x = 0 + FW / 2 + fc2_hoffset_px, fc = fc_start; x < fs.width; x += FW, fc++) {
        fs.text(frameCountToString(fc) + "A", x, fs.height - fc2_margin_px);
    }

    // draw frame count 2 triangles
    fs.fill(fc2_tri_inner_color);
    fs.stroke(FILM_BORDER_COLOR);
    fs.textAlign(CENTER, CENTER);
    fs.strokeWeight(1);
    for (let x = 0 + FW / 2; x < fs.width; x += FW) {
        fs.push();
        fs.translate(x, fs.height - fc2_tri_margin_px);
        fs.triangle(
            fc2_tri_hoffset_px, fc2_tri_height_px/2,
            fc2_tri_hoffset_px + fc2_tri_width_px, 0,
            fc2_tri_hoffset_px, -fc2_tri_height_px/2
        );
        fs.pop();
    }

    // draw dx code (rectangle)
    let dx1 = (FW - 2 * dx_code_width_px) / 4;
    let dx2 = dx1 + FW / 2;
    fs.fill(FILM_BORDER_COLOR);
    fs.noStroke();
    for (let x = 0; x < fs.width; x += FW) {
        fs.rect(x + dx1, fs.height - dx_code_height_px, dx_code_width_px, dx_code_height_px);
        fs.rect(x + dx2, fs.height - dx_code_height_px, dx_code_width_px, dx_code_height_px);
    }
}

function renderFilmstrip(images) {
    let fs_width = images.length * (SHOT_WIDTH_PX + HPADDING_PX) + HPADDING_PX;
    let fs_height = SHOT_HEIGHT_PX + 2 * VPADDING_PX;
    let fs = createGraphics(fs_width, fs_height);
    fs.background(0);

    // draw film border
    addTopLineText(fs, "ILFORD HP5 PLUS", 2.1, 0, 37.7, 0, FONTS.vcd);
    addBottomLine(fs);

    // draw sprocket holes
    let dx = SPROCKET_HOLE_WIDTH_PX + SPROCKET_HOLE_SPACING_WIDTH_PX;
    let start_x = Math.random() * 0.5 * dx; // Generate random value between 0 and 0.5 times dx
    fs.fill(SPROKET_HOLE_COLOR);
    fs.stroke(SPROKET_HOLE_STROKE_COLOR);
    for (let x = start_x; x < fs_width; x += dx) {
        fs.rect(x, SPROCKET_HOLE_MARGIN_PX, SPROCKET_HOLE_WIDTH_PX, SPROCKET_HOLE_HEIGHT_PX, SPROCKET_HOLE_ROUNDING_PX);
        fs.rect(x, fs_height - SPROCKET_HOLE_MARGIN_PX - SPROCKET_HOLE_HEIGHT_PX, SPROCKET_HOLE_WIDTH_PX, SPROCKET_HOLE_HEIGHT_PX, SPROCKET_HOLE_ROUNDING_PX);
    }

    // draw images
    let x = HPADDING_PX;
    let y = VPADDING_PX;
    for (let i = 0; i < images.length; i++) {
        let img = images[i];
        fs.image(img, x, y, SHOT_WIDTH_PX, SHOT_HEIGHT_PX);
        x += SHOT_WIDTH_PX + HPADDING_PX;
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


function preload() {
    FONTS.vcd = loadFont('VCD_OSD_MONO.ttf');
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