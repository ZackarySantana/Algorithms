// Longest Increasing Subsequence

function lisDP(nums: number[]): number {
  // [index] = subsequence length
  const maxLIS = [] as number[];

  // Every LIS at that index is 0
  for (let i = 0; i < nums.length; ++i) {
    maxLIS[i] = 1;
  }

  let max = 1;

  for (let i = 0; i < nums.length; ++i) {
    for (let j = 0; j < i; ++j) {
      // Is i > j? Then maybe the subsequence for this index is to be replaced
      if (nums[i] > nums[j]) {
        // Do we want to keep the current max for this index?
        const keep = maxLIS[i];
        // Or is there a new biggest
        const replacement = maxLIS[j] + 1;
        maxLIS[i] = Math.max(keep, replacement);

        // Always store whatever is the max
        max = Math.max(max, maxLIS[i]);
      }
    }
  }

  return max;
}

export { lisDP };
