import React from "react";
import {
  WiRain,
  WiCloudy,
  WiDaySunny,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

const HourlyWeather = ({ forecastData }) => {
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getWeatherIcon = (description) => {
    const lowerDesc = description.toLowerCase();
    if (lowerDesc.includes("rain"))
      return <WiRain className="text-blue-400 text-3xl" />;
    if (lowerDesc.includes("cloud"))
      return <WiCloudy className="text-gray-400 text-3xl" />;
    if (lowerDesc.includes("clear"))
      return <WiDaySunny className="text-yellow-400 text-3xl" />;
    if (lowerDesc.includes("snow"))
      return <WiSnow className="text-white text-3xl" />;
    if (lowerDesc.includes("thunderstorm"))
      return <WiThunderstorm className="text-purple-400 text-3xl" />;
    return <WiCloudy className="text-gray-400 text-3xl" />;
  };

  if (!forecastData || !forecastData.list) {
    return (
      <div className="text-center text-white py-4">
        No hourly forecast data available
      </div>
    );
  }

  const hourlyData = forecastData.list.slice(0, 12);

  return (
    <div className="bg-sky-950 text-white rounded-md w-full px-4 py-5 md:py-6">
      <h2 className="text-lg md:text-xl font-bold mb-4">Hourly Weather Forecast</h2>
      <div className="flex overflow-x-auto space-x-4 scroll-smooth scrollbar-hide snap-x">
        {hourlyData.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 snap-start flex flex-col items-center p-3 bg-sky-800 rounded-lg shadow-md w-[100px] sm:w-[110px] md:w-[120px]"
          >
            <div className="text-xs md:text-sm font-semibold">
              {formatTime(item.dt_txt)}
            </div>
            <div className="my-2">{getWeatherIcon(item.weather[0].description)}</div>
            <div className="text-sm font-bold">{Math.round(item.main.temp)}°C</div>
            <div className="text-[11px] md:text-xs text-center capitalize">
              {item.weather[0].description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyWeather;
