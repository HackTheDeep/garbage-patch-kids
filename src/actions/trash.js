import Proj4js from 'proj4';

const LENGTH = 1000;

const MAX_LON_METERS = 20037508.3428;
const MAX_LAT_METERS = 19971868.8804;

// source coordinates in Longitude/Latitude, WGS84
const source = new Proj4js.Proj('EPSG:4326');

// destination coordinates in meters, global spherical mercators projection
// see http://spatialreference.org/ref/epsg/3785/
// note: number in link doesn't match the number in the spec, thanks deprecation of standards
const destination = new Proj4js.Proj('EPSG:3857');

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

  let trashPoints = [];

  for (let i = 0; i < LENGTH; i++) {
    let point = convertLatLon(lat, lon);

    trashPoints.push({
      lat: lat,
      lon: lon,
      x: convertMetersToX(point.x, mapWidth),
      y: convertMetersToY(point.y, mapHeight)
    });

    // move to random next point
    lat = getRandomInRange(Math.max(-85, lat - 3), Math.min(85, lat + 3), 3);
    lon = getRandomInRange(Math.max(-180, lon - 3), Math.min(180, lon + 3), 3);
  }

  return {
    type: 'FETCH_NEW_TRASH',
    trash: trashPoints,
  }
};

export const removeTrash = id => ({
  type: 'REMOVE_TRASH',
  id
});
