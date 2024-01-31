// pimage
let images = [];

let FONTS = {
    vcd: null,
    sans: 'sans-serif',
};

function randrange(min, max) {
    return Math.random() * (max - min) + min;
}

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

function addTopLineText(fs, text, size_mm, margin_top_mm, interval_mm, offset_mm, textfont="sans-serif", text_color=FILM_BORDER_COLOR) {
    if (interval_mm <= 0) {
        interval_mm = SHOT_WIDTH_MM + HPADDING_MM;
    }

    let size_px = size_mm * SCALE;
    let margin_top_px = margin_top_mm * SCALE;
    let interval_px = interval_mm * SCALE;
    let offset_px = offset_mm * SCALE;

    fs.fill(text_color);
    fs.noStroke();
    fs.textSize(size_px);
    fs.textAlign(LEFT, TOP);
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
    hoffset_perc = 0,
    draw_dx_code = true,
    dx_num = 17534,
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

    // random offset to the left, [0.2FW, 0.7FW]
    let h_offset_px = hoffset_perc * FW;
    let MAX_WIDTH = fs.width + h_offset_px;

    fs.push();
    fs.translate(-h_offset_px, 0);

    // draw frame count
    fs.fill(FILM_BORDER_COLOR);
    fs.noStroke();
    fs.textSize(fc_size_px);
    fs.textAlign(CENTER, BOTTOM);
    for (let x = 0, fc = fc_start; x < MAX_WIDTH; x += FW, fc++) {
        fs.text(frameCountToString(fc), x, fs.height - fc_margin_px);
        
        // also add one on top (TODO: make option)
        fs.text(frameCountToString(fc), x, SPROCKET_HOLE_MARGIN_PX);
    }

    // draw frame count 2
    fs.textSize(fc2_size_px);
    for (let x = 0 + FW / 2 + fc2_hoffset_px, fc = fc_start; x < MAX_WIDTH; x += FW, fc++) {
        fs.text(frameCountToString(fc) + "A", x, fs.height - fc2_margin_px);
    }

    // draw frame count 2 triangles
    fs.fill(fc2_tri_inner_color);
    fs.stroke(FILM_BORDER_COLOR);
    fs.textAlign(CENTER, CENTER);
    fs.strokeWeight(1);
    for (let x = 0 + FW / 2; x < MAX_WIDTH; x += FW) {
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
    let delta_x1 = (FW - 2 * dx_code_width_px) / 4;
    let delta_x2 = delta_x1 + FW / 2;
    fs.fill(FILM_BORDER_COLOR);
    fs.noStroke();
    let framenum = fc_start * 2;
    for (let x = 0; x < MAX_WIDTH; x += FW) {
        // fs.rect(x + delta_x1, fs.height - dx_code_height_px, dx_code_width_px, dx_code_height_px);
        // fs.rect(x + delta_x2, fs.height - dx_code_height_px, dx_code_width_px, dx_code_height_px);

        // draw dx code (text)
        let dx1 = drawDX(dx_num, framenum);
        framenum++;
        let dx2 = drawDX(dx_num, framenum);
        framenum++;
        // fs.image(dx1, x + delta_x1, fs.height - dx_code_height_px);
        // fs.image(dx2, x + delta_x2, fs.height - dx_code_height_px);
        fs.image(dx1, x + delta_x1, fs.height - dx_code_height_px, dx_code_width_px, dx_code_height_px);
        fs.image(dx2, x + delta_x2, fs.height - dx_code_height_px, dx_code_width_px, dx_code_height_px);
    }

    fs.pop();
}

function renderFilmstrip(images) {
    let fs_width = images.length * (SHOT_WIDTH_PX + HPADDING_PX) + HPADDING_PX;
    let fs_height = SHOT_HEIGHT_PX + 2 * VPADDING_PX;
    let fs = createGraphics(fs_width, fs_height);
    fs.background(0);

    // draw film border
    // Illford HP5 Plus
    // addTopLineText(fs, "ILFORD HP5 PLUS", 2.1, 0, 37.87, 12, FONTS.vcd);
    // addTopLineText(fs, "5535-12", 1.0, 0.3, 113.61, 35, FONTS.vcd);
    // addBottomLine(fs);

    // Fuji
    SPROKET_HOLE_COLOR = '#000';
    SPROKET_HOLE_STROKE_COLOR = '#d82a'
    FILM_BORDER_COLOR = '#ea2'
    addTopLineText(fs, "FUJI 400", 2.1, 0, 37.87, 6, FONTS.sans);
    addBottomLine(fs, fc_start=-2,
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
        hoffset_perc = 0,
        draw_dx_code = true,
        dx_num = 6284,
        dx_code_width_mm = 12,
        dx_code_height_mm = 2);
    // addTopLineText(fs, "P0958014", 2.1, 0, 9999, 24, FONTS.vcd, '#811');

    // Apply glow effect
    // let fs_blur = createGraphics(fs.width, fs.height);
    // fs_blur.copy(fs, 0, 0, fs.width, fs.height, 0, 0, fs.width, fs.height);
    // fs_blur.filter(ERODE);
    // fs.blend(fs_blur, 0, 0, fs.width, fs.height, 0, 0, fs.width, fs.height, EXCLUSION);
    

    // draw sprocket holes
    let dx = SPROCKET_HOLE_WIDTH_PX + SPROCKET_HOLE_SPACING_WIDTH_PX;
    let start_x = Math.random() * 0.5 * dx; // Generate random value between 0 and 0.5 times dx
    fs.fill(SPROKET_HOLE_COLOR);
    fs.stroke(SPROKET_HOLE_STROKE_COLOR);
    fs.strokeWeight(0.5);
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

function renderContactSheet(filmstrip, num_cols, padding_mm, strip_spacing_mm=1.5) {
    let padding_px = padding_mm * SCALE;
    let strip_spacing_px = strip_spacing_mm * SCALE;
    let cs_width = num_cols * (SHOT_WIDTH_PX + HPADDING_PX) - HPADDING_PX + 2 * padding_px;
    let cs_height = Math.ceil(images.length / num_cols) * (filmstrip.height + strip_spacing_px) - strip_spacing_px + 2 * padding_px;
    let cs = createGraphics(cs_width, cs_height);

    cs.background(0);
    cs.fill(FILM_BORDER_COLOR);
    cs.noStroke();
    cs.push();
    cs.translate(0, padding_px);
    for (let i = 0, j = 0; i < images.length; i += num_cols, j++) {
        let start_x = padding_px + randrange(0.2, 0.8) * HPADDING_PX;
        let x = j * num_cols * (SHOT_WIDTH_PX + HPADDING_PX) + HPADDING_PX;
        let y = j * (filmstrip.height + strip_spacing_px);
        cs.image(filmstrip, start_x - x, y);
    }
    cs.pop();

    cs.fill(0);
    cs.noStroke();
    cs.rect(0, 0, padding_px, cs.height);
    cs.rect(cs.width - padding_px, 0, cs.width, cs.height);

    return cs;
}

function previewDraw() {
    redraw();

    // draw filmstrip
    let fs = renderFilmstrip(images);
    // put fs as image to #filmstripimg
    let fsimg = document.getElementById('filmstripimg');
    fsimg.src = fs.canvas.toDataURL();
    fsimg.style.display = 'block';

    // draw contact sheet
    let cs = renderContactSheet(fs, 5, 3);
    // put cs as image to #contactsheetimg
    let csimg = document.getElementById('contactsheetimg');
    csimg.src = cs.canvas.toDataURL();
    csimg.style.display = 'block';
}


function load_p5_resources() {
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