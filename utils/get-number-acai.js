const getAcaiPrice = numAcai =>
  (Math.round(numAcai * 1.5 * 100) / 100).toFixed(2);

export default getAcaiPrice;