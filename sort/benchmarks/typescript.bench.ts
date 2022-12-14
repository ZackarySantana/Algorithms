// Sorts

import * as a from "../../utils/utils.ts";
import { SortData } from "./cdata.ts";

const asc = (a: number, b: number) => a - b;

const SortBench = ({ data, group }: SortData) => {
  Deno.bench(
    "Standard Library - " + group,
    { group: "Sorting " + group },
    () => {
      [...data].sort(asc);
    },
  );

  Deno.bench("Quicksort - " + group, { group: "Sorting " + group }, () => {
    a.quicksort(data, asc);
  });

  Deno.bench("Mergesort - " + group, { group: "Sorting " + group }, () => {
    a.mergesort(data, asc);
  });

  Deno.bench("Heap Sort - " + group, { group: "Sorting " + group }, () => {
    a.heapsort(data, asc);
  });

  // If the array is too big, this sort just takes WAY too long
  if (data.length <= 100000) {
    Deno.bench(
      "Selection Sort - " + group,
      { group: "Sorting " + group },
      () => {
        a.selectionsort(data, asc);
      },
    );
  }
};
const data = JSON.parse(a.readDataFile()) as SortData[];

for (let i = 0; i < data.length; ++i) {
  SortBench(data[i]);
}
