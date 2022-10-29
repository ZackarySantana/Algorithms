// Coin Change

// Passing index
function coinchange(coins: number[], sum: number): number {
  // Helper recursively gets if the current coinIndex should be included or excluded
  // By picking which one is better (less coinsUsed)
  function helper(
    currentSum: number,
    coinIndex: number,
    coinsUsed: number,
  ): number {
    // If the currentSum is too large or we reached the end, this path is bad
    // And we return infinity
    if (currentSum > sum || coinIndex == coins.length) {
      return Number.MAX_SAFE_INTEGER;
    }

    // If we reached the sum, return the amount of coins used
    if (currentSum == sum) return coinsUsed;

    // Gets the amount of coins used if we include (getting the best
    // by recursively calling)
    const include = helper(
      currentSum + coins[coinIndex],
      coinIndex,
      coinsUsed + 1,
    );

    // Gets the amount of coins used if we exclude this (increment coinIndex)
    const exclude = helper(currentSum, coinIndex + 1, coinsUsed);

    // Picks the best, including or excluding
    return Math.min(include, exclude);
  }

  return helper(0, 0, 0);
}

// Passing coin array
function coinchange2(coins: number[], sum: number): number {
  // Helper recursively gets if the current coinIndex should be included or excluded
  // by picking which one is better (less coinsUsed)
  function helper(
    currentSum: number,
    coins: number[],
    coinsUsed: number,
  ): number {
    // If the currentSum is too large or we reached the end, this path is bad
    // And we return infinity
    if (currentSum > sum || coins.length == 0) {
      return Number.MAX_SAFE_INTEGER;
    }

    // If we reached the sum, return the amount of coins used
    if (currentSum == sum) return coinsUsed;

    // Gets the amount of coins if we include the current coin
    // (recursively calling to get the best path)
    const include = helper(currentSum + coins[0], coins, coinsUsed + 1);

    // Gets the amount of coins if we exclude the current coin (cut it off the array)
    const exclude = helper(currentSum, coins.slice(1), coinsUsed);

    // Pick the best, including or excluding it
    return Math.min(include, exclude);
  }

  return helper(0, coins, 0);
}

export { coinchange, coinchange2 };
