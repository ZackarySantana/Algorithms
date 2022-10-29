// Integer Factorization

function integerfactorization(num: number) {
  const factors = [] as number[];

  // We check if every number is divisible by our num
  for (let i = 2; i < num; ++i) {
    // If it is divisible, then divide it and add it to our factors
    while (num % i == 0) {
      factors.push(i);
      num /= i;
    }
  }

  return factors;
}

export { integerfactorization };
