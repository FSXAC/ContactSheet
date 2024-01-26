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