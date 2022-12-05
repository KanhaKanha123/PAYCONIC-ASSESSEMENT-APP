const headers = {
  headers: {
    Accept: 'application/json',
  },
};

export async function fetchExchangeRateData(apiUrl) {
  const response = await fetch(apiUrl, headers);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

