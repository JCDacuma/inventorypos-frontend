//Calculate selling price by markup price
export function CalculateSellingPrice(markup, subrawprice, setInput) {
  let markupPercent = parseFloat(markup);
  let rawPrice = parseFloat(subrawprice);

  if (isNaN(markupPercent) || markupPercent < 0) markupPercent = 0;
  if (isNaN(rawPrice) || rawPrice < 0) rawPrice = 0;

  const sellingPrice = rawPrice + rawPrice * (markupPercent / 100);
  const formattedSellingPrice = sellingPrice.toFixed(2);

  // Update state
  setInput((prod) => ({
    ...prod,
    sellingPrice: formattedSellingPrice,
  }));
}
