// Longest Increasing Subsequence

function lis(nums: number[]): number {
  function helper(previous: number, index: number, length: number): number {
    if (index == nums.length) return length;

    const exclude = helper(previous, index + 1, length);

    // Can we even include the current number?
    const canInclude = nums[index] > previous;
    if (canInclude) {
      const include = helper(nums[index], index + 1, length + 1);

      // Get the best between including and excluding it
      return Math.max(include, exclude);
    }

    // We can only exclude it
    return exclude;
  }

  return helper(Number.MIN_SAFE_INTEGER, 0, 0);
}
export { lis };
