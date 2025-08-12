const getChangeClass = (number: number) => {
  if (number > 0) {
    return "positiveChange";
  } else if (number < 0) {
    return "negativeChange";
  }
  return "";
};

export { getChangeClass };
