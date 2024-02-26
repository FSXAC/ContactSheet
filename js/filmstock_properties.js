// various physical film properties

// this is the preview height in pixels
const PREVIEW_HEIGHT = 150;

// physical film dimensions in mm
const SHOT_WIDTH_MM = 36;
const SHOT_HEIGHT_MM = 24;
const HPADDING_MM = 1.8;
const VPADDING_MM = 5.5;

const SPROCKET_HOLE_WIDTH_MM = 1.981;
const SPROCKET_HOLE_SPACING_WIDTH_MM = 2.7688;
const SPROCKET_HOLE_HEIGHT_MM = 2.794;
const SPROCKET_HOLE_MARGIN_MM = 2.0185;
const SPROCKET_HOLE_ROUNDING_MM = 0.5;

let SPROKET_HOLE_COLOR = "#000";
let SPROKET_HOLE_STROKE_COLOR = "#444";

let FILM_BORDER_COLOR = "#ccc";

// based on preview height, calculate the scale factor mm -> px
const SCALE = PREVIEW_HEIGHT / SHOT_HEIGHT_MM;

// calculate the remaining dimensions in px
const SHOT_WIDTH_PX = SHOT_WIDTH_MM * SCALE;
const SHOT_HEIGHT_PX = SHOT_HEIGHT_MM * SCALE;
const HPADDING_PX = HPADDING_MM * SCALE;
const VPADDING_PX = VPADDING_MM * SCALE;
const SPROCKET_HOLE_WIDTH_PX = SPROCKET_HOLE_WIDTH_MM * SCALE;
const SPROCKET_HOLE_SPACING_WIDTH_PX = SPROCKET_HOLE_SPACING_WIDTH_MM * SCALE;
const SPROCKET_HOLE_HEIGHT_PX = SPROCKET_HOLE_HEIGHT_MM * SCALE;
const SPROCKET_HOLE_MARGIN_PX = SPROCKET_HOLE_MARGIN_MM * SCALE;
const SPROCKET_HOLE_ROUNDING_PX = SPROCKET_HOLE_ROUNDING_MM * SCALE;

// const ILFORD_HP5 = {
//     name: "ILFORD HP5 PLUS",
//     top_line: "ILFORD HP5 PLUS",
//     top_line_interval_mm: 37.7,
//     top_line_follow_frame: false,
//     top_line_text_size_mm: 2.1,
//     top_line_margin_mm: 1.5,
// };

// const FILM_STOCKS = [
//     ILFORD_HP5
// ];

class FilmStock {
    constructor(name, top_line, top_line_interval_mm, top_line_follow_frame, top_line_text_size_mm, top_line_margin_mm) {
        this.name = name;
        this.top_line = top_line;
        this.top_line_interval_mm = top_line_interval_mm;
        this.top_line_follow_frame = top_line_follow_frame;
        this.top_line_text_size_mm = top_line_text_size_mm;
        this.top_line_margin_mm = top_line_margin_mm;
    }
}


