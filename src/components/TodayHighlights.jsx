import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompressIcon from "@mui/icons-material/Compress";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import Highlight from "../../src/components/Highlight";
import '../index.css';

const TodayHighlights = ({ weatherData, airQualityData }) => {
  const { main, visibility, sys } = weatherData;
  const airQualityIndex = airQualityData?.main?.aqi;
  const { co, no, no2, o3 } = airQualityData?.components || {};

  const renderAirQualityDescription = (aqi) => {
    switch (aqi) {
      case 1: return "Good";
      case 2: return "Fair";
      case 3: return "Moderate";
      case 4: return "Poor";
      case 5: return "Very Poor";
      default: return "Unknown";
    }
  };

  const highlights = [
    { title: "Humidity", value: `${main.humidity}%`, Icon: InvertColorsIcon },
    { title: "Pressure", value: `${main.pressure} hPa`, Icon: CompressIcon },
    { title: "Visibility", value: `${visibility / 1000} km`, Icon: VisibilityIcon },
    { title: "Feels Like", value: `${main.feels_like}°C`, Icon: DeviceThermostatIcon },
  ];

  return (
    <div className="bg-sky-950 text-white w-full rounded p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Left Column */}
      <div className="flex flex-col gap-4">
        {/* Air Quality Index */}
        <div className="bg-sky-700 p-4 rounded w-full">
          <div className="flex justify-between items-center text-xl">
            <p>Air Quality Index</p>
            <div className={`px-3 py-1 text-sm font-bold bg-green-500 rounded text-center`}>
              {renderAirQualityDescription(airQualityIndex)}
            </div>
          </div>
          <div className="mt-4">
            <AirIcon className="text-3xl" />
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm sm:text-base">
              <div>
                <p className="font-bold">CO</p>
                <p>{co} µg/m³</p>
              </div>
              <div>
                <p className="font-bold">NO</p>
                <p>{no} µg/m³</p>
              </div>
              <div>
                <p className="font-bold">NO₂</p>
                <p>{no2} µg/m³</p>
              </div>
              <div>
                <p className="font-bold">O₃</p>
                <p>{o3} µg/m³</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sunrise and Sunset */}
        <div className="bg-sky-700 p-4 rounded w-full">
          <div className="text-xl mb-2">Sunrise And Sunset</div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center">
              <WbSunnyIcon className="text-4xl" />
              <p className="text-2xl">{new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
            </div>
            <div className="text-center">
              <NightsStayIcon className="text-4xl" />
              <p className="text-2xl">{new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Highlights */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-center w-full max-w-sm mx-auto overflow-hidden"
          >
            <Highlight
              title={highlight.title}
              value={highlight.value}
              Icon={highlight.Icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayHighlights;
