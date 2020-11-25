import { useState, useEffect } from "react";
import Weather from "./Components/Weather";
import axios from "axios";
import "./assets/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/weather-icons-master/css/weather-icons.min.css";
import Search from "./Components/Search";
import { get } from "react-hook-form";
const API_KEY = "6d07f9d94795d82e4b24c055e4789754";
const API_KEY_IMG = "pEukg8OyZQ-pR3EPnCaD3lCGrKjLVbZRoirX0beeS5c";
function App() {
  const [weather, setWeather] = useState();
  const [location, setLocation] = useState();
  const [input, setInput] = useState("cusco");

  const getLocationCoords = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition);
    }
  };
  const setActualNameCity = async (position) => {
    const response = await axios(
      `http://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${API_KEY}`
    );
    setInput(`${response.data.name}`);
  };

  const setPosition = (position) => {
    setLocation({
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    });
    if (input == undefined && location) {
      setActualNameCity(location);
    }
  };
  useEffect(() => {
    getLocationCoords();
    const getWeather = async () => {
      const response = await axios(
        `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}`
      );
      console.log(response.data);
      setWeather(response.data);
      getWeatherFoto(input);

    };
    const getWeatherFoto = async (input) => {
      const response = await axios(
        `https://api.unsplash.com/search/photos/?client_id=${API_KEY_IMG}&query=${input}`
      );
      console.log(response.data[0]);
    };
    if (input) {
      setActualNameCity(input);
      getWeather();
    } else if (input.length == 0) {
      setActualNameCity(location);
      getWeather();
    } else {
      setActualNameCity(location);
      getWeather();
    }
  }, [input]);
  return (
    <div className="App">
      <Search setInput={setInput} />
      <Weather weather={weather} />
    </div>
  );
}

export default App;
