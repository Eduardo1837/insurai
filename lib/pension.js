// Calculator determinist pentru acumularea unei pensii private facultative
// (Pilon III). Nu depinde de niciun API extern sau LLM — e matematică pură,
// deci instant și fără costuri de tokeni.
//
// Formula folosită: dobândă compusă lunară, cu contribuție lunară constantă
// și o sumă inițială opțională deja acumulată.
//
// FV = P0 * (1+i)^n + C * [((1+i)^n - 1) / i]
// unde: P0 = suma inițială, C = contribuția lunară, i = rata lunară,
// n = numărul de luni.

export function calculatePensionGrowth({
  currentAge,
  retirementAge,
  monthlyContribution,
  initialAmount = 0,
  annualReturnRate = 5, // procent, ex: 5 înseamnă 5%
}) {
  const years = Math.max(0, retirementAge - currentAge);
  const months = years * 12;
  const monthlyRate = annualReturnRate / 100 / 12;

  // Serie an-de-an, utilă pentru graficul de acumulare.
  const timeline = [];
  let balance = initialAmount;
  let totalContributed = initialAmount;

  timeline.push({
    age: currentAge,
    balance: Math.round(balance),
    contributed: Math.round(totalContributed),
  });

  for (let year = 1; year <= years; year++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      totalContributed += monthlyContribution;
    }
    timeline.push({
      age: currentAge + year,
      balance: Math.round(balance),
      contributed: Math.round(totalContributed),
    });
  }

  const finalBalance = balance;
  const totalGain = finalBalance - totalContributed;

  return {
    years,
    months,
    finalBalance: Math.round(finalBalance),
    totalContributed: Math.round(totalContributed),
    totalGain: Math.round(totalGain),
    timeline,
  };
}

export function formatRON(value) {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0,
  }).format(value);
}
