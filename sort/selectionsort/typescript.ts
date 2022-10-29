function selectionsort<T>(a: T[], compare: (o1: T, o2: T) => number): T[] {
  const arr = [...a];

  for (let i = 0; i < arr.length; ++i) {
    let smallestIndex = i;

    for (let j = i; j < arr.length; ++j) {
      if (compare(arr[j], arr[smallestIndex]) < 0) {
        smallestIndex = j;
      }
    }

    [arr[i], arr[smallestIndex]] = [arr[smallestIndex], arr[i]];
  }

  return arr;
}

function selectionsortAsc(arr: number[]): number[] {
  return selectionsort(arr, (a, b) => a - b);
}

function selectionsortDesc(arr: number[]): number[] {
  return selectionsort(arr, (a, b) => b - a);
}

export { selectionsort, selectionsortAsc, selectionsortDesc };
