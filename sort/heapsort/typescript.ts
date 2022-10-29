// Heap Sort

function heapsort<T>(a: T[], compare: (o1: T, o2: T) => number): T[] {
  const arr = [...a];

  function max_heapify(arr: T[], heapSize: number, headLocation: number) {
    let largest = headLocation;
    const left = 2 * headLocation + 1;
    const right = 2 * headLocation + 2;

    // Get location of largest
    if (left < heapSize && compare(arr[left], arr[largest]) > 0) {
      largest = left;
    }
    if (right < heapSize && compare(arr[right], arr[largest]) > 0) {
      largest = right;
    }

    // If the largest head isn't the root node
    if (largest != headLocation) {
      // Swap them
      [arr[headLocation], arr[largest]] = [arr[largest], arr[headLocation]];

      // And fix rest
      max_heapify(arr, heapSize, largest);
    }
  }

  // Make the current array as a max heap (parent node is the most)
  // We start at arr.length / 2 - 1 because as a max heap, the leaf
  // nodes will start after that. E.g.
  //       1
  //    2    3
  //   4 5  6 7
  // The amount of leaf nodes is 4 (arr.length = 7) 7 / 2 = 3 - 1 is 2
  // And arr[2] would be the 3 node
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; --i) {
    max_heapify(arr, arr.length, i);
  }

  // loop through the whole array and make sure we are getting the biggest
  // number from the max heap
  for (let i = arr.length - 1; i > 0; --i) {
    [arr[0], arr[i]] = [arr[i], arr[0]];

    max_heapify(arr, i, 0);
  }

  return arr;
}

function heapsortAsc(arr: number[]): number[] {
  return heapsort(arr, (a, b) => a - b);
}

function heapsortDesc(arr: number[]): number[] {
  return heapsort(arr, (a, b) => b - a);
}

export { heapsort, heapsortAsc, heapsortDesc };
