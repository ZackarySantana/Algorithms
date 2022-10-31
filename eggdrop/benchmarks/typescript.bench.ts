// Egg Dropping

import * as a from "../../utils/utils.ts";

const EggDroppingBench = (floors: number, eggs: number, group: string) => {
  if (eggs == 2) {
    Deno.bench(
      "Egg Dropping Math Equation - " + group,
      { group: "Egg Dropping " + group },
      () => {
        a.eggdrop(floors);
      },
    );
  }

  Deno.bench(
    "Egg Dropping DP Solution - " + group,
    { group: "Egg Dropping " + group },
    () => {
      a.eggdropDP(eggs, floors);
    },
  );
};

EggDroppingBench(25, 2, "25 Floors");
EggDroppingBench(100, 2, "100 Floors");
EggDroppingBench(1000, 2, "1000 Floors");
EggDroppingBench(10000, 2, "10000 Floors");

EggDroppingBench(25, 3, "3 Eggs 25 Floors");
EggDroppingBench(100, 3, "3 Eggs 100 Floors");
EggDroppingBench(1000, 3, "3 Eggs 1000 Floors");
EggDroppingBench(10000, 3, "3 Eggs 10000 Floors");
