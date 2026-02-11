export const flagEmojiToCountryCode = (emoji) => {
  if (!emoji) return null;

  const codePoints = [...emoji].map((char) => char.codePointAt(0));
  if (codePoints.length !== 2) return null;

  const ascii = codePoints.map((point) => point - 127397);
  if (ascii.some((point) => point < 65 || point > 90)) return null;

  return String.fromCharCode(...ascii).toLowerCase();
};

export const getFlagImageUrl = (emoji) => {
  const countryCode = flagEmojiToCountryCode(emoji);
  if (!countryCode) return null;
  return `https://flagcdn.com/24x18/${countryCode}.png`;
};
