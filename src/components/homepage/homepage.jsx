import './homepage.css';

import React, { useState } from 'react';

import Search from './search/search';
import axios from 'axios';

const api = {
  key: "0f36f7e65b9c397f2be522bd9c69129f",
  base: "https://api.openweathermap.org/data/2.5/"
}

function Homepage() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [pic, setPic] = useState('https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701714587.jpg');


  async function onSearchSubmit(term) {
    await axios.get('https://api.unsplash.com/search/photos', {
      params: { query: term },
      headers: {
        Authorization:
          'Client-ID _JUnQlK7q2Vl48y-SkHNjfRK9EAkEsgm6qyq-eVqvX0',
      }
    }).then(response => setPic(response.data.results[randomNum()].urls.full));
}         
function randomNum () {
 return  Math.floor(Math.random() * 10);
}
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
          console.log(query)
          onSearchSubmit(query);
        });
    }
  }
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div style={{
      backgroundImage: `url(${pic})`,
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
  }}>
      <main>
        {/* <Search /> */}


        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default Homepage;
