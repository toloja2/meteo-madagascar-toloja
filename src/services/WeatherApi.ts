import {type WeatherReponse } from "../types/Weather";

const API_KEY = "931b7c5550183d5e2a9392e196b525b6";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

const WeatherApi = async(city:string,country:string):Promise<WeatherReponse>=>{
    const response = await fetch(`${BASE_URL}?q=${city}&country=${country}&lang=fr&units=metric&appid=${API_KEY}`);

    if(!response.ok){
        throw new Error("Please verify your network")
    }

    return response.json();

}

export default WeatherApi;