import * as a from "../../typescript.ts";

// Coin Change

Deno.test(async function coinChange(t) {
    const testCoins = (
      stepName: string,
      coins: number[],
      sum: number,
      coinsUsed: number,
    ) => {
      return t.step(stepName, async (t) => {
        await t.step(
          `brute force throws ${
            stepName == "stackoverflow" ? "throws " : ""
          }(Pass coin index)`,
          () => {
            if (stepName == "stackoverflow") {
              a.assertThrows(() => a.coinchange(coins, sum));
              return;
            }
            a.assertEquals(a.coinchange2(coins, sum), coinsUsed);
          },
        );
  
        await t.step(
          `brute force ${
            stepName == "stackoverflow" ? "throws " : ""
          }(Pass coin array)`,
          () => {
            if (stepName == "stackoverflow") {
              a.assertThrows(() => a.coinchange(coins, sum));
              return;
            }
            a.assertEquals(a.coinchange2(coins, sum), coinsUsed);
          },
        );
  
        await t.step("dp solution", () => {
          a.assertEquals(a.coinchangeDP(coins, sum), coinsUsed);
        });
      });
    };
  
    await testCoins("simple", [1, 2, 3], 6, 2);
    await testCoins("complex", [186, 419, 83, 408], 6249, 20);
    await testCoins(
      "stackoverflow",
      [186, 419, 83, 408, 90, 5, 10204],
      6249495,
      626,
    );
  });