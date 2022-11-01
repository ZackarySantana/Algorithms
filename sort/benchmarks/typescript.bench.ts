// Sorts

import * as a from "../../utils/utils.ts";

const asc = (a: number, b: number) => a - b;

const SortBench = (arr: number[], group: string) => {
  Deno.bench(
    "Standard Library - " + group,
    { group: "Sorting " + group },
    () => {
      [...arr].sort(asc);
    },
  );

  Deno.bench("Quicksort - " + group, { group: "Sorting " + group }, () => {
    a.quicksort(arr, asc);
  });

  Deno.bench("Mergesort - " + group, { group: "Sorting " + group }, () => {
    a.mergesort(arr, asc);
  });

  Deno.bench("Heap Sort - " + group, { group: "Sorting " + group }, () => {
    a.heapsort(arr, asc);
  });

  // If the array is too big, this sort just takes WAY too long
  if (arr.length <= 100000) {
    Deno.bench(
      "Selection Sort - " + group,
      { group: "Sorting " + group },
      () => {
        a.selectionsort(arr, asc);
      },
    );
  }
};

const createRandomArray = (size: number, range: number) => {
  const arr = [] as number[];
  for (let i = 0; i < size; ++i) {
    arr.push(Math.floor(Math.random() * range));
  }
  return arr;
};

// const text = await Deno.readTextFile("./data.json");
// console.log(JSON.parse(text));

SortBench(createRandomArray(10, 5), "10 ele, 5 range");
SortBench(createRandomArray(1000, 100), "1000 ele, 100 range");
SortBench(createRandomArray(100000, 10000), "100,000 ele, 10,000 range");
SortBench(createRandomArray(100000, 100000), "100,000 ele, 100,000 range");
SortBench(
  createRandomArray(1000000, 10000),
  "1,000,000 ele, 10,000 range",
);
SortBench(
  createRandomArray(1000000, 1000000),
  "1,000,000 ele, 1,000,000 range",
);
