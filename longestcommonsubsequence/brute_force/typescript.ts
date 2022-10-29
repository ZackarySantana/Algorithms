// Longest Common Subsequence

function lcs(s1: string, s2: string): number {
  function helper(i1: number, i2: number, length: number): number {
    if (i1 == s1.length || i2 == s2.length) return length;

    // If the current char is the same
    if (s1.charAt(i1) == s2.charAt(i2)) {
      // Progress to the next char for both and increase the LCS length
      return helper(i1 + 1, i2 + 1, length + 1);
    } else {
      // If not, get the best between i1 + 1 and i2 + 1
      return Math.max(helper(i1 + 1, i2, length), helper(i1, i2 + 1, length));
    }
  }

  return helper(0, 0, 0);
}

export { lcs };
