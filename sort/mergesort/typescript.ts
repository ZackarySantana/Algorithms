// Mergesort

// The compare function compares o1 and o2 and returns:
// -#: o2 goes before o1
//  0: o2 and o1 go at the same level (can be swapped)
// +#: o2 goes after o1
// So (o1, o2) => o1 - o2 would sort o1's after o2's (or ascending order)
// And (o1, o2) => o2 - o1 would sort o1's before o2's (or descending order)

// Mergesort recursively calls smaller subarrays and sorts them.
// Then combines two sorted arrays (linear iteration between the two sorted)
// combining them such that the resultant is sorted too
function mergesort<T>(a: T[], compare: (o1: T, o2: T) => number): T[] {
  const arr = [...a]; // Copy the array so it doesn't mutate the original

  // Merge
  const merge = (left: number, middle: number, right: number) => {
    // Array.slice(start, end) EXCLUDES the 'end'. So we must add 1
    // Get sub array from [left, middle] (inclusive)
    const leftArr = arr.slice(left, middle + 1);

    // Get sub array from [middle + 1, right] (inclusive)
    const rightArr = arr.slice(middle + 1, right + 1);

    // Keep track of where we are in the left and right array.
    // And start the sorting where left is
    let leftIndex = 0,
      rightIndex = 0,
      mainIndex = left;

    // Continue looping while the indexes are still in bounds
    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
      // Compare the left and right elements
      // Such that if it returns a -#, then leftArr is before
      // And a +# then rightArr is before
      if (compare(leftArr[leftIndex], rightArr[rightIndex]) < 0) {
        arr[mainIndex] = leftArr[leftIndex++];
      } else {
        arr[mainIndex] = rightArr[rightIndex++];
      }
      // We always use the mainIndex, so increment it
      ++mainIndex;
    }

    // Put the remaining left and right arrays in to the array
    // Only one of these will run, since the other will have reached the
    // max length
    for (; leftIndex < leftArr.length; ++leftIndex) {
      arr[mainIndex++] = leftArr[leftIndex];
    }

    for (; rightIndex < rightArr.length; ++rightIndex) {
      arr[mainIndex++] = rightArr[rightIndex];
    }
  };

  // Mergesort is our main function that sorts [left, middle] to [middle + 1, right]
  // And then merges those two sorted arrays to one
  const mergesort = (left: number, right: number) => {
    if (left >= right) return;

    // Get the middle for this left and right
    const middle = Math.floor((right - left) / 2 + left);

    // Sort the left and right sides
    mergesort(left, middle);
    mergesort(middle + 1, right);

    // Merge those two sorted arrays
    merge(left, middle, right);
  };

  // Sort the whole array
  mergesort(0, arr.length - 1);

  return arr;
}

function mergesortAsc(arr: number[]): number[] {
  return mergesort(arr, (a, b) => a - b);
}

function mergesortDesc(arr: number[]): number[] {
  return mergesort(arr, (a, b) => b - a);
}

export { mergesort, mergesortAsc, mergesortDesc };
