// Coin Change

import * as a from "../typescript.ts";

const CoinChangeBench = (coins: number[], sum: number, group: string) => {
  if (group != "Stackoverflow") {
    a.bench(
      "Coin Change Brute Force Pass Index - " + group,
      { group: "Coin Change - " + group },
      () => {
        a.coinchange(coins, sum);
      },
    );

    a.bench(
      "Coin Change Brute Force Pass Array - " + group,
      { group: "Coin Change - " + group },
      () => {
        a.coinchange2(coins, sum);
      },
    );
  }

  a.bench(
    "Coin Change DP Solution - " + group,
    { group: "Coin Change - " + group },
    () => {
      a.coinchangeDP(coins, sum);
    },
  );
};

CoinChangeBench([1, 2, 3], 6, "Simple");
CoinChangeBench([186, 419, 83, 408], 6249, "Complex");
CoinChangeBench([186, 419, 83, 408, 90, 5, 10204], 6249495, "Stackoverflow");
