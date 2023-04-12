export function formatCurrency(amount) {
  const config = { style: "currency", currency: "VND" };
  const formatter = new Intl.NumberFormat("vi-VN", config);
  const formatted = formatter.format(amount).replace(/\u00A0/g, ""); // remove non-breaking space characters
  return formatted;
}