// create a dictionary of film stock properties
const FILM = {
    'fuji-400': {
        'name': 'Fujifilm 400',
        'icon': 'fuji400_icon.png',
        'enabled': true,
        'active': true,
        'dx_code': '906824',
    },
    'ilf-hp5-400': {
        'name': 'Ilford HP5 400',
        'icon': 'ilfordhp5plus400_icon.png',
        'enabled': true,
        'dx_code': '017534',
    },
    'kentmere-400': {
        'name': 'Kentmere Pan 400',
        'icon': 'kentmerepan400_icon.png',
        'enabled': true,
        'dx_code': '017704',
    },
    'kentmere-100': {
        'name': 'Kentmere Pan 100',
        'icon': 'kentmerepan100_icon.png',
        'enabled': true,
        'dx_code': -1,
    },
    'ilf-sfx-200': {
        'name': 'Ilford SFX 200',
        'icon': 'ilfordsfx200_icon.png',
        'enabled': true,
        'dx_code': '017354',
    },
    'ilf-delta-400': {
        'name': 'Ilford Delta 400',
        'icon': 'ilforddelta400_icon.png',
        'enabled': true,
        'dx_code': '017523',
    },
    'ilf-delta-3200': {
        'name': 'Ilford Delta 3200',
        'icon': 'unknown_roll_icon.png',
        'enabled': false,
        'dx_code': -1,
    },
    'ilf-delta-100': {
        'name': 'Ilford Delta 100',
        'icon': 'unknown_roll_icon.png',
        'enabled': false,
        'dx_code': -1,
    },
    'ilf-fp4-125': {
        'name': 'Ilford FP4 125',
        'icon': 'unknown_roll_icon.png',
        'enabled': false,
        'dx_code': -1,
    },
    'ilf-panf-50': {
        'name': 'Ilford Pan F 50',
        'icon': 'unknown_roll_icon.png',
        'enabled': false,
        'dx_code': -1,
    },
    'kodak-ultra-400': {
        'name': 'Kodak UltraMax 400',
        'icon': 'kodakultra400_icon.png',
        'enabled': true,
        'dx_code': '915373',
    },
    'kodak-portra-400': {
        'name': 'Kodak Portra 400',
        'icon': 'unknown_roll_icon.png',
        'enabled': false,
        'dx_code': -1,
    },
    'kodak-portra-160': {
        'name': 'Kodak Portra 160',
        'icon': 'unknown_roll_icon.png',
        'enabled': false,
        'dx_code': -1,
    },
    'kodak-tmax-400': {
        'name': 'Kodak T-Max 400',
        'icon': 'unknown_roll_icon.png',
        'enabled': false,
        'dx_code': -1,
    },
    'kodak-tmax-3200': {
        'name': 'Kodak T-Max 3200',
        'icon': 'unknown_roll_icon.png',
        'enabled': false,
        'dx_code': -1,
    },
    'kodak-tmax-100': {
        'name': 'Kodak T-Max 100',
        'icon': 'unknown_roll_icon.png',
        'enabled': false,
        'dx_code': -1,
    },
    'kodak-trix-400': {
        'name': 'Kodak Tri-X 400',
        'icon': 'unknown_roll_icon.png',
        'enabled': false,
        'dx_code': -1,
    },
    'kodak-ektar-100': {
        'name': 'Kodak Ektar 100',
        'icon': 'unknown_roll_icon.png',
        'enabled': false,
        'dx_code': -1,
    },
    'kodak-gold-200': {
        'name': 'Kodak Gold 200',
        'icon': 'unknown_roll_icon.png',
        'enabled': true,
        'dx_code': '512504',
    },
    'kodak-colorplus-200': {
        'name': 'Kodak ColorPlus 200',
        'icon': 'unknown_roll_icon.png',
        'enabled': false,
        'dx_code': -1,
    },
    'kodak-proimage-100': {
        'name': 'Kodak ProImage 100',
        'icon': 'unknown_roll_icon.png',
        'enabled': true,
        'dx_code': '512574',
    },
    'rollei-retro-400s': {
        'name': 'Rollei Retro 400s',
        'icon': 'unknown_roll_icon.png',
        'enabled': true,
        'dx_code': '854011',
    },
}

function populateFilmStocks() {
    let filmstockContainer = document.getElementById('filmSelect');
    filmstockContainer.innerHTML = "";

    for (let key in FILM) {
        let filmstock = FILM[key];

        let filmstock_el = document.createElement('div');
        let icon = filmstock.icon;
        let name = filmstock.name;
        filmstock_el.classList.add('filmstock');
        if (filmstock.active) {
            filmstock_el.classList.add('active');
        }

        filmstock_el.id = key;

        filmstock_el.innerHTML = `
        <img src="img/filmrolls/${icon}" alt="${name}">
        <p>${name}</p>
        `;

        if (filmstock.enabled) {
            filmstock_el.addEventListener('click', function() {
                selectFilmStock(key);
            });
        } else {
            filmstock_el.classList.add('disabled');
        
        }

        filmstockContainer.appendChild(filmstock_el);
    }
}