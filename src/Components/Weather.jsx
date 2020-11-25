import React from "react";

const Weather = ({ weather }) => {
  const calCelsius = (temp) => {
    let cell = temp - 273.15;
    return cell;
  };

  return (
    <div className="container text-center">
      {weather ? (
        <div className="cards">
          <h1>
            {weather.name}
            <span className="h6"> {weather.sys.country}</span>
          </h1>

          <h5 className="py-4">
            <i className={`wi wi-owm-${weather.weather[0].id} display-1`}></i>
          </h5>
          <h1 className="py-2">
            {Math.round(calCelsius(weather.main.temp))}&deg;
          </h1>
          {minMaxTemp(
            Math.round(calCelsius(weather.main.temp_min)),
            Math.round(calCelsius(weather.main.temp_max))
          )}
          <h4 className="py-3">{weather.weather[0].main}</h4>
          <p>{weather.weather[0].description}</p>
        </div>
      ) : (
        <h1>loading...</h1>
      )}
    </div>
  );
};
function minMaxTemp(min, max) {
  return (
    <h3>
      <span className="px-4">{min}&deg;</span>
      <span className="px-4">{max}&deg;</span>
    </h3>
  );
}

export default Weather;
