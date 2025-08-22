import { AbstractControl, ValidationErrors } from "@angular/forms";

const formatSignedNumber = (number: number): string => {
  if (number > 0) {
    return `+${number}%`;
  } else if (number === 0) {
    return "0%";
  } else if (number < 0) {
    return `${number}%`;
  }
  return "";
};

const replaceNonAlphabeticWithSpace = (str: string): string => {
  return str.replace(/[^a-zåäö]/, " ");
};

const formatMetric = (key: string, value: number, currency = "SEK") => {
  if (value == null) return "-";

  const formatCurrency = (num: number) => {
    if (num >= 1_000_000_000) {
      const roundedValue = Math.round((num / 1_000_000_000) * 10) / 10;
      return `${roundedValue} miljarder ${currency}`;
    }
    if (num >= 1_000_000) {
      const roundedValue = Math.round((num / 1_000_000) * 10) / 10;
      return `${roundedValue} miljoner ${currency}`;
    }
    return `${num.toLocaleString("sv-SE")} ${currency}`;
  };

  const formatDecimal = (num: number, decimals = 2) => {
    const factor = Math.pow(10, decimals);
    return (Math.floor(num * factor) / factor).toFixed(decimals);
  };

  switch (key) {
    case "enterprise_value":
    case "market_cap":
      return formatCurrency(value);
    case "ev_ebitda":
      return formatDecimal(value, 1);
    case "ev_revenue":
    case "forward_pe":
    case "pb_ratio":
    case "peg_ratio":
    case "ps_ratio":
    case "trailing_pe":
      return formatDecimal(value, 2);
    default:
      return value.toString();
  }
};

export { formatSignedNumber, replaceNonAlphabeticWithSpace, formatMetric };
