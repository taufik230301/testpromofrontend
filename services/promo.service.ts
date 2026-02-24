export const getPromos = async () => {
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const response = await fetch(`${baseUrl}/api/promos`);

  if (!response.ok) {
    throw new Error("Failed to fetch promos");
  }

  return response.json();
};
