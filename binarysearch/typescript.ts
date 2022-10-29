// 11. Binary Search

function binarysearch<T>(a: T[], compare: (o: T) => number): boolean {
  // Start using full array
  let l = 0;
  let r = a.length;

  // Calculate the middle depending on left and right
  const m = () => Math.floor((r + l) / 2);

  while (l < r) {
    const c = compare(a[m()]);

    // If it is the value, return true
    if (c == 0) {
      return true;
    }

    // If it's less or more, then reset left or right
    if (c < 0) {
      l = m() + 1;
    } else {
      r = m();
    }
  }

  return false;
}

export { binarysearch };
