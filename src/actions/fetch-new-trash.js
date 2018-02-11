import Proj4js from 'proj4';

const LENGTH = 10;

const MAX_LON_METERS = 20037508.3428;
const MAX_LAT_METERS = 19971868.8804;

// source coordinates in Longitude/Latitude, WGS84
const source = new Proj4js.Proj('EPSG:4326');

// destination coordinates in meters, global spherical mercators projection
// see http://spatialreference.org/ref/epsg/3785/
const destination = new Proj4js.Proj('EPSG:3785');

// from https://stackoverflow.com/questions/6878761/javascript-how-to-create-random-longitude-and-latitudes
function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  // .toFixed() returns string, so ' * 1' converts to number
}

function convertLatLon(lat, lon) {
  let latLonPoint = Proj4js.toPoint([lon, lat]);

  let meterPoint = Proj4js.transform(source, destination, latLonPoint);

  return {x: meterPoint.x, y: meterPoint.y};
}

function convertMetersToX(lonMeters, width) {
  let adjustedMeters = lonMeters + MAX_LON_METERS;
  return Math.floor((adjustedMeters / (MAX_LON_METERS * 2)) * width);
}

function convertMetersToY(latMeters, height) {
  let adjustedMeters = latMeters + MAX_LAT_METERS;
  return Math.floor((adjustedMeters / (MAX_LAT_METERS * 2)) * height);
}

export const fetchNewTrash = function (mapWidth, mapHeight) {
  let lat = getRandomInRange(-85, 85, 3);
  let lon = getRandomInRange(-180, 180, 3);

  let point = convertLatLon(lat, lon);

  let trashPoints = [];

  for (let i = 0; i < LENGTH; i++) {
    trashPoints.push({
      lat: lat,
      lon: lon,
      x: convertMetersToX(point.x, mapWidth),
      y: convertMetersToY(point.y, mapHeight)
    });

    // move to random next point
    lat = getRandomInRange(lat - 1, lat + 1, 3);
    lon = getRandomInRange(lon - 1, lon + 1, 3);
  }

  return {
    type: 'FETCH_NEW_TRASH',
    trash: trashPoints,
  }
};
