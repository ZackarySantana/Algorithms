import * as a from "../../utils/utils.ts";

// Quicksort

Deno.test(async function quicksort(t) {
  const asc = (a: number, b: number) => a - b;
  const desc = (a: number, b: number) => b - a;

  await t.step("asc", () => {
    const arr = [3, 5, 2, 7, 15, 0, 2, 8, 4];
    const sorted = a.quicksort(arr, asc);
    const sorted2 = a.quicksortAsc(arr);

    arr.sort(asc);

    a.assertEquals(sorted, arr);
    a.assertEquals(sorted2, arr);
  });

  await t.step("desc", () => {
    const arr = [3, 5, 2, 7, 15, 0, 2, 8, 4];
    const sorted = a.quicksort(arr, desc);
    const sorted2 = a.quicksortDesc(arr);

    arr.sort(desc);

    a.assertEquals(sorted, arr);
    a.assertEquals(sorted2, arr);
  });

  await t.step("empty", () => {
    const arr = [] as number[];
    const sorted = a.quicksort(arr, asc);

    a.assertEquals(sorted, [] as number[]);
  });
});

// Mergesort

Deno.test(async function mergesort(t) {
  const asc = (a: number, b: number) => a - b;
  const desc = (a: number, b: number) => b - a;

  await t.step("asc", () => {
    const arr = [3, 5, 2, 7, 15, 0, 2, 8, 4];
    const sorted = a.mergesort(arr, asc);
    const sorted2 = a.mergesortAsc(arr);

    arr.sort(asc);

    a.assertEquals(sorted, arr);
    a.assertEquals(sorted2, arr);
  });

  await t.step("desc", () => {
    const arr = [3, 5, 2, 7, 15, 0, 2, 8, 4];
    const sorted = a.mergesort(arr, desc);
    const sorted2 = a.mergesortDesc(arr);

    arr.sort(desc);

    a.assertEquals(sorted, arr);
    a.assertEquals(sorted2, arr);
  });

  await t.step("empty", () => {
    const arr = [] as number[];
    const sorted = a.mergesort(arr, asc);

    a.assertEquals(sorted, [] as number[]);
  });
});

// Heap Sort

Deno.test(async function heapsort(t) {
  const asc = (a: number, b: number) => a - b;
  const desc = (a: number, b: number) => b - a;

  await t.step("asc", () => {
    const arr = [3, 5, 2, 7, 15, 0, 2, 8, 4];
    const sorted = a.heapsort(arr, asc);
    const sorted2 = a.heapsortAsc(arr);

    arr.sort(asc);

    a.assertEquals(sorted, arr);
    a.assertEquals(sorted2, arr);
  });

  await t.step("desc", () => {
    const arr = [3, 5, 2, 7, 15, 0, 2, 8, 4];
    const sorted = a.heapsort(arr, desc);
    const sorted2 = a.heapsortDesc(arr);

    arr.sort(desc);

    a.assertEquals(sorted, arr);
    a.assertEquals(sorted2, arr);
  });

  await t.step("empty", () => {
    const arr = [] as number[];
    const sorted = a.heapsort(arr, asc);

    a.assertEquals(sorted, [] as number[]);
  });
});

// Selection Sort

Deno.test(async function selectionsort(t) {
  const asc = (a: number, b: number) => a - b;
  const desc = (a: number, b: number) => b - a;

  await t.step("asc", () => {
    const arr = [3, 5, 2, 7, 15, 0, 2, 8, 4];
    const sorted = a.selectionsort(arr, asc);
    const sorted2 = a.selectionsortAsc(arr);

    arr.sort(asc);

    a.assertEquals(sorted, arr);
    a.assertEquals(sorted2, arr);
  });

  await t.step("desc", () => {
    const arr = [3, 5, 2, 7, 15, 0, 2, 8, 4];
    const sorted = a.selectionsort(arr, desc);
    const sorted2 = a.selectionsortDesc(arr);

    arr.sort(desc);

    a.assertEquals(sorted, arr);
    a.assertEquals(sorted2, arr);
  });

  await t.step("empty", () => {
    const arr = [] as number[];
    const sorted = a.selectionsort(arr, asc);

    a.assertEquals(sorted, [] as number[]);
  });
});
