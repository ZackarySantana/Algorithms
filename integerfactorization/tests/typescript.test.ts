import * as a from "../../utils/utils.ts";

// Integer Factorization

Deno.test(async function integerfactorization(t) {
  await t.step("of 10 brute force", () => {
    const solution = [1, 2, 5];

    a.assertArrayIncludes(solution, a.integerfactorization(10));
  });

  await t.step("of 10 dp", () => {
    const solution = [1, 2, 5];

    a.assertArrayIncludes(solution, a.integerfactorizationDP(10));
  });

  await t.step("of 294750 brute force", () => {
    const solution = a.integerfactorization(294750);

    a.assertArrayIncludes([1, 2, 3, 3, 5, 5, 5, 131], solution);
  });

  await t.step("of 294750 dp", () => {
    const solution = a.integerfactorizationDP(294750);

    a.assertArrayIncludes([1, 2, 3, 3, 5, 5, 5, 131], solution);
  });
});
