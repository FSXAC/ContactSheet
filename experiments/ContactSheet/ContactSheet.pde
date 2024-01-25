// parameters
Boolean INTERACTIVE = false;

float SHOT_HEIGHT_PX = 400;

float SHOT_WIDTH_MM = 36;
float SHOT_HEIGHT_MM = 24;
float HPADDING_MM = 1.5;
float VPADDING_MM = 5;

float SPROCKET_HOLE_WIDTH_MM = 1.9;
float SPROCKET_HOLE_SPACING_WIDTH_MM = 2.5;
float SPROCKET_HOLE_HEIGHT_MM = 2.7;
float SPROCKET_HOLE_MARGIN_MM = 1.75;
float SPROCKET_HOLE_ROUNDING_MM = 0.65;
//color SPROCKET_HOLE_COLOR = color(255);
// color SPROCKET_HOLE_COLOR = color(200, 150, 50);
color SPROCKET_HOLE_COLOR = color(0);
Boolean SPROCKET_HOLE_STROKE = true;
//color SPROCKET_HOLE_STROKE_COLOR = color(200, 150, 50);
color SPROCKET_HOLE_STROKE_COLOR = color(125);

 String TOP_LINE_1 = "ILFORD HP5 PLUS";
 float TOP_LINE_1_INTERVAL_MM = 37.7;

// String TOP_LINE_1 = "ILFORD                           DELTA 400     PROFESSIONAL";
// float TOP_LINE_1_INTERVAL_MM = 113;

//color FILM_BORDER_COLOR = color(200, 150, 50);
color FILM_BORDER_COLOR = color(255);
//String TOP_LINE_1 = "KODAK ULTRAMAX 400";
//String TOP_LINE_1 = "ROLLEI RETRO 400S";
//float TOP_LINE_1_INTERVAL_MM = 61;

Boolean TOP_LINE_1_INTERVAL_FOLLOW_FRAME = false;
float TOP_LINE_1_TEXT_HEIGHT_MM = 2.1;
float TOP_LINE_1_MARGIN_MM = 0.0;
String TOP_LINE_1_FONT = "VCD_OSD_MONO.ttf";
PFont TOP_LINE_1_PFONT;

float BOTTOM_FRAME_COUNT_TEXT_HEIGHT_MM = 2;
float BOTTOM_FRAME_COUNT_MARGIN_MM = 0.1;
String BOTTOM_FRAME_COUNT_FONT = "VCD_OSD_MONO.ttf";
PFont BOTTOM_FRAME_COUNT_PFONT;
int STARTING_FRAME_COUNT = -2;

Boolean DRAW_BOTTOM_BARS = true;
float BOTTOM_BAR_WIDTH_MM = 12;
float BOTTOM_BAR_HEIGHT_MM = 2;

float BOTTOM_TRI_WIDTH_MM = 1.5;
float BOTTOM_TRI_HEIGHT_MM = 0.8;
float BOTTOM_TRI_BASELINE_OFFSET_MM = 0.8;
float BOTTOM_FRAME_COUNT_SECONDARY_TEXT_HEIGHT_MM = 1.4;
float BOTTOM_FRAME_COUNT_SECONDARY_TEXT_HOFFSET_MM = 1.2;
float BOTTOM_TRI_HOFFSET_MM = -2.1;

int FILMSTRIP_SHOTS_PER_STRIP = 5;

float CONTACT_SHEET_PADDING_MM = 4;
float CONTACT_SHEET_STRIP_PADDING_MM = 2;

// calculated parameters
float SCALE = SHOT_HEIGHT_PX / SHOT_HEIGHT_MM;

float SHOT_WIDTH_PX = SHOT_HEIGHT_PX * 1.5;
float HPADDING_PX = HPADDING_MM * SCALE;
float VPADDING_PX = VPADDING_MM * SCALE;

float SPROCKET_HOLE_WIDTH_PX = SPROCKET_HOLE_WIDTH_MM * SCALE;
float SPROCKET_HOLE_SPACING_WIDTH_PX = SPROCKET_HOLE_SPACING_WIDTH_MM * SCALE;
float SPROCKET_HOLE_HEIGHT_PX = SPROCKET_HOLE_HEIGHT_MM * SCALE;
float SPROCKET_HOLE_MARGIN_PX = SPROCKET_HOLE_MARGIN_MM * SCALE;
float SPROCKET_HOLE_ROUNDING_PX = SPROCKET_HOLE_ROUNDING_MM * SCALE;

