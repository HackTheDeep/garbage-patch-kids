import Proj4js from 'proj4';

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

export const fetchNewTrash = function () {
  let lat = getRandomInRange(-90, 90, 3);
  let lon = getRandomInRange(-180, 180, 3);

  let latLonPoint = Proj4js.toPoint([lon, lat]);

  let meterPoint = Proj4js.transform(source, destination, latLonPoint);

  return {
    type: 'FETCH_NEW_TRASH',
    lat: lat,
    lon: lon,
    x: meterPoint.x,
    y: meterPoint.y
  }
};
