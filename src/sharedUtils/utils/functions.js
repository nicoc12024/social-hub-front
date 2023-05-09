export const createCharLimitHandler = (setInput, setRemainingChars, maxChars) => {
  return (e) => {
    const input = e.target.value;
    if (input.length <= maxChars) {
      setInput(input);
      setRemainingChars(maxChars - input.length);
    }
  };
};
