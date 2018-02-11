import argparse
from datetime import timedelta
import json
import numpy as np
from parcels import FieldSet, ParticleSet, JITParticle, AdvectionRK4, ErrorCode
import posixpath
import sys

# list of lat lons corresponding to major coastal cities
locations = {
    "NYC": (40.0, -72.9),
    "Lisbon": (38.0, -11.5),
    "Seattle": (46.0, -133.0),
    "Rio": (-23.0, -40.0),
    "Tokyo": (34.7, 141.5),
    "Sydney": (-33.0, 154.0),
    #"San Francisco": (37.4, -123.8),
    "LA": (32.1, -120.4),
    "Santiago": (-33.0, -83.2),
    "Cape Town": (-34.6, 17.12),
    "Mumbai": (19.0, 72.4),
    #"London": (53.9, 2.30),
    "Hong Kong": (20.3, 116.6),
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

def delete_particle(particle, fieldset, time, dt):
  particle.delete()

def trunc_float(f):
  return int(float(f) * 100) / 100.0

def main(gc_dir, output_file, num_paths, runtime, dt):
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

    #pset.show()

    paths = [[] for i in range(num_paths)]
    for d in range(runtime / dt):
      pset.execute(
          AdvectionRK4,
          runtime=timedelta(days=dt),
          dt=timedelta(days=dt),
          recovery={ErrorCode.ErrorOutOfBounds: delete_particle})

      for (i, particle) in enumerate(pset.particles):
        paths[i].append((trunc_float(particle.lat), trunc_float(particle.lon)))
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
  parser.add_argument('--num-paths', type=int, default=100)
  parser.add_argument('--runtime', type=int, default=365 * 10)
  parser.add_argument('--dt', type=int, default=1)
  args = parser.parse_args()

  main(args.gc_dir, args.output_file, args.num_paths, args.runtime, args.dt)


