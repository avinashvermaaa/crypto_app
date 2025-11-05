export const getTopCryptos = async () => {
  try {
    const response = await fetch('https://crypto-app-u7rb.onrender.com/api/cryptos'); 
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return [];
  }
};
