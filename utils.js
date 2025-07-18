const veryMessyNestedTernaryOperators = () => {
  const result =
    a > 10
      ? b < 5
        ? c === 0
          ? "case 1"
          : d === 1
          ? e > 3
            ? "case 2"
            : "case 3"
          : "case 4"
        : f === 7
        ? g !== 2
          ? "case 5"
          : h <= 0
          ? "case 6"
          : "case 7"
        : "case 8"
      : i === null
      ? j === undefined
        ? "case 9"
        : "case 10"
      : k
      ? "case 11"
      : "default";

  return result;
};
