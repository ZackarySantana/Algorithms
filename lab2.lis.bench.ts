import * as lab2 from "./lab2.ts";

// 6. Longest Increasing Subsequence

const LISBench = (nums: number[], group: string) => {
  Deno.bench(
    "LIS Brute Force - " + group,
    { group: "Longest Increasing Subsequence " + group },
    () => {
      lab2.lis_Brute(nums);
    },
  );

  Deno.bench(
    "LIS DP Solution - " + group,
    { group: "Longest Increasing Subsequence " + group },
    () => {
      lab2.lis_DP(nums);
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
