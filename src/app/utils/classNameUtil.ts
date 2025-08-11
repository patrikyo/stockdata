const getChangeClass = (str: string | undefined) => {
  if (!str) return "";
  if (str.startsWith("+")) {
    return "positiveChange";
  } else if (str.startsWith("-")) {
    return "negativeChange";
  }
  return "";
};

export { getChangeClass };