float TOP_LINE_1_INTERVAL_PX = TOP_LINE_1_INTERVAL_FOLLOW_FRAME ? (SHOT_WIDTH_PX + HPADDING_PX) : TOP_LINE_1_INTERVAL_MM * SCALE;
float TOP_LINE_1_TEXT_HEIGHT_PX = TOP_LINE_1_TEXT_HEIGHT_MM * SCALE;
float TOP_LINE_1_MARGIN_PX = TOP_LINE_1_MARGIN_MM * SCALE;

float BOTTOM_FRAME_COUNT_TEXT_HEIGHT_PX = BOTTOM_FRAME_COUNT_TEXT_HEIGHT_MM * SCALE;
float BOTTOM_FRAME_COUNT_MARGIN_PX = BOTTOM_FRAME_COUNT_MARGIN_MM * SCALE;
float BOTTOM_FRAME_COUNT_INTERVAL_PX = SHOT_WIDTH_PX + HPADDING_PX;

float BOTTOM_BAR_WIDTH_PX = BOTTOM_BAR_WIDTH_MM * SCALE;
float BOTTOM_BAR_HEIGHT_PX = BOTTOM_BAR_HEIGHT_MM * SCALE;

float BOTTOM_FRAME_COUNT_SECONDARY_TEXT_HEIGHT_PX = BOTTOM_FRAME_COUNT_SECONDARY_TEXT_HEIGHT_MM * SCALE;
float BOTTOM_TRI_WIDTH_PX = BOTTOM_TRI_WIDTH_MM * SCALE;
float BOTTOM_TRI_HEIGHT_PX = BOTTOM_TRI_HEIGHT_MM * SCALE;
float BOTTOM_TRI_BASELINE_OFFSET_PX = BOTTOM_TRI_BASELINE_OFFSET_MM * SCALE;
float BOTTOM_FRAME_COUNT_SECONDARY_TEXT_HOFFSET_PX = BOTTOM_FRAME_COUNT_SECONDARY_TEXT_HOFFSET_MM * SCALE;
float BOTTOM_TRI_HOFFSET_PX = BOTTOM_TRI_HOFFSET_MM * SCALE;

float CONTACT_SHEET_PADDING_PX = CONTACT_SHEET_PADDING_MM * SCALE;
float CONTACT_SHEET_STRIP_PADDING_PX = CONTACT_SHEET_STRIP_PADDING_MM * SCALE;

String folder_selected;

void folderSelected(File selection) {
    if (selection == null) {
        println("Window was closed or the user hit cancel.");
        exit();
    } else {
        folder_selected = selection.getAbsolutePath();
        println("Loading images from " + folder_selected);
    }
}

void settings() {
    if (INTERACTIVE) {
        size(1000, 800);
        smooth();
    }
}

void processImage(PImage img) {
    // check if already processed
    if (img.width == SHOT_WIDTH_PX) {
        return;
    }

    // resize image
    img.resize((int) SHOT_WIDTH_PX, (int) SHOT_HEIGHT_PX);
}

PImage processVerticalImage(PImage img) {
    if (img.width == SHOT_WIDTH_PX) {
        return img;
    }

    // need to create a new img object with pixel array rotated
    PImage img2 = createImage(img.height, img.width, RGB);
    img2.loadPixels();
    img.loadPixels();
    for (int i = 0; i < img.pixels.length; i++) {
        int x = i % img.width;
        int y = i / img.width;
        int x2 = y;
        int y2 = img.width - x - 1;
        img2.pixels[y2 * img2.width + x2] = img.pixels[i];
    }
    img2.updatePixels();
    
    // replace img with img2
    img2.resize((int) SHOT_WIDTH_PX, (int) SHOT_HEIGHT_PX);
    return img2;
}

String framecountToString(int framecount) {
    switch (framecount) {
        case -1:
            return "00";
        case -2:
            return "X";
        default:
            return str(framecount);
    }
}

