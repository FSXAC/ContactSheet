long DX_NUM = 17534;
Boolean INC_HALF_FRAME = true;
Boolean RENDER_NEGATIVE = false;

int[] CLK_TRACK = new int[31];

int getNumExp(long dx) {
    int exp_code = (int) (dx % 10);
    if (exp_code == 1) {
        return 12;
    } else if (exp_code == 2) {
        return 20;
    } else if (exp_code == 3) {
        return 24;
    } else if (exp_code == 4) {
        return 36;
    } else if (exp_code == 5) {
        return 48;
    } else if (exp_code == 6) {
        return 60;
    } else if (exp_code == 0) {
        return 72;
    } else {
        return 0;
    }
}

int getDX2(long dx) {
    int dx2 = (int) (dx / 10);
    return (dx2 % 16);
}

int getDX1(long dx) {
    int dx1 = (int) (dx / 10);
    return (dx1 - getDX2(dx)) / 16;
}

int getParity(int dx1, int dx2, int frameNum) {
    return ((dx1 % 2) + (dx2 % 2) + (frameNum % 2)) % 2;
}

void populateClockTrack() {
    // bits 0-5: 1
    // bits 6-29: i
    // bits 30-31: 1
    for (int i = 0; i < 31; i++) {
        if (i < 5 || i >= 29) {
            CLK_TRACK[i] = 1;
        } else {
            CLK_TRACK[i] = (i + 1) % 2;
        }
    }
}

int[] makeDataTrack(long dx, int frameNum) {
    int[] dataTrack = new int[31];
    int dx1 = getDX1(dx);
    int dx2 = getDX2(dx);
    println("dx1: " + dx1 + ", dx2: " + dx2 + ", frameNum: " + frameNum);

    // bits [0-5] are alternating
    for (int i = 0; i < 6; i++) {
        dataTrack[i] = (i + 1) % 2;
    }

    // 7 bits of dx1 [6-12]
    for (int i = 0; i < 7; i++) {
        dataTrack[12 - i] = (dx1 >> i) % 2;
        // println("dx1[" + i + "]: " + dataTrack[i + 6]);
    }

    // empty bit [13]
    dataTrack[13] = 0;

    // 4 bits of dx2 [14-17] MSB first
    for (int i = 0; i < 4; i++) {
        dataTrack[17 - i] = (dx2 >> i) % 2;
    }

    // 7 bits of frame number [18-24] MSB first
    // if negative, use 2's complement
    if (frameNum < 0) {
        frameNum = 128 + frameNum;
    }
    for (int i = 0; i < 7; i++) {
        dataTrack[24 - i] = (frameNum >> i) % 2;
    }

    // empty
    dataTrack[25] = 0;

    // 1 bit of parity
    dataTrack[26] = getParity(dx1, dx2, frameNum);

    // 4 bits of stop bits
    for (int i = 0; i < 4; i++) {
        dataTrack[i + 27] = i % 2;
    }

    return dataTrack;
}

PGraphics drawDX(long dx, int frameNum, float imgw, float imgh) {

    // int gwidth = (int) (DX_BIT_WIDTH * DX_SCALE * 31);
    // int gheight = (int) (DX_BIT_HEIGHT * DX_SCALE * 2);

    float bit_width = imgw / 31;
    float bit_height = imgh / 2;

    PGraphics g = createGraphics((int) imgw, (int) imgh);
    g.beginDraw();
    g.noStroke();
    if (RENDER_NEGATIVE) {
      
        g.background(255);
        g.fill(0);
        g.stroke(0);
    } else {
        g.background(0);
        g.fill(255);
        g.stroke(255);
    }

    // draw clock track
    for (int i = 0; i < 31; i++) {
        if (CLK_TRACK[i] == 1) {
            // g.rect(i * DX_SCALE * DX_BIT_WIDTH, 0, DX_SCALE * DX_BIT_WIDTH, DX_SCALE * DX_BIT_HEIGHT);
            g.rect(i * bit_width, 0, bit_width, bit_height);
        }
    }

    // compose data track
    int[] dataTrack = makeDataTrack(dx, frameNum);

    // draw data track
    for (int i = 0; i < 31; i++) {
        if (dataTrack[i] == 1) {
            // g.rect(i * DX_SCALE * DX_BIT_WIDTH, DX_SCALE * DX_BIT_HEIGHT, DX_SCALE * DX_BIT_WIDTH, DX_SCALE * DX_BIT_HEIGHT);
            g.rect(i * bit_width, bit_height, bit_width, bit_height);
        }
    }

    g.endDraw();
    return g;
}

ArrayList<PGraphics> dxs;

// ===
void settings() {
    size(1280, 900);
}

void setup() {
    populateClockTrack();
    dxs = new ArrayList<PGraphics>();
    for (int f = -3; f < 38; f++) {
        dxs.add(drawDX(DX_NUM, f, 300, 50));
    }
}

void draw() {
    background(0, 50, 0);
    blendMode(ADD);
    push();
    translate(0, map(mouseY, 0, height, 0, -50 * 38));
    for (int i = 0; i < dxs.size(); i++) {
        // image(dxs.get(i), 0, i * DX_SCALE * DX_BIT_HEIGHT * 2 + (i * 10));
        image(dxs.get(i), 0, i * 50 + (i * 10));
    }
    pop();
}
