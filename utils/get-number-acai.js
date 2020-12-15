const getAcaiPrice = numAcai =>
  (Math.round(numAcai * 7.0 * 100) / 100).toFixed(2);

export default getAcaiPrice;