// ====================

ArrayList<PImage> photos;
PGraphics filmstrip;
PImage filmstrip_bottom_bar;
ArrayList<PImage> filmstrip_strips;

void setup() {

    // random
    randomSeed(second());

    // Load images from folder
    selectFolder("Select a folder to process:", "folderSelected");
    while (folder_selected == null) {
        delay(500);
        println("Waiting for selection...");
    }

    photos = new ArrayList<PImage>();
    File file = new File(folder_selected);
    String[] names = file.list();
    names = sort(names);

    // load images (using requestImage() to load asynchronously)
    println("Loading images...");
    for (String name : names) {
        if (name.endsWith(".jpeg")) {
            photos.add(requestImage(folder_selected + "/" + name));
            print(name + " ");
        }
    }

    // wait for all images to load
    Boolean all_loaded = false;
    while (!all_loaded) {
        all_loaded = true;
        for (PImage img : photos) {
            if (img.width == -1) {
                println("Error loading image");
                exit();
            }

            // if image is not loaded yet, wait
            if (img.width == 0) {
                all_loaded = false;
            } else {
                // if image is vertical, rotate it to be horizontal
                if (img.height > img.width) {
                    photos.set(photos.indexOf(img), processVerticalImage(img));
                } else {
                    processImage(img);
                }
            }
        }
    }

    println("All images loaded");

    // Load fonts
    TOP_LINE_1_PFONT = createFont(TOP_LINE_1_FONT, 1);

    // Create bottom bar image
    // filmstrip_bottom_bar = createImage((int) BOTTOM_BAR_WIDTH_PX, (int) BOTTOM_BAR_HEIGHT_PX, RGB);
    // filmstrip_bottom_bar.loadPixels();
    // for (int i = 0; i < filmstrip_bottom_bar.pixels.length; i++) {
    //     filmstrip_bottom_bar.pixels[i] = color(255, 50);
    // }
    // filmstrip_bottom_bar.updatePixels();
    filmstrip_bottom_bar = loadImage("fakebar.jpg");
    filmstrip_bottom_bar.resize((int) BOTTOM_BAR_WIDTH_PX, (int) BOTTOM_BAR_HEIGHT_PX);
    // tint to FILM_BORDER_COLOR
    filmstrip_bottom_bar.loadPixels();
    for (int i = 0; i < filmstrip_bottom_bar.pixels.length; i++) {
        if (brightness(filmstrip_bottom_bar.pixels[i]) > 50) {
            filmstrip_bottom_bar.pixels[i] = FILM_BORDER_COLOR;
        } else {
            filmstrip_bottom_bar.pixels[i] = color(0);
        }
    }
    filmstrip_bottom_bar.updatePixels();

    // Create filmstrip image to lay out photos
    int fs_width = (int) (photos.size() * (SHOT_WIDTH_PX + HPADDING_PX) + HPADDING_PX);
    int fs_height = (int) (SHOT_HEIGHT_PX + 2 * VPADDING_PX);
    filmstrip = createGraphics(fs_width, fs_height);

    // Draw on filmstrip: black background
    filmstrip.beginDraw();
    filmstrip.background(0);

    // Draw top line 1
    filmstrip.textFont(TOP_LINE_1_PFONT);
    filmstrip.textSize(TOP_LINE_1_TEXT_HEIGHT_PX);
    filmstrip.fill(FILM_BORDER_COLOR);
    filmstrip.textAlign(LEFT, TOP);
    for (int x = (int) random(TOP_LINE_1_INTERVAL_PX / 2); x < filmstrip.width; x += TOP_LINE_1_INTERVAL_PX) {
        filmstrip.text(TOP_LINE_1, x, TOP_LINE_1_MARGIN_PX);
    }

    // Draw frame count
    // filmstrip.textFont(BOTTOM_FRAME_COUNT_PFONT);
    filmstrip.textSize(BOTTOM_FRAME_COUNT_TEXT_HEIGHT_PX);
    filmstrip.fill(FILM_BORDER_COLOR);
    filmstrip.textAlign(CENTER, BOTTOM);
    float framecount_x_offset = random(0.1, 0.7) * BOTTOM_FRAME_COUNT_INTERVAL_PX;
    // debug
    // framecount_x_offset = 0;
    for (int i = 0; i < photos.size(); i++) {
        String framecount = framecountToString(STARTING_FRAME_COUNT + i);
        filmstrip.text(framecount, framecount_x_offset + i * BOTTOM_FRAME_COUNT_INTERVAL_PX, filmstrip.height - BOTTOM_FRAME_COUNT_MARGIN_PX);
    }

    // Draw small frame count (half frame offset from main frame count)
    filmstrip.textSize(BOTTOM_FRAME_COUNT_SECONDARY_TEXT_HEIGHT_PX);
    filmstrip.fill(FILM_BORDER_COLOR);
    filmstrip.textAlign(CENTER, CENTER);
    for (int i = 0; i < photos.size(); i++) {
        String framecount = framecountToString(STARTING_FRAME_COUNT + i) + "A";
        filmstrip.push();
        filmstrip.translate(framecount_x_offset + (i + 0.5) * BOTTOM_FRAME_COUNT_INTERVAL_PX, filmstrip.height - BOTTOM_TRI_BASELINE_OFFSET_PX);

        // filmstrip.push();
        // filmstrip.translate(0, filmstrip.height - BOTTOM_FRAME_COUNT_MARGIN_PX);
        filmstrip.text(framecount, BOTTOM_FRAME_COUNT_SECONDARY_TEXT_HOFFSET_PX, 0);
        // filmstrip.pop();

        // Draw a triangle
        filmstrip.fill(FILM_BORDER_COLOR);
        // filmstrip.stroke(255, 0, 0);
        float tri_left = BOTTOM_TRI_HOFFSET_PX;
        filmstrip.triangle(
            tri_left, BOTTOM_TRI_HEIGHT_PX/2,
            tri_left + BOTTOM_TRI_WIDTH_PX, 0,
            tri_left, -BOTTOM_TRI_HEIGHT_PX/2
        );

        filmstrip.pop();
    }

    // Draw bottom bar
    // filmstrip.blendMode(DIFFERENCE);
    if (DRAW_BOTTOM_BARS) {
        for (int x = (int) (-0.42 * BOTTOM_FRAME_COUNT_INTERVAL_PX + framecount_x_offset); x < filmstrip.width; x += BOTTOM_FRAME_COUNT_INTERVAL_PX) {
            filmstrip.image(filmstrip_bottom_bar, x, filmstrip.height - BOTTOM_BAR_HEIGHT_PX, BOTTOM_BAR_WIDTH_PX, BOTTOM_BAR_HEIGHT_PX);
            filmstrip.image(filmstrip_bottom_bar, x + (0.5 * BOTTOM_FRAME_COUNT_INTERVAL_PX), filmstrip.height - BOTTOM_BAR_HEIGHT_PX, BOTTOM_BAR_WIDTH_PX, BOTTOM_BAR_HEIGHT_PX);
        }
    }
    // filmstrip.blendMode(BLEND);

    // Draw on filmstrip the sprocket holes
    float sprocket_width_inc_size = SPROCKET_HOLE_WIDTH_PX + SPROCKET_HOLE_SPACING_WIDTH_PX;
    filmstrip.fill(SPROCKET_HOLE_COLOR);
    if (SPROCKET_HOLE_STROKE) {
        filmstrip.stroke(SPROCKET_HOLE_STROKE_COLOR);
        filmstrip.strokeWeight(0.5f);
    } else {
        filmstrip.noStroke();
    }
    for (int x = 0; x < filmstrip.width; x += sprocket_width_inc_size) {
        filmstrip.rect(x, SPROCKET_HOLE_MARGIN_PX, SPROCKET_HOLE_WIDTH_PX, SPROCKET_HOLE_HEIGHT_PX, SPROCKET_HOLE_ROUNDING_PX);
        filmstrip.rect(x, filmstrip.height - SPROCKET_HOLE_MARGIN_PX - SPROCKET_HOLE_HEIGHT_PX, SPROCKET_HOLE_WIDTH_PX, SPROCKET_HOLE_HEIGHT_PX, SPROCKET_HOLE_ROUNDING_PX);
    }

    // Put photos on filmstrip
    int x = (int) HPADDING_PX;
    int y = (int) VPADDING_PX;
    for (PImage img : photos) {
        filmstrip.image(img, x, y);
        x += SHOT_WIDTH_PX + HPADDING_PX;
    }

    filmstrip.endDraw();

    // Cut filmstrip into strips
    filmstrip_strips = new ArrayList<PImage>();
    for (int i = 0; i < photos.size(); i += FILMSTRIP_SHOTS_PER_STRIP) {
        float starting_w = i * (SHOT_WIDTH_PX + HPADDING_PX);
        float cut_w = FILMSTRIP_SHOTS_PER_STRIP * (SHOT_WIDTH_PX + HPADDING_PX) + (0.5 * HPADDING_PX);
        float ending_w = starting_w + cut_w;

        // NOTE: for some reason need to adjust by 1px per cut
        starting_w -= (0.5* i / FILMSTRIP_SHOTS_PER_STRIP);

        starting_w = max(starting_w, 0);
        ending_w = min(ending_w, filmstrip.width);

        PImage strip = filmstrip.get((int) starting_w, 0, (int) (ending_w - starting_w), filmstrip.height);
        filmstrip_strips.add(strip);
    }

    // Save filmstrip
    if (!INTERACTIVE) {

        // Save full filmstrip
        filmstrip.save(folder_selected + "/FILMSTRIP_FULL.png");

        // Draw and save contact sheet
        float contact_sheet_width = FILMSTRIP_SHOTS_PER_STRIP * (SHOT_WIDTH_PX + HPADDING_PX) + HPADDING_PX + (2 * CONTACT_SHEET_PADDING_PX);
        float contact_sheet_height = ceil(photos.size() / FILMSTRIP_SHOTS_PER_STRIP + 1) * (filmstrip.height + CONTACT_SHEET_STRIP_PADDING_PX) + CONTACT_SHEET_STRIP_PADDING_PX + (2 * CONTACT_SHEET_PADDING_PX);
        PGraphics contact_sheet = createGraphics((int) contact_sheet_width, (int) contact_sheet_height);

        contact_sheet.beginDraw();
        contact_sheet.background(0);
        contact_sheet.fill(255);
        contact_sheet.noStroke();
        contact_sheet.translate(CONTACT_SHEET_PADDING_PX, CONTACT_SHEET_PADDING_PX);
        // contact_sheet.rotate(random(-0.1, 0.1));
        for (int i = 0; i < filmstrip_strips.size(); i++) {
            float strip_x = 0;
            float strip_y = i * (filmstrip_strips.get(i).height + CONTACT_SHEET_STRIP_PADDING_PX);
            contact_sheet.image(filmstrip_strips.get(i), strip_x, strip_y);
        }
        contact_sheet.endDraw();

        contact_sheet.save(folder_selected + "/CONTACT_SHEET.png");
        exit();
    }
}

void draw() {
    background(0);

    if (photos == null || photos.size() == 0) {
        delay(500);
        return;
    }

    if (filmstrip == null) {
        delay(500);
        return;
    }

    // display filmstrip
    // push();
    // translate(map(mouseX, 0, width, 0, -filmstrip.width + width), 0);
    // image(filmstrip, 0, 0);
    // pop();

    // display filmstrip by splitting it for every 6 photos
    // int x = 0;
    // int y = 0;
    // image(filmstrip, x, y);
    // while (x < filmstrip.width) {
    //     x -= (int) (6 * (SHOT_WIDTH_PX + HPADDING_PX));
    //     y += filmstrip.height;
    //     image(filmstrip, x, y);
    // }

    // display filmstrip by splitting it for every 6 photos
    push();
    translate(CONTACT_SHEET_PADDING_PX, CONTACT_SHEET_PADDING_PX);
    for (int i = 0; i < filmstrip_strips.size(); i++) {
        float x = 0;
        float y = i * (filmstrip_strips.get(i).height + CONTACT_SHEET_STRIP_PADDING_PX);
        image(filmstrip_strips.get(i), x, y);
    }
    pop();
    
    // exit();
}
