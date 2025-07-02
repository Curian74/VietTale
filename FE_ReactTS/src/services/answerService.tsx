import axios from '@/configs/axios';

const getByQuestionId = async (id: number) => {
    const response = await axios.get(`Answer/${id}`);
    return response.data;
}

const answerService = {
    getByQuestionId,
}

export default answerService;