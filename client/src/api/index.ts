export const fetchGrowthIndex = async (chain1: string, chain2: string) => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const res = await fetch(`${API_URL}/chain-growth-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chain1,
      chain2,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.message || "Couldn't fetch the data");
  }
  return res.json();
};
