export function getFormData(formDataElement) {
  const formData = new FormData(formDataElement);
  const dataArray = [...formData];
  const input_data = Object.fromEntries(dataArray);
  return input_data;
}

export function formatCurrency(amount) {
  const config = { style: "currency", currency: "VND" };
  const formatter = new Intl.NumberFormat("vi-VN", config);
  const formatted = formatter.format(amount).replace(/\u00A0/g, ""); // remove non-breaking space characters
  return formatted;
}

export function initArray(size) {
  return Array(parseInt(size)).fill(0);
}

export function generateVerifyCode() {
  // Generate a random 6-digit token
  const value = Math.floor(
    Math.random() * (999999 - 100000 + 1) + 100000
  ).toString();
  const timestamp = Date.now();
  return { value, timestamp };
}

export function isVerifyCodeValid(code, duration = 60) {
  return Date.now() - code.timestamp < duration * 1000;
}
