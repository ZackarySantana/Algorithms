import * as a from "../../typescript.ts";

// Longest Common Subsequence

Deno.test(async function lcs(t) {
    const testLCS = (
      stepName: string,
      s1: string,
      s2: string,
      solution: number,
    ) => {
      return t.step(stepName, async (t) => {
        await t.step("brute force", () => {
          a.assertEquals(a.lcs(s1, s2), solution);
        });
  
        await t.step("dp solution", () => {
          a.assertEquals(a.lcsDP(s1, s2), solution);
        });
      });
    };
  
    await testLCS("simple 1", "abcde", "ace", 3);
    await testLCS("simple 2", "abc", "abc", 3);
    await testLCS("simple 3", "abc", "def", 0);
    await testLCS("complex", "bsbininm", "jmjkbkjkv", 1);
  });