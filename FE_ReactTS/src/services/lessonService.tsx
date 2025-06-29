
import axios from '@/configs/axios';

const getPopularLessons = async () => {
    const response = await axios.get('Lesson/popular')
    return response.data;
}

const getById = async (id: number) => {
    const response = await axios.get(`Lesson/${id}`)
    return response.data;
}

const getSavedLesson = async (userId: number | string, query: object) => {
    const response = await axios.get(`Lesson/library/${userId}`, {
        params: query,
    });
    return response.data;
};

const checkSavedLesson = async (lessonId: string | number, userId: string | number) => {
    const response = await axios.get(`Lesson/saved-lesson?lessonId=${lessonId}&userId=${userId}`)
    return response;
}

const toggleSaveQuestion = async (lessonId: string | number, userId: string | number) => {
    const response = await axios.post(`Lesson/save?lessonId=${lessonId}&userId=${userId}`)
    return response.data;
}

const updateLastActive = async (lessonId: string | number, userId: string | number) => {
    const response = await axios.put(`Lesson/last-active?lessonId=${lessonId}&userId=${userId}`)
    return response.data;
}

const lessonService = {
    getPopularLessons,
    getById,
    getSavedLesson,
    checkSavedLesson,
    toggleSaveQuestion,
    updateLastActive
}

export default lessonService;