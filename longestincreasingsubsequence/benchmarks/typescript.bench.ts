// Longest Increasing Subsequence

import * as a from "../../utils/utils.ts";

const LISBench = (nums: number[], group: string) => {
  Deno.bench(
    "LIS Brute Force - " + group,
    { group: "Longest Increasing Subsequence " + group },
    () => {
      a.lis(nums);
    },
  );

  Deno.bench(
    "LIS DP Solution - " + group,
    { group: "Longest Increasing Subsequence " + group },
    () => {
      a.lisDP(nums);
    },
  );
};

const createRandomArray = (size: number, range: number) => {
  const arr = [];
  for (let i = 0; i < size; ++i) {
    arr.push(Math.floor(Math.random() * range));
  }
  return arr;
};

LISBench(createRandomArray(10, 10), "Small Size");
LISBench(createRandomArray(50, 50), "Medium Size");
LISBench(createRandomArray(100, 100), "Large Size");
