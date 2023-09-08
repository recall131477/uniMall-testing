/** 取小數點後兩位並四捨五入 */
export const roundToTwoDecimalPlaces = (number: number) =>
  parseFloat(number.toFixed(2));
