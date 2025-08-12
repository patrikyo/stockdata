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

export { formatSignedNumber };
