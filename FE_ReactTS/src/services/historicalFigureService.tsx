import axios from '../configs/axios';

const getAllHistoricalFiguresAsync = async (name?: string) => {
    const response = await axios.get(`HistoricalFigure/All?Name=${name}`);
    return response.data;
}

const historicalFigureService = {
    getAllHistoricalFiguresAsync,
}

export default historicalFigureService;