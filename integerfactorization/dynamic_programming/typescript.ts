// Integer Factorization

function integerfactorizationDP(num: number) {
  // Log our factors like factors[10] = [5, 2]
  const factors = [] as number[][];
  // All our prime numbers we have seen up to now
  const primeNumbers = [2, 3] as number[];

  // Initially, let's assume all numbers are prime
  for (let i = 0; i <= num; ++i) {
    factors[i] = [i];
  }

  // We know i = 1, 2, 3 are all prime numbers, so let's start at 4
  for (let i = 4; i <= num; ++i) {
    const f = [] as number[];
    let current = i;

    // Let's loop through all our existing prime numbers
    for (let j = primeNumbers.length - 1; j >= 0; --j) {
      // If it is divisble, then divide and add it to our factors
      while (current % primeNumbers[j] == 0) {
        current /= primeNumbers[j];
        f.push(primeNumbers[j]);
      }
    }

    // If current > 1, that means it must be a prime number, so let's add it to our prime numbers and make our factors that
    if (current > 1) {
      f.push(current);
      primeNumbers.push(current);
    }

    // Log this numbers factors
    factors[i] = f;
  }

  // Get the factors at that num and add a 1 to the factors
  return [...factors[num], 1];
}

export { integerfactorizationDP };
