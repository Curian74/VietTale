import axios from '../configs/axios'

const getByLessonId = async (lessonId: number | string) => {
    const response = await axios.get(`Question/${lessonId}`);
    return response.data;
}

const questionService = {
    getByLessonId,
}

export default questionService;