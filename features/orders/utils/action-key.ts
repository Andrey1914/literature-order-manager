export const getActionKey = (status: string) => {
  if (status === "ORDERED") return "EXPECT";
  if (status === "EXPECTED") return "DELIVER";
  return "DELIVERED";
};
