export interface RankItem {
  id: number
  percentage: number
  locked: boolean
}

const roundFractions = (value: number, fractions: number) => {
  return Math.round(value * Math.pow(10, fractions)) / Math.pow(10, fractions);
};

export const modifyPercentage = <T extends RankItem>(values: T[], newValue: T): T[] => {
  // const totalPercentage = 100

  const currIndex = values.findIndex(el => el.id === newValue.id);

  if (currIndex === -1) throw new Error ('New value id not found');

  console.log(values, newValue);

  const newValueDifference = newValue.percentage - values[currIndex].percentage;

  const restSum = values.reduce((acc, curr) => {
    if (curr.id === newValue.id || curr.locked) return acc;
    else return acc + curr.percentage;
  }, 0);

  if (newValueDifference > restSum) throw new Error('Modification not possible');

  const result = values.map((item) => {
    if (item.id === newValue.id) return newValue;
    if (item.locked) return item;
    else return {
      ...item,
      percentage: roundFractions(item.percentage + (-1 * newValueDifference * item.percentage / restSum), 2),
    };
  });

  const sum = result.reduce((acc, curr) => acc += curr.percentage, 0);

  if (sum > 100.1) throw new Error('Bigger than 100 error');

  return result;
};