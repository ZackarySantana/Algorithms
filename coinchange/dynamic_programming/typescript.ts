// Coin Change

function coinchangeDP(coins: number[], sum: number): number {
  // [coinIndex][sum] = coinsUsed
  const coinsUsed = [] as number[][];

  for (let coin = 0; coin <= coins.length; ++coin) {
    coinsUsed[coin] = [];
    for (let toSum = 0; toSum <= sum; ++toSum) {
      // Set all coins used to 0
      coinsUsed[coin][toSum] = 0;

      // If we don't have any coins
      if (coin == 0) {
        // We would use infinity
        coinsUsed[coin][toSum] = Number.MAX_SAFE_INTEGER;
      }

      // If we only have one coin...
      if (coin == 1) {
        // Check to see if the sum is a multiple of the coin
        if (toSum % coins[0] == 0) {
          // If it is, then we have to use that many coins
          coinsUsed[1][toSum] = toSum / coins[0];
        } else {
          // If not, then we would use infinity
          coinsUsed[1][toSum] = Number.MAX_SAFE_INTEGER;
        }
      }
    }
  }

  // We solved coin = 0 (infinity) and coin = 1 (multiples), so we start at coin = 2
  for (let coin = 2; coin <= coins.length; ++coin) {
    // We solved toSum = 0 (0 sum, 0 coins) so we start at toSum = 1
    for (let toSum = 1; toSum <= sum; ++toSum) {
      // If we include the coin, we subtract the sum by the coin
      // We do coin - 1 because coin = 0 is no coins,
      // coin = 1 is the 1st (or 0 index in coins)
      // We add 1 because we are using one more coin
      const include = coinsUsed[coin][toSum - coins[coin - 1]] + 1;

      // If we exclude, we just move to the next coin
      // And don't add one because we didn't use any coins
      const exclude = coinsUsed[coin - 1][toSum];

      // Is it possible to even include this coin?
      // Aka is the sum big enough (we can't put a coin worth 5 in to a sum of 2)
      const canInclude = coins[coin - 1] <= toSum;

      // We can include the coin
      if (canInclude) {
        // Pick the best between including and excluding
        coinsUsed[coin][toSum] = Math.min(include, exclude);
        continue;
      }

      // If not, we must exclude the coin
      coinsUsed[coin][toSum] = exclude;
    }
  }

  // Get the coins used for the given input
  return coinsUsed[coins.length][sum];
}

export { coinchangeDP };
