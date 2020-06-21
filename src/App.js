import React, {useState, useEffect} from 'react';
import './App.css';

const apiKey = 'DEMO_KEY';
const endpoint = `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`;

function App() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(endpoint)
        .then(response => response.json())
        .then(jsonData => {
          const {sol_keys, validity_checks, ...solData} = jsonData;
          return Object.entries(solData).map(([sol, data]) => {
            return {
              sol: sol,
              maxTemp: data.AT.mx,
              minTemp: data.AT.mn,
              windSpeed: data.HWS.av,
              season: data.Season,
              date: new Date(data.First_UTC)
            }
          })
        })
      setData(result);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <div className="loading">
          <p>--- LOADING ---</p>
        </div>
      ) : (
        <div>
        <p>{data[0].season} in Elysium Planitia, sol {data[0].sol}</p>
        <div className="temperature">{data[0].maxTemp}°</div>
        <div className="wind">Wind Average: {data[0].windSpeed} mph</div>
        <div className="bottom-data">
          <div className="highs">High: {data[0].maxTemp}</div>
          <div className="lows">Low: {data[0].minTemp}</div>
        </div>
        </div>
      )}
    </div>
  );
}

export default App;
