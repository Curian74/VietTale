import axios from '../configs/axios'

const getAllAsync = async () => {
    const response = await axios.get('EventTag/All');
    return response.data;
}

const eventTagService = {
    getAllAsync,
}

export default eventTagService;