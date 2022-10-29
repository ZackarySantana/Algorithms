// Egg Dropping

// Only works for 2 eggs
function eggdrop(floors: number): number {
  // The best solution for the egg dropping problem is to cover the amount of floors
  // that would be worst case scenario

  // We can do that by covering an amount that would be the amount of sums we would need
  // if we were to do n + (n - 1) + (n - 2) ... 2 + 1
  // So n would be the worst case scenario, because we are adding numbers n times
  // And if it breaks on the first drop, then we must test 0..n
  // If it breaks on the second drop, then we must test n..2n - 1 (or 2n - n - 1 = n - 1)
  // Etc

  // So if floors = 25, then:
  // x(x+1)/2 = 25 -> x^2 + x - 50 = 0 (quadratic equation)
  // (-1 + sqrt(1 + 200)) / 2
  // (-1 + 14.1) / 2 = 6.5 -> 7
  // We should round up in any case (7.1 -> 8) because we want to cover all floors
  // So in this case
  // 7 + 6 + 5 + 4 + 3 + 2 + 1 = 28
  // Which meets the minimum floors of 25

  return Math.ceil((-1 + Math.sqrt(1 + floors * 2 * 4)) / 2);
}

export { eggdrop };
