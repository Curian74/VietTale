import { useEffect, useState } from 'react'
import WeatherForecastService from '../../services/WeatherForecastService';
import type { WeatherForecast } from '../../types/WeatherForecast';

const Test = () => {

  const [weatherforecast, setWeatherforecast] = useState<WeatherForecast[]>([]);

  const fetchData = async () => {
    try {
      const data = await WeatherForecastService.getAllAsync();
      console.log(data);
      setWeatherforecast(data);
    }

    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='h-screen'>
      <h2 className='text-center text-4xl mb-20 mt-10'>Weather Forecast Demo</h2>
      <div className='flex justify-center'>
        <div className='flex flex-wrap justify-center gap-20'>
          {weatherforecast.map((w, i) => (
            <ul key={i}>
              <li className='text-green-500 font-medium'>{w.date}</li>
              <li>{w.temperatureC}</li>
              <li>{w.temperatureF}</li>
              <li>{w.summary}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Test
