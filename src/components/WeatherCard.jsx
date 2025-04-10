import { FaLocationArrow } from 'react-icons/fa';
import { BsCalendar } from 'react-icons/bs';
import { MdWbSunny, MdAcUnit } from 'react-icons/md';
import { IoMdCloud } from 'react-icons/io';

const WeatherCard = ({ weatherData }) => {
  const temperatureCelsius = weatherData?.main?.temp || "N/A";
  const weatherDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country || "Country not available";
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
      })
    : "Date not available";

  const renderTemperatureIcon = () => {
    if (temperatureCelsius > 23) {
      return <MdWbSunny className="text-orange-500 text-5xl sm:text-6xl" />;
    } else if (temperatureCelsius < 10) {
      return <MdAcUnit className="text-blue-500 text-5xl sm:text-6xl" />;
    } else {
      return <IoMdCloud className="text-gray-400 text-5xl sm:text-6xl" />;
    }
  };

  return (
    <div className="bg-sky-950 text-white rounded-xl w-full max-w-md p-6 sm:p-8 shadow-md mx-auto">
      {/* Title */}
      <div className="text-xl font-semibold mb-4 sm:mb-2">Now</div>

      {/* Temperature & Icon */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="text-5xl sm:text-4xl font-bold">{temperatureCelsius}°C</div>
        <div className="text-6xl sm:text-5xl">{renderTemperatureIcon()}</div>
      </div>

      {/* Weather Description */}
      <div className="text-sm mt-3 font-medium capitalize text-gray-300 text-center sm:text-left">
        {weatherDescription}
      </div>

      {/* Additional Info */}
      <div className="mt-4 space-y-3 text-sm sm:text-base">
        <div className="flex items-center gap-2">
          <BsCalendar className="shrink-0" />
          <span className="truncate">{currentDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaLocationArrow className="shrink-0" />
          <span className="truncate">{cityName}, {countryName}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
