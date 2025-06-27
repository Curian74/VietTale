
import axios from '@/configs/axios';

const getPopularLessons = async () => {
    const response = await axios.get('Lesson/popular')
    return response.data;
}

const lessonService = {
    getPopularLessons,
}

export default lessonService;