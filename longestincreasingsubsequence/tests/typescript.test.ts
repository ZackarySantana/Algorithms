import * as a from "../../typescript.ts";

// Longest Increasing Subsequence

Deno.test(async function lis(t) {
    const testLIS = (
      stepName: string,
      nums: number[],
      solution: number,
    ) => {
      return t.step(stepName, async (t) => {
        await t.step("brute force", () => {
          a.assertEquals(a.lis(nums), solution);
        });
  
        await t.step("dp solution", () => {
          a.assertEquals(a.lisDP(nums), solution);
        });
      });
    };
  
    await testLIS("simple 1", [10, 9, 2, 5, 3, 7, 101, 18], 4);
    await testLIS("simple 2", [1, 5, 2, 3, 6, 7, 8], 6);
    await testLIS("simple 3", [7, 5, 3, 3, 6, 7, 8], 4);
    await testLIS("simple 4", [7, 5, 3, 3, 6, 7, 2], 3);
    await testLIS("simple 5", [0, 1, 0, 3, 2, 3], 4);
  });