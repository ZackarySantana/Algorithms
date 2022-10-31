// Integer Factorization

import * as a from "../../utils/utils.ts";

const IntegerFactorizationBench = (num: () => number, group: string) => {
  if (group != "Stackoverflow") {
    Deno.bench(
      "Integer Factorization DP Solution - " + group,
      { group: "Coin Change - " + group },
      () => {
        a.integerfactorizationDP(num());
      },
    );
  }

  Deno.bench(
    "Integer Factorization Brute Force - " + group,
    { group: "Coin Change - " + group },
    () => {
      a.integerfactorization(num());
    },
  );
};

const createRandomNumber = (lower_range: number, upper_range: number) => {
  return () =>
    Math.floor(Math.random() * (upper_range - lower_range) + lower_range);
};

IntegerFactorizationBench(createRandomNumber(90, 110), "Simple");
IntegerFactorizationBench(createRandomNumber(900, 1100), "Medium");
IntegerFactorizationBench(createRandomNumber(9000, 11000), "Large");
IntegerFactorizationBench(createRandomNumber(29000, 31000), "Grand");
IntegerFactorizationBench(createRandomNumber(90000, 110000), "Too Large");
