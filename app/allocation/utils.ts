export interface RankItem {
  id: number
  percentage: number
  locked: boolean
  budget: number
  RF6Id: string
}

export const roundFractions = (value: number, fractions: number) => {
  return Math.round(value * Math.pow(10, fractions)) / Math.pow(10, fractions);
};

export const modifyPercentage = <T extends RankItem>(values: T[], newValue: T): T[] => {
  // const totalPercentage = 100

  const currIndex = values.findIndex(el => el.id === newValue.id);

  if (currIndex === -1) throw ({ msg: 'New value id not found' });

  const newValueDifference = newValue.percentage - values[currIndex].percentage;

  const restSum = values.reduce((acc, curr) => {
    if (curr.id === newValue.id || curr.locked) return acc;
    else return acc + curr.percentage;
  }, 0);

  if (newValueDifference > restSum) throw ({ msg: 'Invalid modification' });

  const result = values.map((item) => {
    if (item.id === newValue.id) return newValue;
    if (item.locked) return item;
    else return {
      ...item,
      percentage: roundFractions(item.percentage + (-1 * newValueDifference * item.percentage / restSum), 6),
      budget: roundFractions(item.budget + (-1 * newValueDifference * item.budget / restSum), 2),
    };
  });

  const sum = result.reduce((acc, curr) => acc += curr.percentage, 0);

  if (sum > 100.1) throw { msg: 'Bigger than 100 error', excess: sum - 100 };

  if (result.filter(el => !el.locked).length === 1) throw ({ msg: 'At least two categories must be unlocked' });

  return result;
};
