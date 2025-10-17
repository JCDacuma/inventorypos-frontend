export function GenerateProductCode(productName = "") {
  if (!productName) return "";

  const cleanName = productName
    .trim()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")[0]
    .toUpperCase()
    .slice(0, 4);

  const date = new Date();
  const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
  const randomNum = Math.floor(1000 + Math.random() * 9000);

  return `${cleanName}-${formattedDate}-${randomNum}`;
}
