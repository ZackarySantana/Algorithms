// Egg Dropping

function eggdropDP(eggs: number, floors: number): number {
  const values = [] as number[][];

  // While we make our matrix for our dynamic programming
  // We can fill:
  // [1][floor] = floor (1 egg on any floor will take that many floors)
  // [egg][0] = 0 (any amount of eggs on 0 floors is 0 trials)
  // [egg][1] = 1 (any amount of eggs on 1 floor is 1 trial)
  // [egg][floor] = MAX (we assume that the worst case scenario is infinity)
  for (let egg = 0; egg <= eggs; ++egg) {
    const row = [] as number[];
    for (let floor = 0; floor <= floors; ++floor) {
      // If there's only 1 egg, then the worst case is that floor
      if (egg == 1) {
        row.push(floor);
        continue;
      }

      // For floor = 0, floor = 1 the worst case is the amount they are
      if (floor < 2) {
        row.push(floor);
        continue;
      }

      // Everything else starts off as infinite trials (so when we get the worst
      // we can compare)
      row.push(Number.MAX_SAFE_INTEGER);
    }
    values.push(row);
  }

  // Let's go through 2 -> eggs and 2 -> floors
  // We skip:
  // egg = 0 because 0 eggs makes no sense.
  // egg = 1 because that case has been done before
  // floor = 0 or 1 because that case has been done before
  for (let egg = 2; egg <= eggs; ++egg) {
    for (let maxFloor = 2; maxFloor <= floors; ++maxFloor) {
      // We want to compare The floors below with our current floor
      for (
        let currentFloor = 1;
        currentFloor < maxFloor;
        ++currentFloor
      ) {
        // We get the highest between:
        // values[egg - 1][current - 1] the egg breaks, and we know it must below current
        // and we have 1 less egg to use
        // values[egg][floor - current] the egg is good, and we know it must be above current
        // and we check max - current floors
        const newWorst = 1 +
          Math.max(
            values[egg - 1][currentFloor - 1],
            values[egg][maxFloor - currentFloor],
          );

        // If we got a new worse, then set it
        if (newWorst < values[egg][maxFloor]) {
          values[egg][maxFloor] = newWorst;
        }
      }
    }
  }

  // We calculated all 0..eggs and all 0..floors
  // so we just have to return the one from provided info
  return values[eggs][floors];
}

export { eggdropDP };
