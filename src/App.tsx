
import { useState } from 'react'
import './App.css'
import type { WeatherReponse } from './types/Weather';
import WeatherApi from './services/WeatherApi';
import clearMeteo from './assets/clear.webp';
import cloudsMeteo from './assets/clouds.webp';
import defaultMeteo from './assets/default.webp';
import drizzleMeteo from './assets/drizzle.webp';
import rainMeteo from './assets/rain.webp';
import thunderstormMeteo from './assets/thunderstorm.webp';
// import drapeauMada from './assets/drapeauMada.webp';

function App() {

  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherReponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState("");
  const [codePays, setCodePays] = useState("MG");
  // const [nomPays, setNomPays] = useState<string>("");

  const dataPays = [
    { nom: "Madagascar", code: "MG" },
    { nom: "France", code: "FR" },
    { nom: "United States", code: "US" },
    { nom: "United Kingdom", code: "GB" },
    { nom: "Germany", code: "DE" },
    { nom: "Italy", code: "IT" },
    { nom: "Spain", code: "ES" },
    { nom: "Canada", code: "CA" },
    { nom: "Chine", code: "CN" },
    { nom: "Japan", code: "JP" },
    { nom: "Indian", code: "In" },
    { nom: "South Africa", code: "ZA" },
    { nom: "Australia", code: "AU" },

  ]

  const handleSearch = async () => {
    if (!city || !codePays) {
      return;
    }

    try {
      setLoading(true);
      setErreur("");
      const data = await WeatherApi(city, codePays);
      setWeather(data);
      console.log(weather);

    }

    catch {
      setErreur("City not found");
      setWeather(null);
    }

    finally {
      setLoading(false);
    }
    setCity("")
  }

  const weatherMain = weather?.weather[0].main.toLowerCase()

  let background = "from-blue-200 via-blue-400 to-indigo-200"

  if (weatherMain === "clear") {
    background = "from-orange-100 via-sky-700 to-orange-500"
  }
  else if (weatherMain === "rain") {
    background = "from-gray-300 via-gray-500 to-gray-400"
  }
  else if (weatherMain === "clouds") {
    background = "from-slate-400 via-slate-500 to-slate-700"
  }

  const urlImages = (main: string) => {

    switch (main) {
      case "clear":
        return clearMeteo;
      case "clouds":
        return cloudsMeteo;
      case "rain":
        return rainMeteo;
      case "drizzle":
        return drizzleMeteo;
      case "thunderstorm":
        return thunderstormMeteo;
      default:
        return defaultMeteo
    }

  }


  return (
    <div className={`min-h-screen  flex justify-center items-start bg-linear-to-br ${background} transition-all duration-1000 ease-in-out `}>
      <div className="animation-fadeIn mt-10 bg-white/50 border border-white/30 backdrop-blur-3xl p-8 rounded-3xl shadow-2xl w-[95%] max-w-lg text-white transition duration-500 hover:scale-105 hover:shadow-yellow-500/50 hover:ring-1 hover:ring-orange-600">

        <h1 className="w-full text-center font-extrabold mb-6 text-2xl bg-linear-to-r from-yellow-600 to-white bg-clip-text text-transparent">
          Weather {!weather?.name ? "App":`in ${weather?.name}` }
          {/* Météo <img src={drapeauMada} alt="drapeau madagascar" className='w-7 h-7' /> */}
        </h1>
        <select required value={codePays} onChange={(e) =>setCodePays(e.target.value)} className='text-sm font-bold tracking-widest w-full mb-5 outline-0 ring-1 ring-amber-400 rounded p-2 text-gray-800 bg-white/90 backdrop-blur-xl '>
          {/* <option value="" disabled className='text-xl '>Select country...</option> */}
          {
            dataPays.map((c) => (
              <option className='' key={c.code} value={c.code}>{c.nom}</option>
            ))
          }
        </select>

        <input required type="text" placeholder='Enter a city ...' className='outline-none text-black w-full bg-white/50 rounded-xs text-center p-1 focus:ring-1 focus:ring-yellow-200 transition' value={city} onChange={(e) => setCity(e.target.value)} />
        <button type='submit' onClick={handleSearch} className={`${!city || !codePays ? "bg-white/20 text-blue-300 hover:ring-0" :""} disabled: w-full mt-4 bg-white text-blue-600 py-2 font-semibold rounded-lg hover:bg-blue-100 hover:ring-1 hover:ring-red-100 transition ease-in-out duration-300`}>
          {loading ? "Loading..." : "Search"}
        </button>

        {erreur && (
          <p className='text-center my-4 text-red-500 bg-red-200 rounded-xl p-2  font-bold'>{erreur}</p>
        )}

        {weather && (
          <>
            <p className='capitalize mt-8 text-center text-xl font-bold text-black '>In {weather?.name} , {weather.weather[0].description}</p>
            <img src={urlImages(weather.weather[0].main.toLowerCase())} alt='image icon' className='my-2 text-center mx-auto' />
            <div className="grid grid-cols-2 mt-5 gap-4 text-center">
              <div className="bg-white/20 p-4 rounded-xl animation-fadeIn">
                <p className='text-sm'>City</p>
                <p className='font-bold text-2xl'>{weather.name}</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl animation-fadeIn">
                <p className='text-sm'>Temperature</p>
                <p className='font-bold text-2xl'>{weather.main.temp} °C</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl animation-fadeIn">
                <p className='text-sm'>Humidity</p>
                <p className='font-bold text-2xl'>{weather.main.humidity}%</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl animation-fadeIn">
                <p className='text-sm'>Wind</p>
                <p className='font-bold text-2xl'>{weather.wind.speed} m/s</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
