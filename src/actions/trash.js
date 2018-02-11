import Proj4js from 'proj4';
import pointInEllipse from 'point-in-ellipse';

import trashJson from './../data/paths_by_city';

const LENGTH = 1000;

export const MAX_LON_METERS = 20037508.3428;
export const MAX_LAT_METERS = 19971868.8804;

// http://latitude.to/articles-by-country/general/337/great-pacific-garbage-patch
const MIDDLE_OF_PATCH_LAT = 38.0;
const MIDDLE_OF_PATCH_LON = -145.0;
const LON_RADIUS = 10.0;
const LAT_RADIUS = 3.5;

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
  let adjustedMeters = (-1 * latMeters) + MAX_LAT_METERS;
  return Math.floor((adjustedMeters / (MAX_LAT_METERS * 2)) * height);
}

function isCaughtInPatch(trashPoint) {
  return pointInEllipse(
    [trashPoint.lon, trashPoint.lat],
    [MIDDLE_OF_PATCH_LON, MIDDLE_OF_PATCH_LAT],
    LON_RADIUS, LAT_RADIUS
  );
}

function removePointsAfterCaught(trashPoints) {
  let sanitized = [];

  const MIN_ITEMS_IN_PATCH = 2;

  let itemsInPatch = 0;

  for (let i = 0; i < trashPoints.length; i++) {
    let trashPoint = trashPoints[i];

    if (isCaughtInPatch(trashPoint)) {
      itemsInPatch++;
    } else {
      itemsInPatch = 0;
    }

    if (itemsInPatch <= MIN_ITEMS_IN_PATCH) {
      sanitized.push(trashPoint);
    } else {
      return sanitized;
    }
  }

  return sanitized;
}

export const fetchCityTrash = function (city, startTime, mapWidth, mapHeight) {
  let trashElementList = trashJson[city];
  let trashElements = trashElementList[startTime % (trashElementList.length)];

  let trashPoints = [];

  trashElements.forEach(trashElement => {
    let lat = trashElement[0];
    let lon = trashElement[1];

    let point = convertLatLon(lat, lon);

    trashPoints.push({
      lat: lat,
      lon: lon,
      x: convertMetersToX(point.x, mapWidth),
      y: convertMetersToY(point.y, mapHeight)
    });
  });

  let sanitized = removePointsAfterCaught(trashPoints);

  return {
    type: 'ADD_TRASH',
    startTime: startTime,
    trash: sanitized,
    endsInPatch: trashPoints.length > sanitized.length,
  }
};

export const fetchNewTrash = function (startTime, mapWidth, mapHeight) {
  // force initial points to be near the garbage patch
  // let lat = getRandomInRange(MIDDLE_OF_PATCH_LAT - (LAT_RADIUS * 2), MIDDLE_OF_PATCH_LAT + (LAT_RADIUS * 2));
  // let lon = getRandomInRange(MIDDLE_OF_PATCH_LON - (LON_RADIUS * 2), MIDDLE_OF_PATCH_LON + (LON_RADIUS * 2));

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

  let sanitized = removePointsAfterCaught(trashPoints);

  return {
    type: 'ADD_TRASH',
    startTime: startTime,
    trash: sanitized,
    endsInPatch: trashPoints.length > sanitized.length,
  }
};

export const removeTrash = id => ({
  type: 'REMOVE_TRASH',
  id
});
