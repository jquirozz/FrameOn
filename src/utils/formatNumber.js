export function formatNumber(num) {
  if (num == null || isNaN(num)) return "0";

  const units = ["", "K", "M", "B", "T"];

  if (num >= 1000) {
    const order = Math.floor(Math.log10(num) / 3);
    const formattedNum = (num / Math.pow(1000, order)).toFixed(1);
    return formattedNum + units[order];
  }

  return num.toString();
}
