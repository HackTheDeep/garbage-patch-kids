import argparse
from parcels import FieldSet, ParticleSet, JITParticle, AdvectionRK4, ErrorCode
from datetime import timedelta
import numpy as np
import sys

max_days = 365

# list of lat lons corresponding to major coastal cities
locations = {
    "NYC": (40.5, -73.9) # NYC
}

def get_range(center, range_len, wiggle_factor):
  range_min = int(center * wiggle_factor) - range_len / 2
  range_max = int(center * wiggle_factor) + range_len - (range_len / 2)
  return [x / wiggle_factor for x in range(range_min, range_max)]

def second_largest_divisor(n):
  for i in range(n - 1, 1, -1):
    if n % i == 0:
      return i
  return 1

def main(gc_dir, output_dir, num_paths, path_len):
  filepaths = "%s/*.nc" % gc_dir
  filenames = {'U': filepaths, 'V': filepaths}
  variables = {'U': 'eastward_eulerian_current_velocity', 'V': 'northward_eulerian_current_velocity'}
  dimensions = {'lat': 'lat', 'lon': 'lon', 'time': 'time'}
  fieldset = FieldSet.from_netcdf(filenames, variables, dimensions)

  for (loc_name, loc) in locations.iteritems():
    lat_range = get_range(loc[0], second_largest_divisor(num_paths), 100.0)
    lon_range = get_range(loc[1], num_paths / second_largest_divisor(num_paths), 100.0)
    lons, lats = np.meshgrid(lat_range, lon_range)

    pset = ParticleSet(fieldset=fieldset, pclass=JITParticle, lon=lons, lat=lats)

    pset.show()

    pset.execute(
        AdvectionRK4,
        runtime=timedelta(days=max_days),
        dt=timedelta(days=(max_days / path_len)))

    pset.show()


if __name__ == "__main__":
  # Parse CLI arguments
  parser = argparse.ArgumentParser()
  parser.add_argument('--gc-dir', type=str)
  parser.add_argument('--output-dir', type=str, default="path_data")
  parser.add_argument('--num-paths', type=int, default=5)
  parser.add_argument('--path-len', type=int, default=5)
  args = parser.parse_args()

  main(args.gc_dir, args.output_dir, args.num_paths, args.path_len)


