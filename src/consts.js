import { MAX_LAT_METERS, MAX_LON_METERS } from "./actions/trash.js";

export const CANVAS_WIDTH = 640;
export const CANVAS_HEIGHT = CANVAS_WIDTH * MAX_LAT_METERS / MAX_LON_METERS;

export const CITIES = [
  'Rio',
  'Tokyo',
  'Sydney',
  'NYC',
  'Lisbon',
  'Seattle',
  'LA',
  'Santiago',
  'Cape Town',
  'Mumbai',
  'Hong Kong',
];
