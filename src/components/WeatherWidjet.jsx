const weatherBackgrounds = {
  Clear:
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  Clouds:
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  Rain: "https://images.unsplash.com/photo-1501612780327-4504553879a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  Snow: "https://images.unsplash.com/photo-1517313887206-7fbb419c9a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  Thunderstorm:
    "https://images.unsplash.com/photo-1508818319268-d31f45d14e41?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  Drizzle:
    "https://images.unsplash.com/photo-1561488110-2e41f61e2826?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  Mist: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  Smoke:
    "https://images.unsplash.com/photo-1509715695397-83d4da1b85fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  Haze: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  Dust: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  Fog: "https://images.unsplash.com/photo-1517511620798-cec17d428bc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  Sand: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  Ash: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  Squall:
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  Tornado:
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
};

const WeatherWidget = ({ weather }) => {
  const getBackgroundImage = (weatherCondition) => {
    const backgroundImage =
      weatherBackgrounds[weatherCondition] ||
      "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    return `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`;
  };

  return (
    <div className="weather-widget mt-8 flex justify-center">
      {weather && (
        <div
          className="shadow-md rounded-lg p-6 text-white flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-6 w-full max-w-xl"
          style={{
            backgroundImage: getBackgroundImage(weather.weather[0].main),
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex-shrink-0">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt={weather.weather[0].description}
              className="w-32 h-32"
            />
          </div>
          <div className="flex flex-col justify-between h-full">
            <h2 className="text-3xl font-semibold mb-2">{weather.name}</h2>
            <p className="text-lg capitalize mb-4">
              {weather.weather[0].description}
            </p>
            <div className="flex flex-col lg:flex-row lg:space-x-8">
              <div className="flex flex-col items-center">
                <p className="text-lg font-medium">Temp</p>
                <p className="text-xl">{weather.main.temp}°C</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg font-medium">Humidity</p>
                <p className="text-xl">{weather.main.humidity}%</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg font-medium">Wind</p>
                <p className="text-xl">{weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
