// Quicksort

// The compare function compares o1 and o2 and returns:
// -#: o2 goes before o1
//  0: o2 and o1 go at the same level (can be swapped)
// +#: o2 goes after o1
// So (o1, o2) => o1 - o2 would sort o1's after o2's (or ascending order)
// And (o1, o2) => o2 - o1 would sort o1's before o2's (or descending order)

// Quicksort picks a pivot, then places that pivot in the right spot.
// Recursively continuing
function quicksort<T>(a: T[], compare: (o1: T, o2: T) => number): T[] {
  const arr = [...a]; // Copy the array so it doesn't mutate the original

  // Helper centers the pivot (at the end) and then positions
  // that pivot in the correct spot in the array (such that
  // all to the left should be before and to the right
  // should be to after)
  const helper = (low: number, high: number) => {
    const pivot = arr[high];

    let i = low; // Start at the lowest index

    // Loop from high to low
    for (let j = low; j < high; ++j) {
      // Compare the current element and pivot (check method comments)
      // above to see how this comparison works

      // If arr[j] < pivot (before) then it would return a -#
      // Then we know arr[j] should be on the left side of the pivot
      if (compare(arr[j], pivot) < 0) {
        // Swap i and j and increment i
        [arr[i], arr[j]] = [arr[j], arr[i]];
        ++i;
      }
    }

    // After the loop, arr[i] should be pointing to the highest number that
    // is still less than the pivot
    // SO we should swap arr[i] and the pivot (the pivot is the highest arr[high])
    [arr[i], arr[high]] = [arr[high], arr[i]];

    // Return that pivot location
    return i;
  };

  const quicksort = (low: number, high: number) => {
    if (low >= high) return; // No more sorting when bounds don't make sense

    // Get the pivot location of arr[high] after putting it in the right spot
    const pivotLocation = helper(low, high);

    // Sort all numbers below the pivot
    quicksort(low, pivotLocation - 1);

    // Sort all numbers after the pivot
    quicksort(pivotLocation + 1, high);
  };

  // Sort the whole array
  quicksort(0, arr.length - 1);

  return arr;
}

function quicksortAsc(arr: number[]): number[] {
  return quicksort(arr, (a, b) => a - b);
}

function quicksortDesc(arr: number[]): number[] {
  return quicksort(arr, (a, b) => b - a);
}

export { quicksort, quicksortAsc, quicksortDesc };
