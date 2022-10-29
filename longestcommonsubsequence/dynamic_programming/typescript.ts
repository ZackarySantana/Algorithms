// Longest Common Subsequence

function lcsDP(s1: string, s2: string): number {
  const subsequences = [] as number[][];

  for (let i = 0; i <= s1.length; ++i) {
    subsequences[i] = [];
    for (let j = 0; j <= s2.length; ++j) {
      subsequences[i][j] = 0;
    }
  }

  for (let i = 1; i <= s1.length; ++i) {
    for (let j = 1; j <= s2.length; ++j) {
      // If the chars are equal
      if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
        // Then the last (i - 1), (j - 1) + 1 is the largest
        subsequences[i][j] = subsequences[i - 1][j - 1] + 1;
      } else {
        // If not, then get from (i - 1) OR (j - 1)
        subsequences[i][j] = Math.max(
          subsequences[i - 1][j],
          subsequences[i][j - 1],
        );
      }
    }
  }

  return subsequences[s1.length][s2.length];
}

export { lcsDP };
