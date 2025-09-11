const API_KEY = "60f1d119ab2e0732e9a739b3a95bc5b1";

export const getWeatherByCoords = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
