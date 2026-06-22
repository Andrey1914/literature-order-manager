export const formatDate = (isoString: string): string => {
  if (!isoString) return "";

  return new Date(isoString).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
