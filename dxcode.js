const CLK_TRACK = [
    1, 1, 1, 1, 1,
    ...(new Array(26).fill(0).map((_, i) => (i) % 2))
];

function get_num_exp(dx) {
    let exp_code = parseInt(dx % 10);
    if (exp_code === 1) {
        return 12;
    } else if (exp_code === 2) {
        return 20;
    } else if (exp_code === 3) {
        return 24;
    } else if (exp_code === 4) {
        return 36;
    } else if (exp_code === 5) {
        return 48;
    } else if (exp_code === 6) {
        return 60;
    } else if (exp_code === 0) {
        return 72;
    } else {
        return 0;
    }
}


function getDX2(dx) {
    let dx2 = Math.floor(dx / 10);
    return dx2 % 16;
}

function getDX1(dx) {
    let dx1 = Math.floor(dx / 10);
    return (dx1 - getDX2(dx)) / 16;
}

function getParity(dx1, dx2, frameNum) {
    return (dx1 % 2 + dx2 % 2 + frameNum % 2) % 2;
}


function makeDataTrack(dx, frameNum) {
    let dataTrack = new Array(31).fill(0);
    let dx1 = getDX1(dx);
    let dx2 = getDX2(dx);
    console.log("dx1: " + dx1 + ", dx2: " + dx2 + ", frameNum: " + frameNum);

    // bits [0-5] are alternating
    for (let i = 0; i < 6; i++) {
        dataTrack[i] = (i + 1) % 2;
    }

    // 7 bits of dx1 [6-12]
    for (let i = 0; i < 7; i++) {
        dataTrack[12 - i] = (dx1 >> i) % 2;
    }

    // empty bit [13]
    dataTrack[13] = 0;

    // 4 bits of dx2 [14-17] MSB first
    for (let i = 0; i < 4; i++) {
        dataTrack[17 - i] = (dx2 >> i) % 2;
    }

    // 7 bits of frame number [18-24] MSB first
    // if negative, use 2's complement
    if (frameNum < 0) {
        frameNum = 128 + frameNum;
    }
    for (let i = 0; i < 7; i++) {
        dataTrack[24 - i] = (frameNum >> i) % 2;
    }

    // empty
    dataTrack[25] = 0;

    // 1 bit of parity
    dataTrack[26] = getParity(dx1, dx2, frameNum);

    // 4 bits of stop bits
    for (let i = 0; i < 4; i++) {
        dataTrack[i + 27] = i % 2;
    }

    return dataTrack;
}

function drawDX(dx, frameNum, width, height) {
    let bit_width = width / 31;
    let bit_height = height / 2;

    let dxImage = createGraphics(width, height);
    dxImage.noStroke();
    dxImage.background(0);
    
    // dxImage.stroke(255);
    dxImage.noStroke();

    // draw clock track
    for (let i = 0; i < 31; i++) {
        if (CLK_TRACK[i] === 1) {
            dxImage.fill(255);
        } else {
            dxImage.fill(0);
        }
        dxImage.rect(i * bit_width, 0, bit_width, bit_height);
    }

    // draw data track
    let dataTrack = makeDataTrack(dx, frameNum);
    for (let i = 0; i < 31; i++) {
        if (dataTrack[i] === 1) {
            dxImage.fill(255);
        } else {
            dxImage.fill(0);
        }
        dxImage.rect(i * bit_width, bit_height, bit_width, bit_height);
    }

    return dxImage;
}

console.log(CLK_TRACK);