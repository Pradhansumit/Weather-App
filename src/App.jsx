import { useState } from "react";
import clear_icon from "/images/clear.png";
import cloud_icon from "/images/cloud.png";
import drizzle_icon from "/images/drizzle.png";
import rain_icon from "/images/rain.png";
import snow_icon from "/images/snow.png";

const weatherIcons = {
  "01": clear_icon,
  "02": cloud_icon,
  "03": drizzle_icon,
  "04": drizzle_icon,
  "09": rain_icon,
  10: rain_icon,
  13: snow_icon,
};

export default function App() {
  const [locationName, setLocationName] = useState("");
  const [locationUrl, setLocationUrl] = useState("");
  const [humidity, setHumidity] = useState(null);
  const [windVelocity, setWindVelocity] = useState(null);
  const [tempValue, setTempValue] = useState(0);
  const [weatherImage, setWeatherImage] = useState(clear_icon);

  let api_key = "5fd4f140a683f944f4f73e515a165b8e";

  //to set the location for the global usage.
  function setGlobalLocationName(name) {
    setLocationName(name);
  }

  //to set the url to recent location update
  function updateLocationUrl(name) {
    setLocationUrl(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=Metric&appid=5fd4f140a683f944f4f73e515a165b8e`,
    );
  }

  // fetch data from the url
  async function handleFetch() {
    let response = await fetch(locationUrl);
    let data = await response.json();
    setHumidity(data.main.humidity);
    setWindVelocity(data.wind.speed);
    setTempValue(data.main.temp);
    let icon = data.weather[0].icon;
    console.log(icon.substring(0, 2));

    // for (i = 0; i < Object.keys(weatherIcons).length - 1; i++) {
    //   console.log(i);
    //   if (icon.substring(0, 2) == Object.keys(weatherIcons[i])) {
    //     setWeatherImage(weatherIcons[i]);
    //     console.log("weather icon changed");
    //   } else {
    //     console.log("weather icon did not change");
    //   }
    // }

    for (const key in weatherIcons) {
      if (icon.substring(0, 2) == key) {
        setWeatherImage(weatherIcons[`${key}`]);
        console.log("weather icon changed");
        break;
      } else {
        console.log("weather icon did not change");
      }
    }
  }

  return (
    <div className="App">
      <Input
        setGlobalLocationName={setGlobalLocationName}
        updateLocationUrl={updateLocationUrl}
        handleFetch={handleFetch}
      />
      <Temperature
        locationName={locationName}
        tempValue={tempValue}
        image={weatherImage}
      />
      <HumidityAndWind humidity={humidity} windVelocity={windVelocity} />
    </div>
  );
}

function Input({ setGlobalLocationName, updateLocationUrl, handleFetch }) {
  const [locationInput, setLocationInput] = useState("");

  function handleSubmit(e) {
    if (e.target.value === "") {
      console.log("Empty");
    }
    e.preventDefault();
    setGlobalLocationName(locationInput);
    updateLocationUrl(locationInput);
    handleFetch();
  }

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={locationInput}
          placeholder="Enter the location"
          onChange={(e) => setLocationInput(e.target.value)}
        />
        <button type="submit" className="search-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );
}

function Temperature({ locationName, tempValue, image }) {
  return (
    <div className="temperature-container">
      <img src={image} alt="weather-image" />
      <h1 className="location-temp">
        <span>{tempValue}</span>&deg;C
      </h1>
      <h2 className="location-name">{locationName}</h2>
    </div>
  );
}

function HumidityAndWind({ humidity, windVelocity }) {
  return (
    <div className="humidity-wind-container">
      <div className="inner-container">
        <div className="image-container">
          <img
            className="h-image"
            src="images/humidity.png"
            alt="humidity-image"
          />
        </div>
        <div className="stats-label-container">
          <h3>
            <span className="h-stats">{humidity}</span>%
          </h3>
          <h5>Humidity</h5>
        </div>
      </div>
      <div className="wind-container">
        <div className="inner-container">
          <div className="image-container">
            <img className="h-image" src="images/wind.png" alt="wind-image" />
          </div>
          <div className="stats-label-container">
            <h3>
              <span className="w-stats">{windVelocity}</span>
              Km/h
            </h3>
            <h5>Wind Speed</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
