import React, { useEffect, useState } from "react";
const App = () => {
    const [city, getCity] = useState("mumbai");
    const [temprature, setTemprature] = useState({
        temp: "",
        max_temp: "",
        min_temp: ""
    })
    const inputEvent = (e) => {
        getCity(e.target.value);
    }
    useEffect(() => {
        const fetchApi = async () => {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f1bb3d6131ef5c85fe9220f179065bf6`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.cod == 200) {
                const temp = (data.main.temp - 273.15).toFixed(2);
                const max_temp = (data.main.temp_max - 273.15).toFixed(2);
                const min_temp = (data.main.temp_min - 273.15).toFixed(2);
                setTemprature(() => {
                    return {
                        temp, max_temp, min_temp
                    }
                })
            } else {
                setTemprature(() => {
                    return {
                        temp: "invalid",
                        max_temp: "invalid",
                        min_temp: "invalid"
                    }
                })
            }
        }

        fetchApi();
    },[city]);
    return (<>
        <div className="weatherContainer">
            <div className="inputField">
                <input type="search" value={city} placeholder="Enter A City" onChange={inputEvent} />
            </div>
            <div className="resultContainer">
                <h1 className="location">
                    <i className="fas fa-street-view"></i> {city}
                </h1>
                {
                (temprature.temp === "invalid") ?<h2 className="temperature">No Data Found!</h2>  :<h2 className="temperature">{ temprature.temp }°C</h2>
                }
                {
                 (temprature.temp==="invalid")?null:
                <p className="min_max">{temprature.max_temp}°C | {temprature.min_temp}°C</p>
                }
            </div>
        </div>
    </>)
}
export default App;