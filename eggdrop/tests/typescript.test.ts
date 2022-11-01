import * as a from "../../utils/utils.ts";

// Egg Drop

Deno.test(async function eggdrop(t) {
  const testFloors = (
    floors: number,
    answer_2eggs: number,
    answer_3eggs: number,
  ) => {
    return t.step(`${floors} floors`, async (t) => {
      await t.step("math equation", () => {
        a.assertEquals(a.eggdrop(floors), answer_2eggs);
      });

      await t.step("dp solution (2 eggs)", () => {
        a.assertEquals(a.eggdropDP(2, floors), answer_2eggs);
      });

      await t.step("dp solution (3 eggs)", () => {
        a.assertEquals(a.eggdropDP(3, floors), answer_3eggs);
      });
    });
  };

  await testFloors(25, 7, 5);
  await testFloors(50, 10, 7);
  await testFloors(100, 14, 9);
  await testFloors(1000, 45, 19);

  // For 3 eggs, I compared with online like:
  // https://sankalpiitr.wordpress.com/2012/03/02/the-2-eggs-problem-extended-to-3-eggs/
  // Which give the answer (using math), to compare what my algorithm gets
});
