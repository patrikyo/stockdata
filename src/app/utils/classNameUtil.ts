const getChangeClass = (number: number) => {
  if (number > 0) {
    return "positive-change";
  } else if (number < 0) {
    return "negative-change";
  }
  return "";
};

export { getChangeClass };
