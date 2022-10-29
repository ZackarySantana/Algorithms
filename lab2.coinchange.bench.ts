import * as lab2 from "./lab2.ts";

// 4. Coin Change

const CoinChangeBench = (coins: number[], sum: number, group: string) => {
  if (group != "Stackoverflow") {
    Deno.bench(
      "Coin Change Brute Force Pass Index - " + group,
      { group: "Coin Change - " + group },
      () => {
        lab2.coinChange_Brute(coins, sum);
      },
    );

    Deno.bench(
      "Coin Change Brute Force Pass Array - " + group,
      { group: "Coin Change - " + group },
      () => {
        lab2.coinChange_Brute2(coins, sum);
      },
    );
  }

  Deno.bench(
    "Coin Change DP Solution - " + group,
    { group: "Coin Change - " + group },
    () => {
      lab2.coinChange_DP(coins, sum);
    },
  );
};

CoinChangeBench([1, 2, 3], 6, "Simple");
CoinChangeBench([186, 419, 83, 408], 6249, "Complex");
CoinChangeBench([186, 419, 83, 408, 90, 5, 10204], 6249495, "Stackoverflow");
