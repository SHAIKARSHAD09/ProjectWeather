import React from "react";

const FiveDay = ({ forecastData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      weekday: "short",
    }).format(date);
  };

  if (!forecastData || !forecastData.list) {
    return <div className="text-center text-white">No forecast data available</div>;
  }

  const dayData = forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 5);

  return (
    <div className="bg-sky-950 text-white rounded-md w-full sm:max-w-md px-4 py-4">
      {dayData.length < 5 ? (
        <div className="text-center text-yellow-300">
          Not enough data for a 5-day forecast.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {dayData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-sm sm:text-base"
            >
              <div className="font-bold">{Math.round(item.main.temp)}°C</div>
              <div className="font-medium">{formatDate(item.dt_txt)}</div>
              <div className="capitalize text-gray-300">{item.weather[0].description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FiveDay;
