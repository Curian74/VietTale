
import axios from "../configs/axios"

const getAllAsync = async () => {
    const response = await axios.get('WeatherForecast');
    return response.data;
}

const WeatherForecastService = {
    getAllAsync,
}

export default WeatherForecastService;