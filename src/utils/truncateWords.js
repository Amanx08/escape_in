export const truncateWords = (text = "", wordLimit = 20) => {
  const words = text.trim().split(/\s+/);

  return {
    truncated:
      words.length > wordLimit
        ? words.slice(0, wordLimit).join(" ") + "..."
        : text,
    isTruncated: words.length > wordLimit,
  };
};