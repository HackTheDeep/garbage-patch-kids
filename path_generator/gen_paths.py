import argparse
from datetime import timedelta
import json
import numpy as np
from parcels import FieldSet, ParticleSet, JITParticle, AdvectionRK4, ErrorCode
import posixpath
import sys

max_days = 365 * 5

# list of lat lons corresponding to major coastal cities
locations = {
    "NYC": (40.0, -72.9),
    "Lisbon": (38.0, -11.5),
    "Seattle": (46.0, -133.0),
    "Rio": (-23.0, -40.0),
    "Tokyo": (34.7, 141.5),
    "Sydney": (-33.0, 154.0),
    "Test": (30.0, -130.0),
}

def get_range(center, range_len, wiggle_factor=100.0):
  range_min = int(center * wiggle_factor) - range_len / 2
  range_max = int(center * wiggle_factor) + range_len - (range_len / 2)
  return [x / wiggle_factor for x in range(range_min, range_max)]

def second_largest_divisor(n):
  for i in range(n - 1, 1, -1):
    if n % i == 0:
      return i
  return 1

def DeleteParticle(particle, fieldset, time, dt):
  particle.delete()

def main(gc_dir, output_file, num_paths, dt):
  filepaths = "%s/*.nc" % gc_dir
  filenames = {'U': filepaths, 'V': filepaths}
  variables = {'U': 'eastward_eulerian_current_velocity', 'V': 'northward_eulerian_current_velocity'}
  dimensions = {'lat': 'lat', 'lon': 'lon', 'time': 'time'}
  fieldset = FieldSet.from_netcdf(filenames, variables, dimensions, allow_time_extrapolation=True)

  output = {}

  for (loc_name, loc) in locations.iteritems():
    lat_range = get_range(loc[0], second_largest_divisor(num_paths), 100.0)
    lon_range = get_range(loc[1], num_paths / second_largest_divisor(num_paths), 100.0)
    lats, lons = np.meshgrid(lat_range, lon_range)

    pset = ParticleSet(fieldset=fieldset, pclass=JITParticle, lon=lons, lat=lats)

    pset.show()

    paths = [[] for i in range(num_paths)]
    for d in range(max_days):
      pset.execute(
          AdvectionRK4,
          runtime=timedelta(days=dt),
          dt=timedelta(days=dt),
          recovery={ErrorCode.ErrorOutOfBounds: DeleteParticle})

      for (i, particle) in enumerate(pset.particles):
        paths[i].append((float(particle.lat), float(particle.lon)))
        i += 1

    output[loc_name] = paths

    pset.show(savefile=posixpath.join("../path_images", loc_name))

  out = open(output_file, 'w')
  out.write(json.dumps(output))



if __name__ == "__main__":
  # Parse CLI arguments
  parser = argparse.ArgumentParser()
  parser.add_argument('--gc-dir', type=str)
  parser.add_argument('--output-file', type=str)
  parser.add_argument('--num-paths', type=int, default=5)
  parser.add_argument('--dt', type=int, default=1)
  args = parser.parse_args()

  main(args.gc_dir, args.output_file, args.num_paths, args.dt)


