import * as a from "../../utils/utils.ts";

const TestSort = (
  name: string,
  sort: (a: number[], compare: (a: number, b: number) => number) => number[],
  sortAsc: (a: number[]) => number[],
  sortDesc: (a: number[]) => number[],
) => {
  Deno.test(name, async (t) => {
    const asc = (a: number, b: number) => a - b;
    const desc = (a: number, b: number) => b - a;

    await t.step("asc", () => {
      const arr = [3, 5, 2, 7, 15, 0, 2, 8, 4];
      const sorted = sort(arr, asc);
      const sorted2 = sortAsc(arr);

      arr.sort(asc);

      a.assertEquals(sorted, arr);
      a.assertEquals(sorted2, arr);
    });

    await t.step("desc", () => {
      const arr = [3, 5, 2, 7, 15, 0, 2, 8, 4];
      const sorted = sort(arr, desc);
      const sorted2 = sortDesc(arr);

      arr.sort(desc);

      a.assertEquals(sorted, arr);
      a.assertEquals(sorted2, arr);
    });

    await t.step("empty", () => {
      const arr = [] as number[];
      const sorted = sort(arr, asc);

      a.assertEquals(sorted, [] as number[]);
    });
  });
};

// Quicksort

TestSort("quicksort", a.quicksort, a.quicksortAsc, a.quicksortDesc);

// Mergesort

TestSort("mergesort", a.mergesort, a.mergesortAsc, a.mergesortDesc);

// Heap Sort

TestSort("heapsort", a.heapsort, a.heapsortAsc, a.heapsortDesc);

// Selection Sort

TestSort(
  "selectionsort",
  a.selectionsort,
  a.selectionsortAsc,
  a.selectionsortDesc,
);
